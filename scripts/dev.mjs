import net from 'node:net'
import { spawn } from 'node:child_process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const DEFAULT_PORT = 5173
const MAX_PORT_ATTEMPTS = 100

function readOption(args, name) {
  const inlineOption = args.find(argument => argument.startsWith(`${name}=`))
  if (inlineOption) return inlineOption.slice(name.length + 1)

  const optionIndex = args.indexOf(name)
  if (optionIndex === -1) return undefined
  return args[optionIndex + 1]
}

function withoutOption(args, name) {
  const optionIndex = args.indexOf(name)
  if (optionIndex === -1) {
    return args.filter(argument => !argument.startsWith(`${name}=`))
  }

  return args.filter((argument, index) => (
    !argument.startsWith(`${name}=`)
    && index !== optionIndex
    && index !== optionIndex + 1
  ))
}

export function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.unref()

    server.once('error', () => resolve(false))
    server.listen({ port, exclusive: true }, () => {
      server.close(() => resolve(true))
    })
  })
}

export async function findAvailablePort(startPort, attempts = MAX_PORT_ATTEMPTS) {
  for (let offset = 0; offset < attempts; offset += 1) {
    const candidate = startPort + offset
    if (candidate > 65535) break
    if (await isPortAvailable(candidate)) return candidate
  }

  throw new Error(`No available port found between ${startPort} and ${Math.min(65535, startPort + attempts - 1)}.`)
}

async function run() {
  const rawArgs = process.argv.slice(2)
  const requestedPort = Number(readOption(rawArgs, '--port') ?? process.env.PORT ?? DEFAULT_PORT)
  const host = readOption(rawArgs, '--host') ?? process.env.HOST ?? 'localhost'

  if (!Number.isInteger(requestedPort) || requestedPort < 1 || requestedPort > 65535) {
    throw new Error(`Invalid development port: ${requestedPort}`)
  }

  const availablePort = await findAvailablePort(requestedPort)
  const forwardedArgs = withoutOption(withoutOption(rawArgs, '--port'), '--host')
  const vitepressCli = fileURLToPath(new URL('../node_modules/vitepress/bin/vitepress.js', import.meta.url))

  if (availablePort !== requestedPort) {
    console.log(`[dev] Port ${requestedPort} is busy; using ${availablePort} instead.`)
  } else {
    console.log(`[dev] Port ${availablePort} is available.`)
  }

  const child = spawn(
    process.execPath,
    [vitepressCli, 'dev', '--host', host, '--port', String(availablePort), '--strictPort', ...forwardedArgs],
    { stdio: 'inherit' }
  )

  child.once('exit', (code, signal) => {
    if (signal) process.kill(process.pid, signal)
    process.exitCode = code ?? 1
  })
}

const entryPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : ''
if (import.meta.url === entryPath) {
  run().catch((error) => {
    console.error(`[dev] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
