import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { xmldom, xmldomVersion } from './dependencies.mjs'

const { DOMImplementation, DOMParser, XMLSerializer } = xmldom
const implementation = new DOMImplementation()
const serializer = new XMLSerializer()
const mathNamespace = 'http://www.w3.org/1998/Math/MathML'
const terminators = [
  ['LF', '\n'],
  ['CR', '\r'],
  ['LS', '\u2028'],
  ['PS', '\u2029']
]
const document = () => implementation.createDocument('urn:regression', 'root', null)
const strictSerialize = node => serializer.serializeToString(node, { requireWellFormed: true })

// This checks the real transitive copy, not a test-only root dependency.
test('the MathJax/SRE dependency and lockfile use the reviewed xmldom override', () => {
  const manifest = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'))
  const override = manifest.pnpm.overrides['@xmldom/xmldom']
  assert.equal(xmldomVersion, override)
  const [major, minor, patch] = xmldomVersion.split('.').map(Number)
  assert.equal(major, 0)
  assert.equal(minor, 9, 'review compatibility before changing the xmldom minor version')
  assert.ok(Number.isInteger(patch) && patch >= 12, 'xmldom must include the 0.9.12 security fixes')

  const lock = readFileSync(new URL('../../pnpm-lock.yaml', import.meta.url), 'utf8')
  const records = [...lock.matchAll(/^  '@xmldom\/xmldom@([^']+)':/gm)]
  assert.equal(records.length, 2, 'expect one package record and one snapshot, without older copies')
  assert.deepEqual(records.map(match => match[1]), [override, override])
  assert.doesNotMatch(lock, /^\s+['"]?xmldom(?:@|['"]?:)/m, 'do not reintroduce the abandoned unscoped package')
})

// GHSA-3px3-54cx-rmw9: all four creation entry points and all ECMAScript
// line terminators. Keep the payload inert; no script or external resource.
const createNamedNodes = {
  createElementNS: (doc, name) => doc.createElementNS('urn:regression', name),
  createAttributeNS: (doc, name) => doc.createAttributeNS('urn:regression', name),
  createDocumentType: (_doc, name) => implementation.createDocumentType(name, '', ''),
  createAttribute: (doc, name) => doc.createAttribute(name)
}
for (const [api, create] of Object.entries(createNamedNodes)) {
  for (const [label, terminator] of terminators) {
    test(`${api} rejects a name containing ${label}`, () => {
      assert.throws(() => create(document(), `valid${terminator}><injected/>`), {
        name: 'InvalidCharacterError'
      })
    })
  }
}

test('valid MathML names, namespaces and escaped text still round-trip', () => {
  const doc = implementation.createDocument(mathNamespace, 'math', null)
  const symbol = doc.createElementNS(mathNamespace, 'mi')
  const attr = doc.createAttributeNS('urn:example', 'example:label')
  attr.value = 'x < y & z'
  symbol.setAttributeNodeNS(attr)
  symbol.appendChild(doc.createTextNode('x < y & z'))
  doc.documentElement.appendChild(symbol)

  const xml = strictSerialize(doc)
  assert.match(xml, /&lt;/)
  assert.match(xml, /&amp;/)
  const parsed = new DOMParser().parseFromString(xml, 'application/xml')
  const parsedSymbol = parsed.getElementsByTagNameNS(mathNamespace, 'mi').item(0)
  assert.ok(parsedSymbol)
  assert.equal(parsedSymbol.textContent, 'x < y & z')
  assert.equal(parsedSymbol.getAttributeNS('urn:example', 'label'), 'x < y & z')
})

// Element-name checks were added in 0.9.11 and their line-anchor bypass was
// corrected in 0.9.12 (GHSA-jxjr-3g7g-3944). Non-NS createElement remains
// permissive; requireWellFormed is deliberately explicit in these tests.
for (const [label, terminator] of terminators) {
  test(`strict serialization rejects an element name containing ${label}`, () => {
    const doc = document()
    doc.documentElement.appendChild(doc.createElement(`valid${terminator}><injected/>`))
    assert.throws(() => strictSerialize(doc), { name: 'InvalidStateError' })
  })
}

// GHSA-vr34-hp96-76pp: xmldom stores these identifiers as quoted literals.
for (const field of ['publicId', 'systemId']) {
  for (const [label, terminator] of terminators) {
    test(`strict serialization rejects a ${field} line-anchor bypass with ${label}`, () => {
      const type = implementation.createDocumentType('root', '', '')
      type[field] = `"valid"${terminator}><injected/>`
      const doc = implementation.createDocument(null, 'root', type)
      assert.throws(() => strictSerialize(doc), { name: 'InvalidStateError' })
    })
  }
}

// GHSA-27p8-2357-5qqv: DOM nodes can be mutated after valid construction.
test('strict serialization rejects a malformed DocumentType name', () => {
  const type = implementation.createDocumentType('root', '', '')
  type.name = 'root><injected/>'
  const doc = implementation.createDocument(null, 'root', type)
  assert.throws(() => strictSerialize(doc), { name: 'InvalidStateError' })
})

// GHSA-c7q8-3ch8-vqpv. Do not change production prototypes or pretend the
// default serializer enables these checks automatically.
for (const target of ['bad>target', 'bad?target', 'bad target', 'XML']) {
  test(`strict serialization rejects the processing-instruction target ${JSON.stringify(target)}`, () => {
    const doc = document()
    doc.documentElement.appendChild(doc.createProcessingInstruction(target, 'data'))
    assert.throws(() => strictSerialize(doc), { name: 'InvalidStateError' })
  })
}

// GHSA-6gmq-8vp8-gcm6.
test('entity-reference creation rejects a malformed name', () => {
  assert.throws(() => document().createEntityReference('bad><injected/>'), {
    name: 'InvalidCharacterError'
  })
})

// A historical serializer regression, already fixed before this upgrade.
test('strict serialization rejects a mutated CDATA section containing its terminator', () => {
  const doc = document()
  const cdata = doc.createCDATASection('safe')
  cdata.data = 'safe]]><injected/>'
  doc.documentElement.appendChild(cdata)
  assert.throws(() => strictSerialize(doc), { name: 'InvalidStateError' })
})
