import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "MarkdownCanDo",
    description: "Markdown can do it! Get rid of the annoying Word and HTML formatting — easy to use, efficient, plain text, multifunctional, AI-friendly",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': sidebarDocs(),
            '/reference/': sidebarDocs(),
            '/tutorial/': sidebarDocs(),
            '/playground/': sidebarDocs(),
            '/showcase/': sidebarDocs(),
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
            text: 'Playground',
            link: '/',
            activeMatch: '^/$',
        },
        {
            text: 'Why Markdown',
            link: '/guide/why',
            activeMatch: '^/guide/why(?:/|$)',
        },
        {
            text: 'Interactive tutorial',
            link: '/tutorial/',
            activeMatch: '^/tutorial(?:/|$)',
        },
        {
            text: 'Word-like editing',
            link: '/playground/',
            activeMatch: '^/playground(?:/|$)'
        },
        {
            text: 'Complete reference',
            link: '/reference/cheatsheet/',
            activeMatch: '^/reference(?:/|$)'
        }
    ]
}

function sidebarDocs(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Learn Markdown',
            collapsed: false,
            items: [
                { text: 'What Markdown can do', link: '/guide/' },
                { text: 'What is Markdown?', link: '/guide/what-is-markdown' },
                { text: 'Why use Markdown?', link: '/guide/why' },
            ]
        },
        {
            text: 'Practice',
            collapsed: false,
            items: [
                { text: 'Markdown tutorial', link: '/tutorial/' },
                { text: 'Online Markdown playground', link: '/playground/' },
                { text: 'Markdown examples', link: '/showcase/' },
            ]
        },
        {
            text: 'Syntax & resources',
            collapsed: false,
            items: [
                { text: 'Markdown cheat sheet', link: '/reference/cheatsheet/' },
                { text: 'Write Markdown with ChatGPT', link: '/reference/chatgpt/' },
                { text: 'Markdown learning resources', link: '/reference/resource' },
            ]
        }
    ]
}
