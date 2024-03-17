import { defineConfig, type DefaultTheme } from 'vitepress'


export const pt = defineConfig({
    lang: 'pt-BR',
    title: "MarkdownCanDo",
    description: "Markdown pode fazer isso! Livre-se dos incômodos do Word e da formatação HTML — fácil de usar, eficiente, texto puro, multifuncional, amigável à IA",


    themeConfig: {
        nav: nav(),

        sidebar: {
            '/pt/guide/': { base: '/pt/guide/', items: sidebarGuideAndReference() },
            '/pt/reference/': { base: '/pt/reference/', items: sidebarGuideAndReference() },
            '/pt/showcase/': { base: '/pt/showcase/', items: sidebarShowcase() },
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
            text: 'Início',
            link: '/pt/',
            activeMatch: '^/$',
        },
        {
            text: 'Documentação',
            activeMatch: '/pt/[tutorial|guide|showcase|reference]/',
            items: [
                {
                    text: 'Tutorial',
                    link: '/pt/tutorial/',
                    activeMatch: '/pt/tutorial/',
                },
                {
                    text: 'Guia',
                    link: '/pt/guide/',
                    activeMatch: '/pt/guide/',
                },
                {
                    text: 'Referência',
                    link: '/pt/reference/resource',
                    activeMatch: '/pt/reference/resource',
                },
                {
                    text: 'Exemplos',
                    link: '/pt/showcase/',
                    activeMatch: '^/showcase',
                },
            ]
        },
        {
            text: 'CheatSheet',
            link: '/pt/reference/cheatsheet/',
            activeMatch: '/pt/reference/cheatsheet/'
        },
        {
            text: 'Playground',
            link: '/pt/playground/',
            activeMatch: '/pt/playground/'
        }
    ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: 'Introdução',
            collapsed: false,
            items: [
                { text: 'O que o Markdown pode fazer', link: 'index.html' },
                { text: 'Por que usar Markdown?', link: 'why' },
                { text: 'O que é Markdown?', link: 'what-is-markdown' },
            ]
        },
    ]
}

function sidebarGuideAndReference(): DefaultTheme.SidebarItem[] {
    return [
        {
            text: "Guia",
            base: '/pt/guide/',
            items: sidebarGuide(),
        },
        {
            text: "Referência",
            base: '/pt/reference/',
            items: sidebarReference(),
        }
    ]
}



function sidebarReference(): DefaultTheme.SidebarItem[] {
    return [
        { text: 'CheatSheet', link: 'cheatsheet/' },
        { text: 'Materiais de Referência', link: 'resource' },
    ]
}
function sidebarShowcase(): DefaultTheme.SidebarItem[] {
    return [
        // { text: 'Linha do Tempo Claude Gantt', link: '#mermaid-timeline-claude' },
        { text: 'Linha do Tempo do ChatGPT ', link: '#mermaid-timeline-chatgpt' },
        { text: 'Mapa Mental Mermaid do ChatGPT', link: '#mermaid-mindmap-use-chatgpt' },
        { text: 'Sintaxe Gantt Mermaid', link: '#mermaid-gantt-syntax' },
        { text: 'Fluxograma Mermaid', link: '#mermaid-flowchart' },
        { text: 'Nota de Rodapé Markdown', link: 'footnote' },
        // { text: '', link: '' },
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
