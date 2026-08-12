import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'
import { search as ptSearch } from './pt'
import markdown_it_footnote from 'markdown-it-footnote'
import markdown_it_task_list from 'markdown-it-task-checkbox'
import type MarkdownIt from 'markdown-it'

const analyticsId = 'G-RX6RPWRSWJ'
const siteOrigin = 'https://markdown.aicando.xyz'

function canonicalUrl(relativePath: string) {
    const cleanPath = relativePath
        .replace(/(^|\/)index\.md$/u, '$1')
        .replace(/\.md$/u, '')
    return new URL(cleanPath ? `/${cleanPath}` : '/', siteOrigin).href
}

function useCustomFences(md: MarkdownIt) {
    const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules)

    md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index]
        const language = token.info.trim().split(/\s+/u)[0]

        if (language !== 'mermaid' && language !== 'abc') {
            return defaultFence
                ? defaultFence(tokens, index, options, env, self)
                : self.renderToken(tokens, index, options)
        }

        const code = Buffer.from(token.content, 'utf8').toString('base64')
        return language === 'abc'
            ? `<AbcNotation code="${code}" />`
            : `<MermaidDiagram code="${code}" />`
    }
}

function useOptimizedImages(md: MarkdownIt) {
    const defaultImage = md.renderer.rules.image?.bind(md.renderer.rules)
    md.renderer.rules.image = (tokens, index, options, env, self) => {
        const token = tokens[index]
        const source = token.attrGet('src') ?? ''
        token.attrSet('loading', 'lazy')
        token.attrSet('decoding', 'async')
        if (source === '/deploy-with-vercel.svg' || source === 'https://vercel.com/button') {
            token.attrSet('width', '103')
            token.attrSet('height', '32')
        } else if (source === '/chatgpt-badge.svg' || source.startsWith('https://img.shields.io/')) {
            token.attrSet('width', '85')
            token.attrSet('height', '28')
        }
        return defaultImage
            ? defaultImage(tokens, index, options, env, self)
            : self.renderToken(tokens, index, options)
    }
}

export const shared = defineConfig({
    title: 'MarkdownCanDo',

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        theme: { light: 'github-light', dark: 'github-dark' } ,
        math: true,
        config: (md) => {
            md.use(markdown_it_footnote)
            md.use(markdown_it_task_list)
            useCustomFences(md)
            useOptimizedImages(md)
        }
    },

    sitemap: {
        hostname: siteOrigin,
        transformItems(items) {
            return items.filter((item) => item.url !== '404' && !item.url.includes('migration'))
        }
    },

    transformPageData(pageData) {
        pageData.frontmatter.head ??= []
        if (pageData.relativePath === '404.md') {
            pageData.frontmatter.head.push([
                'meta',
                { name: 'robots', content: 'noindex, nofollow' }
            ])
            return
        }
        const url = canonicalUrl(pageData.relativePath)
        pageData.frontmatter.head.push(
            ['link', { rel: 'canonical', href: url }],
            ['meta', { property: 'og:url', content: url }]
        )
    },

    head: [
        // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-mini.svg' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }],
        ['meta', { name: 'theme-color', content: '#fcfcfc', media: '(prefers-color-scheme: light)' }],
        ['meta', { name: 'theme-color', content: '#111111', media: '(prefers-color-scheme: dark)' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Markdown Can Do' }],
        ['meta', { property: 'og:site_name', content: 'MarkdownCanDo' }],
        // Load analytics after the page becomes interactive and never during local development.
        ['script', { src: `/analytics.js?id=${analyticsId}`, defer: '' }]
    ],

    themeConfig: {
        logo: { src: '/logo-mini.png', width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/gantrol/markdown-can-do' }
        ],

        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {
                        buttonText: 'Search',
                        // Let the visible label and shortcut form the accessible name.
                        buttonAriaLabel: ''
                    }
                },
                locales: { ...zhSearch, ...ptSearch }
            }
        },

    },
    // Tutorial and showcase sources are loaded as data; they are not standalone pages.
    srcExclude: [
        '**/tutorial/src/**',
        '**/showcase/src/**'
    ]
})
