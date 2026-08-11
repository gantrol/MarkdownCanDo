import { defineConfig, type DefaultTheme } from 'vitepress'


export const pt = defineConfig({
    lang: 'pt-BR',
    title: "MarkdownCanDo",
    description: "Markdown pode fazer isso! Livre-se dos incômodos do Word e da formatação HTML — fácil de usar, eficiente, texto puro, multifuncional, amigável à IA",


    themeConfig: {
        nav: nav(),

        sidebar: {
            '/pt/guide/': sidebarGuide(),
            '/pt/reference/': sidebarReference(),
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: 'Edite esta página no GitHub'
        },

        footer: {
            copyright: `Direitos reservados © 2024-${new Date().getFullYear()} Gantrol Hwang`
        },

        docFooter: {
            prev: 'Anterior',
            next: 'Próximo'
        },

        outline: {
            label: 'Nesta página'
        },

        lastUpdated: {
            text: 'Atualizado em',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        langMenuLabel: 'Alterar Idioma',
        returnToTopLabel: 'Voltar ao Topo',
        sidebarMenuLabel: 'Menu Lateral',
        darkModeSwitchLabel: 'Tema Escuro',
        lightModeSwitchTitle: 'Mudar para Modo Claro',
        darkModeSwitchTitle: 'Mudar para Modo Escuro'
    }
})

function nav(): DefaultTheme.NavItem[] {
    return [
        {
            text: 'Tutorial',
            link: '/pt/tutorial/',
            activeMatch: '^/pt/tutorial(?:/|$)',
        },
        {
            text: 'Guia',
            link: '/pt/guide/',
            activeMatch: '^/pt/guide(?:/|$)',
        },
        {
            text: 'Playground',
            link: '/pt/playground/',
            activeMatch: '^/pt/playground(?:/|$)'
        },
        {
            text: 'Exemplos',
            link: '/pt/showcase/',
            activeMatch: '^/pt/showcase(?:/|$)',
        },
        {
            text: 'Referência',
            link: '/pt/reference/cheatsheet/',
            activeMatch: '^/pt/reference(?:/|$)'
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introdução',
            collapsed: false,
            items: [
                { text: 'O que o Markdown pode fazer', link: '/pt/guide/' },
                { text: 'Por que usar Markdown?', link: '/pt/guide/why' },
                { text: 'O que é Markdown?', link: '/pt/guide/what-is-markdown' },
            ]
        },
    ]
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Referência',
            collapsed: false,
            items: [
                { text: 'Guia rápido', link: '/pt/reference/cheatsheet/' },
                { text: 'Usar o ChatGPT', link: '/pt/reference/chatgpt/' },
                { text: 'Recursos adicionais', link: '/pt/reference/resource' },
            ]
        }
    ]
}
export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    pt: {
        placeholder: 'Pesquisar documentos',
        translations: {
            button: {
                buttonText: 'Pesquisar',
                // Deixe o texto visível e o atalho formarem o nome acessível.
                buttonAriaLabel: ''
            },
            modal: {
                searchBox: {
                    resetButtonTitle: 'Limpar pesquisa',
                    resetButtonAriaLabel: 'Limpar pesquisa',
                    cancelButtonText: 'Cancelar',
                    cancelButtonAriaLabel: 'Cancelar'
                },
                startScreen: {
                    recentSearchesTitle: 'Histórico de Pesquisa',
                    noRecentSearchesText: 'Nenhuma pesquisa recente',
                    saveRecentSearchButtonTitle: 'Salvar no histórico de pesquisas',
                    removeRecentSearchButtonTitle: 'Remover do histórico de pesquisas',
                    favoriteSearchesTitle: 'Favoritos',
                    removeFavoriteSearchButtonTitle: 'Remover dos favoritos'
                },
                errorScreen: {
                    titleText: 'Não foi possível obter resultados',
                    helpText: 'Verifique a sua conexão de rede'
                },
                footer: {
                    selectText: 'Selecionar',
                    navigateText: 'Navegar',
                    closeText: 'Fechar',
                    searchByText: 'Pesquisa por'
                },
                noResultsScreen: {
                    noResultsText: 'Não foi possível encontrar resultados',
                    suggestedQueryText: 'Você pode tentar uma nova consulta',
                    reportMissingResultsText:
                        'Deveriam haver resultados para essa consulta?',
                    reportMissingResultsLinkText: 'Clique para enviar feedback'
                }
            }
        }
    }
}
