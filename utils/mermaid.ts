function readColor(name: string, fallback: string) {
  if (typeof document === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

export function getMermaidConfig() {
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  return {
    startOnLoad: false,
    // SVG text survives strict sanitization and remains selectable/accessibility-friendly.
    // Mermaid's old flowchart-level option is deprecated; the root option wins.
    htmlLabels: false,
    securityLevel: 'strict' as const,
    suppressErrorRendering: true,
    theme: 'base' as const,
    themeVariables: {
      darkMode: isDark,
      background: readColor('--vp-c-bg', isDark ? '#111111' : '#fcfcfc'),
      primaryColor: readColor('--md-diagram-node', isDark ? '#253127' : '#e9f6e9'),
      primaryTextColor: readColor('--vp-c-text-1', isDark ? '#eeeeee' : '#202020'),
      primaryBorderColor: readColor('--md-diagram-node-border', isDark ? '#4c7a54' : '#65a76f'),
      secondaryColor: readColor('--vp-c-bg-soft', isDark ? '#191919' : '#f9f9f9'),
      secondaryTextColor: readColor('--vp-c-text-1', isDark ? '#eeeeee' : '#202020'),
      secondaryBorderColor: readColor('--vp-c-border', isDark ? '#484848' : '#cecece'),
      tertiaryColor: readColor('--vp-c-bg-alt', isDark ? '#191919' : '#f9f9f9'),
      tertiaryTextColor: readColor('--vp-c-text-1', isDark ? '#eeeeee' : '#202020'),
      tertiaryBorderColor: readColor('--vp-c-border', isDark ? '#484848' : '#cecece'),
      lineColor: readColor('--md-diagram-line', isDark ? '#b4b4b4' : '#646464'),
      textColor: readColor('--vp-c-text-1', isDark ? '#eeeeee' : '#202020'),
      mainBkg: readColor('--md-diagram-node', isDark ? '#253127' : '#e9f6e9'),
      nodeBorder: readColor('--md-diagram-node-border', isDark ? '#4c7a54' : '#65a76f'),
      clusterBkg: readColor('--vp-c-bg-soft', isDark ? '#191919' : '#f9f9f9'),
      clusterBorder: readColor('--vp-c-border', isDark ? '#484848' : '#cecece'),
      edgeLabelBackground: readColor('--vp-c-bg', isDark ? '#111111' : '#fcfcfc'),
      titleColor: readColor('--vp-c-text-1', isDark ? '#eeeeee' : '#202020'),
      fontFamily: readColor('--vp-font-family-base', 'system-ui, sans-serif')
    }
  }
}
