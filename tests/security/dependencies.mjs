import { createRequire } from 'node:module'

// Resolve from each parent, so pnpm's isolated layout is respected. Testing a
// separately installed root copy could miss the vulnerable copy used by SRE.
const rootRequire = createRequire(new URL('../../package.json', import.meta.url))
const pluginRequire = createRequire(rootRequire.resolve('markdown-it-mathjax3'))
const mathjaxRequire = createRequire(pluginRequire.resolve('mathjax-full/package.json'))
const sreEntry = mathjaxRequire.resolve('speech-rule-engine')
const sreRequire = createRequire(sreEntry)

export const xmldom = sreRequire('@xmldom/xmldom')
export const xmldomVersion = sreRequire('@xmldom/xmldom/package.json').version
export const loadSpeechRuleEngine = () => mathjaxRequire('speech-rule-engine')
