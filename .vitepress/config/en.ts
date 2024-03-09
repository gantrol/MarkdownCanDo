import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "MarkdownCanDo",
    description: "A website shows Markdown get thing done.",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuide() },
            '/reference/': { base: '/reference/', items: sidebarReference() }
        },

        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
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
            link: '/guide/what-is-vitepress',
            activeMatch: '/guide/'
        },
        {
            text: 'Reference',
            link: '/reference/site-config',
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
                { text: 'What is Markdown?', link: 'what-is-markdown' },
                { text: 'Getting Started', link: 'getting-started' },
            ]
        },
        {
            text: 'Writing',
            collapsed: false,
            items: [
                { text: 'Markdown Extensions', link: 'markdown' },
                { text: 'Asset Handling', link: 'asset-handling' },
            ]
        },
        {
            text: 'Customization',
            collapsed: false,
            items: [
                { text: 'Using a Custom Theme', link: 'custom-theme' },
                {
                    text: 'Extending the Default Theme',
                    link: 'extending-default-theme'
                },
                { text: 'Build-Time Data Loading', link: 'data-loading' },
                { text: 'SSR Compatibility', link: 'ssr-compat' },
                { text: 'Connecting to a CMS', link: 'cms' }
            ]
        },
        {
            text: 'Experimental',
            collapsed: false,
            items: [
                { text: 'MPA Mode', link: 'mpa-mode' },
                { text: 'Sitemap Generation', link: 'sitemap-generation' }
            ]
        },
        { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
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
