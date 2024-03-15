import { defineConfig } from 'vitepress'
import { search as zhSearch } from './zh'
import { search as ptSearch } from './pt'
import markdown_it_footnote from 'markdown-it-footnote'
import markdown_it_task_list from 'markdown-it-task-checkbox'

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
            // md.use()
        }
    },

    sitemap: {
        hostname: 'https://markdowncando.com',
        transformItems(items) {
            return items.filter((item) => !item.url.includes('migration'))
        }
    },

    head: [
        // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo-mini.svg' }],
        ['link', { rel: 'icon', type: 'image/png', href: '/logo-mini.png' }],
        ['meta', { name: 'theme-color', content: '#5f67ee' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:locale', content: 'en' }],
        ['meta', { property: 'og:title', content: 'Markdown Can Do' }],
        ['meta', { property: 'og:site_name', content: 'MarkdownCanDo' }],
        ['meta', { property: 'og:url', content: 'https://markdowncando.com/' }],
        // ga4
        [
            'script',
            { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-RX6RPWRSWJ' }
        ],
        [
            'script',
            {},
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RX6RPWRSWJ');"
        ]
    ],

    themeConfig: {
        logo: { src: '/logo-mini.png', width: 24, height: 24 },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/gantrol/markdown-can-do' }
        ],

        search: {
            provider: 'local',
            options: {
                locales: { ...zhSearch, ...ptSearch }
            }
        },

    },
    // for dead link
    srcExclude: ['**/step-6/**/description.md'],

    // quick fix: https://github.com/mermaid-js/mermaid/issues/4320
    vite: {
        optimizeDeps: {
            include: [
                'mermaid'
            ]
        }
    }
})
