import { defineConfig, type DefaultTheme } from 'vitepress'


export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'Markdown 能做！摆脱烦人的 Word 和 HTML 排版 —— 易用、高效、纯文本、多功能、AI 友好',

    themeConfig: {
        nav: nav(),

        sidebar: {
            '/zh/guide/': sidebarDocs(),
            '/zh/reference/': sidebarDocs(),
            '/zh/tutorial/': sidebarDocs(),
            '/zh/playground/': sidebarDocs(),
            '/zh/showcase/': sidebarDocs(),
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: '在 GitHub 上编辑此页面'
        },

        footer: {
            message: '<a href="/zh/about">关于</a> · <a href="/zh/privacy">隐私</a> · <a href="/zh/terms">条款</a> · <a href="/zh/contact">联系</a>',
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
            text: '演练场',
            link: '/zh/',
            activeMatch: '^/zh/?$'
        },
        {
            text: '为什么用',
            link: '/zh/guide/why',
            activeMatch: '^/zh/guide/why(?:/|$)'
        },
        {
            text: '交互教程',
            link: '/zh/tutorial/',
            activeMatch: '^/zh/tutorial(?:/|$)'
        },
        {
            text: 'Word般体验',
            link: '/zh/playground/',
            activeMatch: '^/zh/playground(?:/|$)'
        },
        {
            text: '参考齐全',
            link: '/zh/reference/cheatsheet/',
            activeMatch: '^/zh/reference(?:/|$)'
        },
        {
            text: '关于',
            link: '/zh/about',
            activeMatch: '^/zh/(?:about|privacy|terms|contact)(?:/|$)'
        }
    ]
}

function sidebarDocs(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: '认识 Markdown',
            collapsed: false,
            items: [
                { text: 'Markdown 能做什么？', link: '/zh/guide/' },
                { text: '什么是 Markdown？', link: '/zh/guide/what-is-markdown' },
                { text: '为什么用 Markdown？', link: '/zh/guide/why' },
            ]
        },
        {
            text: '动手实践',
            collapsed: false,
            items: [
                { text: 'Markdown 入门教程', link: '/zh/tutorial/' },
                { text: '在线 Markdown 演练场', link: '/zh/playground/' },
                { text: 'Markdown 示例', link: '/zh/showcase/' },
            ]
        },
        {
            text: '语法与资源',
            collapsed: false,
            items: [
                { text: 'Markdown 语法速查', link: '/zh/reference/cheatsheet/' },
                { text: '用 ChatGPT 写 Markdown', link: '/zh/reference/chatgpt/' },
                { text: 'Markdown 学习资源', link: '/zh/reference/resource' },
            ]
        }
    ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    zh: {
        placeholder: '搜索文档',
        translations: {
            button: {
                buttonText: '搜索文档',
                // 让可见文字和快捷键共同组成无障碍名称。
                buttonAriaLabel: ''
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
