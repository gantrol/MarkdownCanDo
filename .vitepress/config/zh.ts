import { defineConfig, type DefaultTheme } from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Markdown 能做！摆脱烦人的 Word 和 HTML 排版 —— 易用、高效、纯文本、多功能、AI 友好',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/guide/': { base: '/zh/guide/', items: sidebarGuideAndReference() },
            '/zh/reference/': { base: '/zh/reference/', items: sidebarGuideAndReference() },
            '/zh/showcase/': { base: '/zh/showcase/', items: sidebarShowcase() },
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            copyright: `版权所有 © 2024-${new Date().getFullYear()} 黄健楸`
        },

        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        outline: {
            label: '页面导航'
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: '主页',
            link: '/zh/',
            activeMatch: '^/zh/$',
        },
        {
            text: '文档',
            activeMatch: '/zh/[tutorial|guide|showcase|reference]/',
            items: [
                {
                    text: '教程',
                    link: '/zh/tutorial/',
                    activeMatch: '/zh/tutorial/'
                },
                {
                    text: '指南',
                    link: '/zh/guide/',
                    activeMatch: '/zh/guide/'
                },
                {
                    text: '参考',
                    link: '/zh/reference/resource',
                    activeMatch: '/reference/resource',
                },
                {
                    text: '样例',
                    link: '/zh/showcase/',
                    activeMatch: '^/zh/showcase',
                },
            ]
        },
        {
            text: '备忘',
            link: '/zh/reference/cheatsheet/',
            activeMatch: '/zh/reference/cheatsheet/'
        },

        {
            text: '演练场',
            link: '/zh/playground/',
            activeMatch: '/zh/playground/'
        }
    ]
}

function sidebarGuideAndReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "指南",
            base: '/zh/guide/',
            items: sidebarGuide(),
        },
        {
            text: "参考",
            base: '/zh/reference/',
            items: sidebarReference(),
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '介绍',
            collapsed: false,
            items: [
                { text: 'Markdown 能做', link: '/' },
                { text: '为何用 Markdown？', link: 'why' },
                { text: '什么是 Markdown？', link: 'what-is-markdown' },
            ]
        },
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        { text: '备忘', link: 'cheatsheet/' },
        { text: '参考资料', link: 'resource' },
        // { text: '术语表', link: 'glossary' },
    ]
}

function sidebarShowcase(): DefaultTheme.SidebarItem[] {
    return [
        { text: 'ChatGPT 时间线', link: '#mermaid-timeline-chatgpt' },
        { text: 'Mermaid 思维导图 ChatGPT', link: '#mermaid-mindmap-use-chatgpt' },
        { text: 'Mermaid 甘特图', link: '#mermaid-gantt-syntax' },
        { text: 'Mermaid 流程图', link: '#mermaid-flowchart' },
        { text: 'Markdown 脚注', link: 'footnote' },
        // { text: '', link: '' },
    ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
            },
            modal: {
                searchBox: {
                    resetButtonTitle: '清除查询条件',
                    resetButtonAriaLabel: '清除查询条件',
                    cancelButtonText: '取消',
                    cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                    recentSearchesTitle: '搜索历史',
                    noRecentSearchesText: '没有搜索历史',
                    saveRecentSearchButtonTitle: '保存至搜索历史',
                    removeRecentSearchButtonTitle: '从搜索历史中移除',
                    favoriteSearchesTitle: '收藏',
                    removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                    titleText: '无法获取结果',
                    helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                    searchByText: '搜索提供者'
                },
                noResultsScreen: {
                    noResultsText: '无法找到相关结果',
                    suggestedQueryText: '你可以尝试查询',
                    reportMissingResultsText: '你认为该查询应该有结果？',
                    reportMissingResultsLinkText: '点击反馈'
                }
            }
        }
    }
}
