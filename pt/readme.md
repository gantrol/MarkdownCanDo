# MarkdownCanDo

[![Tutorial interativo](https://img.shields.io/badge/tutorial-interativo-2f8f46?style=for-the-badge)](https://markdown.aicando.xyz/tutorial/)[![Visitar o site](https://img.shields.io/badge/site-v0.9.0-2f8f46?style=for-the-badge)](https://markdown.aicando.xyz/)

MarkdownCanDo é um site interativo para aprender, escrever e explorar os recursos do Markdown. ![Ícone do MarkdownCanDo](../public/logo-mini.png)

![Prévia da página inicial](../zh/assets/v0.9.0-main-page.png)

## Desenvolvimento local

Requer Node.js 20 ou superior e pnpm 10.

```bash
pnpm install
pnpm dev
```

O comando de desenvolvimento detecta conflitos de porta e escolhe automaticamente a próxima porta disponível.

Para compilar e visualizar a versão de produção:

```bash
pnpm build
pnpm preview
```

## Implantação no Cloudflare

O site usa Cloudflare Worker Static Assets. Antes de implantar uma cópia, revise o domínio personalizado em `wrangler.jsonc`.

```bash
pnpm cloudflare:deploy:dry
pnpm cloudflare:deploy
```

O redirecionamento do domínio antigo é mantido separadamente em `wrangler.redirect.jsonc`.

## Tecnologias

- VitePress e Vue
- Milkdown Crepe para edição WYSIWYG
- markdown-it e DOMPurify para renderização e sanitização
- Mermaid, KaTeX e ABCJS para conteúdo estendido
- Cloudflare Workers Static Assets

## Tradução

O chinês é a versão principal. Os conteúdos em inglês e português podem ficar temporariamente defasados e devem ser revisados após mudanças de texto.

## Estado da versão

A v0.9 é uma versão anterior à 1.0. A experiência principal já pode ser implantada e utilizada; cobertura de conteúdo, acessibilidade, tamanho dos pacotes e compatibilidade do editor continuarão sendo melhorados antes da v1.0.
