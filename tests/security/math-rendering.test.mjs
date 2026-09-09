import assert from 'node:assert/strict'
import test from 'node:test'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import katex from 'katex'
import { loadSpeechRuleEngine } from './dependencies.mjs'

// Exercise VitePress's math:true integration, not just the plugin in isolation.
// The full pnpm build additionally checks the application's actual config/pages.
test('VitePress retains inline/block mathematics and ordinary code', async () => {
  try {
    const md = await createMarkdownRenderer(process.cwd(), { math: true })
    const inline = md.render('Inline $x^2 + y^2 = z^2$.')
    assert.match(inline, /<mjx-container\b/)
    assert.match(inline, /<svg\b/)
    assert.doesNotMatch(inline, /data-mjx-error|data-mml-node="merror"/)

    const block = md.render('$$\n\\frac{1}{2} + \\sqrt{x}\n$$')
    assert.match(block, /<mjx-container\b[^>]*tabindex="0"/)
    assert.match(block, /<mjx-container\b[^>]*display="true"/)
    assert.doesNotMatch(block, /data-mjx-error|data-mml-node="merror"/)

    const code = md.render('```text\n$x^2$\n```')
    assert.match(code, /<code\b/)
    assert.doesNotMatch(code, /<mjx-container\b/)
  } finally {
    disposeMdItInstance()
  }
})

test('the installed SRE can still parse MathML and construct a semantic tree', async () => {
  const sre = loadSpeechRuleEngine()
  await sre.engineReady()
  const tree = sre.toSemantic(
    '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>x</mi><mo>+</mo><mn>1</mn></math>'
  )
  assert.ok(tree)
  const xml = String(tree)
  assert.match(xml, /<stree\b/)
  assert.match(xml, />x</)
})

test('KaTeX preview options retain MathML output and reject an unsafe link', () => {
  const options = {
    displayMode: false,
    output: 'htmlAndMathml',
    strict: 'warn',
    throwOnError: false,
    trust: false
  }
  const html = katex.renderToString('x^2 + \\frac{1}{2}', options)
  assert.match(html, /class="katex"/)
  assert.match(html, /<math\b/)

  const rejected = katex.renderToString('\\href{javascript:alert(1)}{x}', options)
  assert.doesNotMatch(rejected, /\bhref\s*=\s*["']\s*javascript:/i)
})
