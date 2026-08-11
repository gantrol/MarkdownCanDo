export type UiLocale = 'en-US' | 'pt-BR' | 'zh-Hans'

export const editorMessages = {
  'en-US': {
    wysiwyg: 'WYSIWYG',
    loadingWysiwyg: 'Loading visual editor…',
    wysiwygError: 'The visual editor could not be loaded. Your Markdown source is unchanged.',
    inlineCode: 'Inline code',
    codeBlock: 'Code block',
    math: 'Math formula',
    editor: 'Markdown editor',
    view: 'Editor view',
    textFormatting: 'Text formatting',
    lists: 'Lists',
    insert: 'Insert',
    documentActions: 'Document actions',
    source: 'Markdown source',
    preview: 'Preview',
    split: 'Split view',
    edit: 'Edit only',
    previewOnly: 'Preview only',
    heading: 'Heading',
    bold: 'Bold',
    italic: 'Italic',
    strike: 'Strikethrough',
    link: 'Link',
    bulletList: 'Bulleted list',
    orderedList: 'Numbered list',
    taskList: 'Task list',
    quote: 'Block quote',
    code: 'Code',
    table: 'Table',
    rule: 'Divider',
    copy: 'Copy Markdown',
    copied: 'Copied',
    fullscreen: 'Toggle fullscreen',
    mermaidDiagram: 'Mermaid diagram',
    diagramLoading: 'Rendering diagram…',
    diagramError: 'The diagram could not be rendered. Check the source below.',
    diagramPreview: 'Diagram preview',
    editDiagram: 'Edit diagram source',
    hideDiagramSource: 'Show diagram only',
    musicNotation: 'Music notation',
    musicError: 'The music notation could not be rendered. Check the source below.',
    boldPlaceholder: 'bold text',
    italicPlaceholder: 'italic text',
    strikePlaceholder: 'strikethrough',
    linkPlaceholder: 'link text',
    codePlaceholder: 'code',
    tableColumn1: 'Column 1',
    tableColumn2: 'Column 2',
    tableValue1: 'Value 1',
    tableValue2: 'Value 2',
    stats: (lines: number, words: number, characters: number) => `${lines} lines · ${words} words · ${characters} characters`
  },
  'pt-BR': {
    wysiwyg: 'Edição visual',
    loadingWysiwyg: 'Carregando editor visual…',
    wysiwygError: 'Não foi possível carregar o editor visual. O código Markdown não foi alterado.',
    inlineCode: 'Código em linha',
    codeBlock: 'Bloco de código',
    math: 'Fórmula matemática',
    editor: 'Editor de Markdown',
    view: 'Visualização do editor',
    textFormatting: 'Formatação de texto',
    lists: 'Listas',
    insert: 'Inserir',
    documentActions: 'Ações do documento',
    source: 'Código Markdown',
    preview: 'Pré-visualização',
    split: 'Visualização dividida',
    edit: 'Somente editar',
    previewOnly: 'Somente pré-visualização',
    heading: 'Título',
    bold: 'Negrito',
    italic: 'Itálico',
    strike: 'Tachado',
    link: 'Link',
    bulletList: 'Lista com marcadores',
    orderedList: 'Lista numerada',
    taskList: 'Lista de tarefas',
    quote: 'Citação',
    code: 'Código',
    table: 'Tabela',
    rule: 'Divisor',
    copy: 'Copiar Markdown',
    copied: 'Copiado',
    fullscreen: 'Alternar tela cheia',
    mermaidDiagram: 'Diagrama Mermaid',
    diagramLoading: 'Renderizando diagrama…',
    diagramError: 'Não foi possível renderizar o diagrama. Verifique o código-fonte abaixo.',
    diagramPreview: 'Prévia do diagrama',
    editDiagram: 'Editar código do diagrama',
    hideDiagramSource: 'Mostrar somente o diagrama',
    musicNotation: 'Notação musical',
    musicError: 'Não foi possível renderizar a notação musical. Verifique o código-fonte abaixo.',
    boldPlaceholder: 'texto em negrito',
    italicPlaceholder: 'texto em itálico',
    strikePlaceholder: 'texto tachado',
    linkPlaceholder: 'texto do link',
    codePlaceholder: 'código',
    tableColumn1: 'Coluna 1',
    tableColumn2: 'Coluna 2',
    tableValue1: 'Valor 1',
    tableValue2: 'Valor 2',
    stats: (lines: number, words: number, characters: number) => `${lines} linhas · ${words} palavras · ${characters} caracteres`
  },
  'zh-Hans': {
    wysiwyg: '所见即所得',
    loadingWysiwyg: '正在加载可视化编辑器…',
    wysiwygError: '可视化编辑器加载失败，Markdown 源文未被修改。',
    inlineCode: '行内代码',
    codeBlock: '代码块',
    math: '数学公式',
    editor: 'Markdown 编辑器',
    view: '编辑器视图',
    textFormatting: '文字格式',
    lists: '列表',
    insert: '插入',
    documentActions: '文档操作',
    source: 'Markdown 源文',
    preview: '预览',
    split: '分栏视图',
    edit: '仅编辑',
    previewOnly: '仅预览',
    heading: '标题',
    bold: '粗体',
    italic: '斜体',
    strike: '删除线',
    link: '链接',
    bulletList: '无序列表',
    orderedList: '有序列表',
    taskList: '任务列表',
    quote: '引用',
    code: '代码',
    table: '表格',
    rule: '分隔线',
    copy: '复制 Markdown',
    copied: '已复制',
    fullscreen: '切换全屏',
    mermaidDiagram: 'Mermaid 图表',
    diagramLoading: '正在渲染图表…',
    diagramError: '图表无法渲染，请检查下方源码。',
    diagramPreview: '图表预览',
    editDiagram: '编辑图表源码',
    hideDiagramSource: '仅显示图表',
    musicNotation: '五线谱',
    musicError: '五线谱无法渲染，请检查下方源码。',
    boldPlaceholder: '粗体文字',
    italicPlaceholder: '斜体文字',
    strikePlaceholder: '删除线文字',
    linkPlaceholder: '链接文字',
    codePlaceholder: '代码',
    tableColumn1: '列 1',
    tableColumn2: '列 2',
    tableValue1: '内容 1',
    tableValue2: '内容 2',
    stats: (lines: number, words: number, characters: number) => `${lines} 行 · ${words} 词 · ${characters} 字符`
  }
} as const

export const homeMessages = {
  'en-US': {
    demoLabel: 'Editable Markdown example',
    fileName: 'weekend.md',
    source: 'Source',
    preview: 'Preview',
    sourceAriaLabel: 'Edit the Markdown example',
    formats: ['Markdown', 'Mermaid', 'Math'],
    example: [
      '# Saturday picnic',
      '',
      '10:30 · Lakeside Park',
      '',
      '- [x] Check the weather',
      '- [ ] Pack sandwiches and water',
      '',
      '```mermaid',
      'flowchart LR',
      '  A[Leave home] --> B[Pick up coffee]',
      '  B --> C[Picnic by the lake]',
      '```'
    ].join('\n')
  },
  'pt-BR': {
    demoLabel: 'Exemplo editável de Markdown',
    fileName: 'fim-de-semana.md',
    source: 'Fonte',
    preview: 'Prévia',
    sourceAriaLabel: 'Editar o exemplo de Markdown',
    formats: ['Markdown', 'Mermaid', 'Matemática'],
    example: [
      '# Piquenique de sábado',
      '',
      '10h30 · Parque do Lago',
      '',
      '- [x] Conferir o tempo',
      '- [ ] Levar sanduíches e água',
      '',
      '```mermaid',
      'flowchart LR',
      '  A[Sair de casa] --> B[Buscar café]',
      '  B --> C[Piquenique no lago]',
      '```'
    ].join('\n')
  },
  'zh-Hans': {
    demoLabel: '可编辑的 Markdown 示例',
    fileName: 'weekend.md',
    source: '源文',
    preview: '预览',
    sourceAriaLabel: '编辑 Markdown 示例',
    formats: ['Markdown', 'Mermaid', '公式'],
    example: [
      '# 周六野餐',
      '',
      '10:30 · 湖畔公园',
      '',
      '- [x] 查看天气',
      '- [ ] 带三明治和水',
      '',
      '```mermaid',
      'flowchart LR',
      '  A[从家出发] --> B[买咖啡]',
      '  B --> C[湖边野餐]',
      '```'
    ].join('\n')
  }
} as const

export const showcaseMessages = {
  'en-US': {
    heading: 'Markdown examples',
    examples: {
      'mermaid-flowchart': 'Flowchart',
      'mermaid-gantt-syntax': 'Gantt chart',
      'mermaid-mindmap-use-chatgpt': 'Mind map with ChatGPT',
      'mermaid-timeline-chatgpt': 'Timeline with ChatGPT',
      'mermaid-timeline-claude': 'Timeline with Claude',
      math_symbols: 'Math symbols',
      'table-ai': 'Smart table'
    }
  },
  'pt-BR': {
    heading: 'Exemplos de Markdown',
    examples: {
      'mermaid-flowchart': 'Fluxograma',
      'mermaid-gantt-syntax': 'Gráfico de Gantt',
      'mermaid-mindmap-use-chatgpt': 'Mapa mental com ChatGPT',
      'mermaid-timeline-chatgpt': 'Linha do tempo com ChatGPT',
      'mermaid-timeline-claude': 'Linha do tempo com Claude',
      math_symbols: 'Símbolos matemáticos',
      'table-ai': 'Tabela inteligente'
    }
  },
  'zh-Hans': {
    heading: 'Markdown 示例',
    examples: {
      'mermaid-flowchart': '流程图',
      'mermaid-gantt-syntax': '甘特图',
      'mermaid-mindmap-use-chatgpt': '用 ChatGPT 生成思维导图',
      'mermaid-timeline-chatgpt': '用 ChatGPT 生成时间线',
      'mermaid-timeline-claude': '用 Claude 生成时间线',
      math_symbols: '数学符号',
      'table-ai': '智能表格'
    }
  }
} as const

export const diagramMessages = {
  'en-US': {
    mermaid: 'Mermaid diagram',
    mermaidLoading: 'Rendering diagram…',
    mermaidError: 'The diagram could not be rendered. Check the source below.',
    mermaidSource: 'Mermaid source',
    music: 'Music notation',
    musicLoading: 'Rendering music notation…',
    musicError: 'The music notation could not be rendered. Check the source below.',
    musicSource: 'ABC source'
  },
  'pt-BR': {
    mermaid: 'Diagrama Mermaid',
    mermaidLoading: 'Renderizando diagrama…',
    mermaidError: 'Não foi possível renderizar o diagrama. Verifique o código-fonte abaixo.',
    mermaidSource: 'Código Mermaid',
    music: 'Notação musical',
    musicLoading: 'Renderizando notação musical…',
    musicError: 'Não foi possível renderizar a notação musical. Verifique o código-fonte abaixo.',
    musicSource: 'Código ABC'
  },
  'zh-Hans': {
    mermaid: 'Mermaid 图表',
    mermaidLoading: '正在渲染图表…',
    mermaidError: '图表无法渲染，请检查下方源码。',
    mermaidSource: 'Mermaid 源码',
    music: '五线谱',
    musicLoading: '正在渲染五线谱…',
    musicError: '五线谱无法渲染，请检查下方源码。',
    musicSource: 'ABC 源码'
  }
} as const

export const tutorialMessages = {
  'en-US': {
    steps: 'Tutorial steps',
    instructions: 'Tutorial instructions',
    emptyCode: '<!-- No example available. -->',
    noDescription: 'No description available.'
  },
  'pt-BR': {
    steps: 'Etapas do tutorial',
    instructions: 'Instruções do tutorial',
    emptyCode: '<!-- Nenhum exemplo disponível. -->',
    noDescription: 'Nenhuma descrição disponível.'
  },
  'zh-Hans': {
    steps: '教程步骤',
    instructions: '教程说明',
    emptyCode: '<!-- 暂无示例内容。 -->',
    noDescription: '暂无说明。'
  }
} as const

export const replLoadingMessages = {
  'en-US': 'Loading editor…',
  'pt-BR': 'Carregando o editor…',
  'zh-Hans': '编辑器加载中…'
} as const

export function resolveUiLocaleTag(localeTag?: string): UiLocale {
  let canonical = localeTag ?? ''
  try {
    canonical = Intl.getCanonicalLocales(canonical)[0] ?? canonical
  } catch {
    // An unknown read-time locale falls back to English below.
  }

  if (canonical === 'zh-Hans' || canonical === 'zh-CN' || canonical.startsWith('zh-')) return 'zh-Hans'
  if (canonical === 'pt-BR' || canonical.startsWith('pt-') || canonical === 'pt') return 'pt-BR'
  return 'en-US'
}

export function getUiLocale(pathname?: string): UiLocale {
  const path = pathname ?? (typeof location === 'undefined' ? '/' : location.pathname)
  if (path === '/zh' || path.startsWith('/zh/')) return 'zh-Hans'
  if (path === '/pt' || path.startsWith('/pt/')) return 'pt-BR'
  return 'en-US'
}
