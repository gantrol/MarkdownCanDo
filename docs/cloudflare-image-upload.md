# Cloudflare R2 图片上传部署教程

本教程用于维护 MarkdownCanDo 的匿名临时图片上传功能。架构是“私有 R2 桶 + 同域 Worker 代理 + Durable Object 原子配额”，不要把 R2 桶本身公开。

## 为什么采用这些限额

截至 2026 年 8 月 29 日，R2 Standard 每月免费包含 10 GB-month 存储、100 万次 Class A 操作和 1000 万次 Class B 操作，互联网出口免费。Cloudflare 网站的 Pro 套餐与 R2 是两套计费：Pro 不会增加 R2 的免费额度，R2 按账号汇总用量并独立结算。超出免费量后，Standard 存储为 $0.015/GB-month，Class A 为 $4.50/百万次，Class B 为 $0.36/百万次。

R2 的 GB-month 不是月底对象大小，而是账期内“每日峰值存储量”的平均值。当前账号其他 R2 桶合计约 123 MB，因此本站仍按免费层做保守预算。当前默认值如下：

| 范围 | 限额 |
| --- | ---: |
| 单张图片 | 5 MiB |
| 单访客 / UTC 日 | 10 张或 20 MiB |
| 全站 / UTC 日 | 300 张或 1 GiB |
| 图片可用时间 | 上传后 24 小时 |
| 3 日滚动台账预算 | 4 GiB |

即使每天用满，考虑 24 小时可用期、生命周期执行时点和到期后最多约 24 小时的底层清理延迟，保守按三个 UTC 日批次共存计算，物理峰值约为 `1 GiB × 3 = 3 GiB`。配额台账也独立保留最近 3 个 UTC 日期，4 GiB 是本站上传量的预算护栏；它不是对整个 R2 账号的实时容量测量，仍需结合 R2 指标和账单提醒。每月最多约 9000 次上传，只占 Class A 免费量的约 0.9%。个人限额仍为 20 MiB/10 张，避免单个来源耗尽全站额度。

参考 Cloudflare 官方的 [R2 定价](https://developers.cloudflare.com/r2/pricing/)、[用量计费说明](https://developers.cloudflare.com/billing/understand/usage-based-billing/)、[对象生命周期](https://developers.cloudflare.com/r2/buckets/object-lifecycles/)和 [R2 指标](https://developers.cloudflare.com/r2/platform/metrics-analytics/)。

## 1. 首次创建私有桶

确认 Wrangler 已登录正确账号：

```bash
pnpm exec wrangler whoami
```

首次部署时创建 Standard 桶：

```bash
pnpm exec wrangler r2 bucket create markdown-can-do-uploads --location apac --storage-class Standard
```

本站中文内容与亚太访问为主，且同账号已有媒体桶位于 APAC，所以当前桶使用 APAC location hint。派生站点若没有明确的主要区域，应省略 `--location apac`，让 R2 使用官方推荐的 Automatic placement。

在 Cloudflare Dashboard 的 **R2 object storage → markdown-can-do-uploads → Settings** 中确认：

- `r2.dev` Public Development URL 为关闭状态；
- 没有给桶绑定公开 Custom Domain；
- 默认存储类型为 Standard。

也可以用 CLI 复核公开入口：

```bash
pnpm exec wrangler r2 bucket dev-url get markdown-can-do-uploads
pnpm exec wrangler r2 bucket domain list markdown-can-do-uploads
```

第一条应显示 public access disabled，第二条应显示没有自定义域名。桶不需要配置 CORS，因为浏览器只访问同域 Worker，不直接访问 R2。

桶默认是私有的。不要为了“方便访问”打开公开入口，否则会绕过 Worker 的防盗链检查。

## 2. 设置 1 天生命周期

给 `uploads/` 前缀添加自动删除规则：

```bash
pnpm exec wrangler r2 bucket lifecycle add markdown-can-do-uploads expire-temporary-uploads uploads/ --expire-days 1
```

如果是把已有的 30 天规则改为 1 天，先删除同名旧规则再重建：

```bash
pnpm exec wrangler r2 bucket lifecycle remove markdown-can-do-uploads --name expire-temporary-uploads
pnpm exec wrangler r2 bucket lifecycle add markdown-can-do-uploads expire-temporary-uploads uploads/ --expire-days 1 --force
```

核对规则：

```bash
pnpm exec wrangler r2 bucket lifecycle list markdown-can-do-uploads
```

Worker 会在上传满 24 小时后立即停止读取；Cloudflare 通常会在对象到期后的 24 小时内完成底层删除。不要改用 Infrequent Access：它没有 Standard 免费额度，并且有 30 天最低存储计费期，不适合一天临时图片。

## 3. 理解 Worker 配置

`wrangler.jsonc` 已包含：

- `IMAGE_UPLOADS` 私有 R2 binding；
- `IMAGE_QUOTA` SQLite Durable Object；
- `/api/images` 上传和 `/uploads/*` 读取的 Worker-first 路由；
- 可调整的大小、张数、滚动容量和保留期变量；
- Worker 日志与少量追踪采样。

修改 binding 后重新生成类型：

```bash
pnpm exec wrangler types worker-configuration.d.ts
```

上传服务使用 HMAC 生成每日访客配额标识。正式部署前创建一个至少 32 字符的高熵 secret，并确认它已经存在：

```bash
pnpm exec wrangler secret put IMAGE_QUOTA_SECRET
pnpm exec wrangler secret list
```

不要把生产 secret 写进 `wrangler.jsonc` 或提交到 Git。配额 Durable Object 会每天通过 alarm 主动清理超过 3 个 UTC 日期的标识，不依赖下一次上传触发清理。

配额由 Durable Object 原子预留。R2 写入失败时会释放预留，因此并发上传不会轻易穿透全站额度，也不会因普通写入失败永久扣掉当天额度。

## 4. 本地验证

安装依赖、构建并启动本地 Worker：

```bash
pnpm install
cp .dev.vars.example .dev.vars
pnpm build
pnpm exec wrangler dev
```

`.dev.vars` 已被 Git 忽略；本地占位 secret 仅用于开发，不要复用到生产。

浏览器中打开本地站点，从源码工具栏或所见即所得工具栏选择图片。源码模式也支持粘贴和拖放。

也可以用现有站点图标验证上传。`Origin` 必须与请求地址完全一致：

```bash
curl -i http://localhost:8787/api/images \
  -X POST \
  -H "Origin: http://localhost:8787" \
  -H "Content-Type: image/png" \
  --data-binary @public/logo-mini.png
```

把响应中的 `/uploads/...` 地址填入下列命令。本站来源应返回 `200`：

```bash
curl -I "http://localhost:8787/uploads/<day>/<id>.png" \
  -H "Referer: http://localhost:8787/playground/" \
  -H "Sec-Fetch-Site: same-origin"
```

外站来源和空 `Referer` 应返回 `403`：

```bash
curl -I "http://localhost:8787/uploads/<day>/<id>.png" \
  -H "Referer: https://example.com/" \
  -H "Sec-Fetch-Site: cross-site"
```

响应还应包含 `Cross-Origin-Resource-Policy: same-origin`，且不能包含 `Access-Control-Allow-Origin: *`。

## 5. 测试与部署

```bash
pnpm test
pnpm typecheck
pnpm cloudflare:deploy:dry
pnpm cloudflare:deploy
```

首次正式部署会按 `exports` 配置创建 SQLite Durable Object namespace。部署完成后再做一次真实上传和同源/跨站读取验证。

## 6. 监控和调整

查看桶对象数与当前大小：

```bash
pnpm exec wrangler r2 bucket info markdown-can-do-uploads
```

同时在 Dashboard 查看 R2 Storage、Class A、Class B 和 Worker 请求量。若要修改限额，编辑 `wrangler.jsonc` 的 `IMAGE_*` 变量，并同时更新三语图片教程和上传界面文案。

不要仅提高每日额度而忽略保留期和生命周期执行延迟。新的理论峰值应满足：

```text
全站每日字节数 × 保守共存批次数 < 滚动台账预算 < 可用 R2 存储预算
```

当前参数为 `1 GiB × 3 < 4 GiB < 10 GB-month`。此外，网站 Pro 不会提升 Workers 请求额度；若没有单独开通 Workers Paid，Workers Free 仍为每天 10 万次动态请求。`/api/images` 与 `/uploads/*` 都会运行 Worker，缓存命中仍计请求数，因此应分别监控 Workers、Durable Objects 和 R2 用量。详见 [Workers 定价](https://developers.cloudflare.com/workers/platform/pricing/)。

## 防盗链的边界

Worker 会在读取缓存和 R2 之前检查 `Referer` 与 `Sec-Fetch-Site`，并返回 `Cross-Origin-Resource-Policy: same-origin`。缓存有效期会被限制在上传后的 24 小时内；到期后即使 R2 生命周期尚未完成物理删除也不再提供读取。这可以阻止正常浏览器把本站地址直接嵌入其他网页，但不能阻止他人下载图片后重新托管，也不能抵御能伪造请求头的非浏览器客户端。需要更强保护时应引入登录态或短时签名 URL；这会与可复制的静态 Markdown 地址产生取舍。
