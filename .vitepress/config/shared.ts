import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'
import { search as ptSearch } from './pt'

export const shared = defineConfig({
    title: 'MarkdownCanDo',

    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,

    markdown: {
        math: true,
    },

    sitemap: {
        hostname: 'https://markdowncando.dev',
        transformItems(items) {
            return items.filter((item) => !item.url.includes('migration'))
        }
    },

    head: [
        ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-mini.svg' }],
        // ['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Markdown Can Do' }],
        ['meta', { property: 'og:site_name', content: 'MarkdownCanDo' }],
        ['meta', { property: 'og:url', content: 'https://markdowncando.com/' }],
    ],

    themeConfig: {
        logo: { src: '/logo-mini.svg', width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/gantrol/markdown-can-do' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: { ...zhSearch, ...ptSearch }
            }
        },

    }
})
