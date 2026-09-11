import { DurableObject } from 'cloudflare:workers'
import { utcDay, utcDayOffset } from './image-policy'

export type QuotaDenialReason = 'client_daily_limit' | 'site_daily_limit' | 'storage_limit'

export interface QuotaReservation {
  allowed: boolean
  reason?: QuotaDenialReason
  remainingClientBytes: number
  remainingClientFiles: number
  remainingSiteBytes: number
  remainingSiteFiles: number
}

interface UsageRow {
  [key: string]: SqlStorageValue
  bytes: number
  files: number
}

interface SumRow {
  [key: string]: SqlStorageValue
  bytes: number
  files: number
}

interface QuotaLimits {
  clientBytes: number
  clientFiles: number
  siteBytes: number
  siteFiles: number
  quotaWindowDays: number
  rollingStorageBytes: number
}

function positiveInteger(value: unknown, name: string) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isSafeInteger(number) || number <= 0) throw new Error(`Invalid ${name} configuration`)
  return number
}

function limitsFromEnv(env: Env): QuotaLimits {
  return {
    clientBytes: positiveInteger(env.IMAGE_DAILY_CLIENT_BYTES, 'IMAGE_DAILY_CLIENT_BYTES'),
    clientFiles: positiveInteger(env.IMAGE_DAILY_CLIENT_FILES, 'IMAGE_DAILY_CLIENT_FILES'),
    siteBytes: positiveInteger(env.IMAGE_DAILY_SITE_BYTES, 'IMAGE_DAILY_SITE_BYTES'),
    siteFiles: positiveInteger(env.IMAGE_DAILY_SITE_FILES, 'IMAGE_DAILY_SITE_FILES'),
    quotaWindowDays: positiveInteger(env.IMAGE_QUOTA_WINDOW_DAYS, 'IMAGE_QUOTA_WINDOW_DAYS'),
    rollingStorageBytes: positiveInteger(env.IMAGE_ROLLING_STORAGE_BYTES, 'IMAGE_ROLLING_STORAGE_BYTES')
  }
}

function remaining(limit: number, used: number) {
  return Math.max(0, limit - used)
}

export class ImageQuota extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    void this.ctx.blockConcurrencyWhile(async () => {
      this.migrate()
      this.deleteExpiredUsage(utcDay())
      if (await this.ctx.storage.getAlarm() === null) await this.scheduleCleanup()
    })
  }

  private scheduleCleanup(now = new Date()) {
    const nextUtcDay = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
    return this.ctx.storage.setAlarm(nextUtcDay + 5 * 60_000)
  }

  private deleteExpiredUsage(day: string) {
    const cutoff = utcDayOffset(day, -(limitsFromEnv(this.env).quotaWindowDays - 1))
    this.ctx.storage.sql.exec('DELETE FROM daily_usage WHERE day < ?', cutoff)
  }

  private migrate() {
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS _sql_schema_migrations (
        id INTEGER PRIMARY KEY,
        applied_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `)

    const version = this.ctx.storage.sql
      .exec<{ version: number }>('SELECT COALESCE(MAX(id), 0) AS version FROM _sql_schema_migrations')
      .one().version

    if (version < 1) {
      this.ctx.storage.sql.exec(`
        CREATE TABLE daily_usage (
          day TEXT NOT NULL,
          client_hash TEXT NOT NULL,
          bytes INTEGER NOT NULL CHECK (bytes >= 0),
          files INTEGER NOT NULL CHECK (files >= 0),
          PRIMARY KEY (day, client_hash)
        )
      `)
      this.ctx.storage.sql.exec('CREATE INDEX daily_usage_day_idx ON daily_usage(day)')
      this.ctx.storage.sql.exec('INSERT INTO _sql_schema_migrations (id) VALUES (1)')
    }
  }

  async reserve(day: string, clientHash: string, bytes: number): Promise<QuotaReservation> {
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(day)) throw new Error('Invalid quota day')
    if (!/^[0-9a-f]{64}$/u.test(clientHash)) throw new Error('Invalid client hash')
    if (!Number.isSafeInteger(bytes) || bytes <= 0) throw new Error('Invalid reservation size')

    const limits = limitsFromEnv(this.env)
    const cutoff = utcDayOffset(day, -(limits.quotaWindowDays - 1))
    this.deleteExpiredUsage(day)

    const client = this.ctx.storage.sql
      .exec<UsageRow>('SELECT bytes, files FROM daily_usage WHERE day = ? AND client_hash = ?', day, clientHash)
      .toArray()[0] ?? { bytes: 0, files: 0 }
    const site = this.ctx.storage.sql
      .exec<SumRow>(
        'SELECT COALESCE(SUM(bytes), 0) AS bytes, COALESCE(SUM(files), 0) AS files FROM daily_usage WHERE day = ?',
        day
      )
      .one()
    const rolling = this.ctx.storage.sql
      .exec<{ bytes: number }>('SELECT COALESCE(SUM(bytes), 0) AS bytes FROM daily_usage WHERE day >= ?', cutoff)
      .one()

    const response = (allowed: boolean, reason?: QuotaDenialReason): QuotaReservation => ({
      allowed,
      reason,
      remainingClientBytes: remaining(limits.clientBytes, client.bytes + (allowed ? bytes : 0)),
      remainingClientFiles: remaining(limits.clientFiles, client.files + (allowed ? 1 : 0)),
      remainingSiteBytes: remaining(limits.siteBytes, site.bytes + (allowed ? bytes : 0)),
      remainingSiteFiles: remaining(limits.siteFiles, site.files + (allowed ? 1 : 0))
    })

    if (client.bytes + bytes > limits.clientBytes || client.files + 1 > limits.clientFiles) {
      return response(false, 'client_daily_limit')
    }
    if (site.bytes + bytes > limits.siteBytes || site.files + 1 > limits.siteFiles) {
      return response(false, 'site_daily_limit')
    }
    if (rolling.bytes + bytes > limits.rollingStorageBytes) {
      return response(false, 'storage_limit')
    }

    this.ctx.storage.sql.exec(
      `INSERT INTO daily_usage (day, client_hash, bytes, files)
       VALUES (?, ?, ?, 1)
       ON CONFLICT (day, client_hash)
       DO UPDATE SET bytes = bytes + excluded.bytes, files = files + 1`,
      day,
      clientHash,
      bytes
    )
    return response(true)
  }

  async release(day: string, clientHash: string, bytes: number): Promise<void> {
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(day) || !/^[0-9a-f]{64}$/u.test(clientHash)) return
    if (!Number.isSafeInteger(bytes) || bytes <= 0) return

    this.ctx.storage.sql.exec(
      `UPDATE daily_usage
       SET bytes = MAX(0, bytes - ?), files = MAX(0, files - 1)
       WHERE day = ? AND client_hash = ?`,
      bytes,
      day,
      clientHash
    )
    this.ctx.storage.sql.exec(
      'DELETE FROM daily_usage WHERE day = ? AND client_hash = ? AND bytes = 0 AND files = 0',
      day,
      clientHash
    )
  }

  async alarm(): Promise<void> {
    try {
      this.deleteExpiredUsage(utcDay())
    } finally {
      await this.scheduleCleanup()
    }
  }
}
