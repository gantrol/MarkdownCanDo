import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "MarkdownCanDo",
    description: "Markdown can do it! Get rid of the annoying Word and HTML formatting — easy to use, efficient, plain text, multifunctional, AI-friendly",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
            '/reference/': { base: '/reference/', items: sidebarReference() }
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: 'Edit this page on GitHub'
        },

        footer: {
            message: 'Released under the MIT License.',

            copyright: 'Copyright © 2024-present Gantrol Hwang'
        }
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Guide',
            link: '/guide/',
            activeMatch: '/guide/'
        },
        {
            text: 'Reference',
            link: '/reference/',
            activeMatch: '/reference/'
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [
                { text: 'What Markdown can do', link: '/' },
                { text: 'Why use Markdown?', link: 'why' },
                { text: 'What is Markdown?', link: 'what-is-markdown' },
            ]
        },
        { text: 'Reference Materials', base: '/', link: 'reference-resource' },
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Reference',
            items: [
                { text: 'Site Config', link: 'site-config' },
                { text: 'Frontmatter Config', link: 'frontmatter-config' },
                { text: 'Runtime API', link: 'runtime-api' },
                { text: 'CLI', link: 'cli' },
                {
                    text: 'Default Theme',
                    base: '/reference/default-theme-',
                    items: [
                        { text: 'Overview', link: 'config' },
                        { text: 'Nav', link: 'nav' },
                        { text: 'Sidebar', link: 'sidebar' },
                        { text: 'Home Page', link: 'home-page' },
                        { text: 'Footer', link: 'footer' },
                        { text: 'Layout', link: 'layout' },
                        { text: 'Badge', link: 'badge' },
                        { text: 'Team Page', link: 'team-page' },
                        { text: 'Prev / Next Links', link: 'prev-next-links' },
                        { text: 'Edit Link', link: 'edit-link' },
                        { text: 'Last Updated Timestamp', link: 'last-updated' },
                        { text: 'Search', link: 'search' },
                        { text: 'Carbon Ads', link: 'carbon-ads' }
                    ]
                }
            ]
        }
    ]
}
