# MarkdownCanDo

[![Interactive tutorial](https://img.shields.io/badge/tutorial-interactive-2f8f46?style=for-the-badge)](https://markdown.aicando.xyz/tutorial/)[![Visit website](https://img.shields.io/badge/website-v0.9.0-2f8f46?style=for-the-badge)](https://markdown.aicando.xyz/)

MarkdownCanDo is an interactive website for learning, writing, and exploring the capabilities of Markdown. ![MarkdownCanDo logo](public/logo-mini.png)

![Homepage preview](zh/assets/v0.9.0-main-page.png)

## Local development

Requirements: Node.js 20 or later and pnpm 10.

```bash
pnpm install
pnpm dev
```

The development command detects port conflicts and automatically selects the next available port.

Build and preview the production site:

```bash
pnpm build
pnpm preview
```

## Cloudflare deployment

The production site is deployed as Cloudflare Worker Static Assets. Review the custom domain in `wrangler.jsonc` before deploying a fork.

```bash
pnpm cloudflare:deploy:dry
pnpm cloudflare:deploy
```

The legacy-domain redirect is maintained separately through `wrangler.redirect.jsonc`.

## Tech stack

- VitePress and Vue
- Milkdown Crepe for WYSIWYG editing
- markdown-it and DOMPurify for Markdown rendering and sanitization
- Mermaid, KaTeX, and ABCJS for extended content
- Cloudflare Workers Static Assets

## Translation

Chinese is the primary version. English and Portuguese content may lag behind and should be checked when copy changes.

## Version status

v0.9 is a pre-1.0 release. The main experience is deployable and usable, while content coverage, accessibility, bundle size, and editor compatibility will continue to improve before v1.0.
