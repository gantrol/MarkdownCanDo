import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "MarkdownCanDo",
    description: "Markdown can do it! Get rid of the annoying Word and HTML formatting — easy to use, efficient, plain text, multifunctional, AI-friendly",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': sidebarGuide(),
            '/reference/': sidebarReference(),
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            copyright: 'Copyright © 2024-present Gantrol Hwang'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Tutorial',
            link: '/tutorial/',
            activeMatch: '^/tutorial(?:/|$)',
        },
        {
            text: 'Guide',
            link: '/guide/',
            activeMatch: '^/guide(?:/|$)',
        },
        {
            text: 'Playground',
            link: '/playground/',
            activeMatch: '^/playground(?:/|$)'
        },
        {
            text: 'Examples',
            link: '/showcase/',
            activeMatch: '^/showcase(?:/|$)',
        },
        {
            text: 'Reference',
            link: '/reference/cheatsheet/',
            activeMatch: '^/reference(?:/|$)'
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [
                { text: 'What Markdown can do', link: '/guide/' },
                { text: 'Why use Markdown?', link: '/guide/why' },
                { text: 'What is Markdown?', link: '/guide/what-is-markdown' },
            ]
        },
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Reference',
            collapsed: false,
            items: [
                { text: 'Cheat sheet', link: '/reference/cheatsheet/' },
                { text: 'Use ChatGPT', link: '/reference/chatgpt/' },
                { text: 'Further resources', link: '/reference/resource' },
            ]
        }
    ]
}
