import { defineConfig, type DefaultTheme } from 'vitepress'


export const pt = defineConfig({
    lang: 'pt-BR',
    description: '',

    themeConfig: {
        nav: nav(),

        sidebar: {
            // '/pt/guide/': { base: '/pt/guide/', items: sidebarGuide() },
            // '/pt/reference/': { base: '/pt/reference/', items: sidebarReference() }
        },

        editLink: {
            pattern: 'https://github.com/gantrol/markdown-can-do/edit/main/:path',
            text: 'Edite esta página no GitHub'
        },

        footer: {
            message: 'Lançado sob licença MIT',
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
            text: 'Guia',
            link: '/pt/guide/what-is-',
            activeMatch: '/pt/guide/'
        },
        {
            text: 'Referência',
            link: '/pt/reference/site-config',
            activeMatch: '/pt/reference/'
        }
    ]
}

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    pt: {
        placeholder: 'Pesquisar documentos',
        translations: {
            button: {
                buttonText: 'Pesquisar',
                buttonAriaLabel: 'Pesquisar'
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
