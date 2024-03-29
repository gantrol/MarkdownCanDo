import { defineConfig, type DefaultTheme } from 'vitepress'


export const en = defineConfig({
    lang: 'en-US',
    title: "MarkdownCanDo",
    description: "Markdown can do it! Get rid of the annoying Word and HTML formatting — easy to use, efficient, plain text, multifunctional, AI-friendly",

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/guide/': { base: '/guide/', items: sidebarGuideAndReference() },
            '/reference/': { base: '/reference/', items: sidebarGuideAndReference() },
            '/showcase/': { base: '/showcase/', items: sidebarShowcase() },
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
            text: 'Home',
            link: '/',
            activeMatch: '^/$',
        },
        {
            text: 'Docs',
            activeMatch: '/[tutorial|guide|showcase|reference]/',
            items: [
                {
                    text: 'Tutorial',
                    link: '/tutorial/',
                    activeMatch: '/tutorial/',
                },
                {
                    text: 'Guide',
                    link: '/guide/',
                    activeMatch: '/guide/',
                },
                {
                    text: 'Reference',
                    link: '/reference/resource',
                    activeMatch: '/reference/resource',
                },
                {
                    text: 'Examples',
                    link: '/showcase/',
                    activeMatch: '^/showcase',
                },
            ]
        },
        {
            text: 'CheatSheet',
            link: '/reference/cheatsheet/',
            activeMatch: '/reference/cheatsheet/'
        },
        {
            text: 'Playground',
            link: '/playground/',
            activeMatch: '/playground/'
        }
    ]
}

function sidebarGuideAndReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "Guide",
            base: '/guide/',
            items: sidebarGuide(),
        },
        {
            text: "Reference",
            base: '/reference/',
            items: sidebarReference(),
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introduction',
            collapsed: false,
            items: [
                { text: 'What Markdown can do', link: 'index.html' },
                { text: 'Why use Markdown?', link: 'why' },
                { text: 'What is Markdown?', link: 'what-is-markdown' },
            ]
        },
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        { text: 'CheatSheet', link: 'cheatsheet/' },
        { text: 'Reference Materials', link: 'resource' },
    ]
}
function sidebarShowcase(): DefaultTheme.SidebarItem[] {
    return [
        // { text: 'Claude Gantt Timeline', link: '#mermaid-timeline-claude' },
        { text: 'Timeline of ChatGPT ', link: '#mermaid-timeline-chatgpt' },
        { text: 'Mermaid Mindmap ChatGPT', link: '#mermaid-mindmap-use-chatgpt' },
        { text: 'Mermaid Gantt Syntax', link: '#mermaid-gantt-syntax' },
        { text: 'Mermaid Flowchart', link: '#mermaid-flowchart' },
        { text: 'Markdown Footnote', link: 'footnote' },
        // { text: '', link: '' },
    ]
}
