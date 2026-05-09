import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DEFAULT_LOGO, DEFAULT_SYSTEM_NAME } from './src/lib/constants'

test('default brand uses RightMaaS in visible defaults', () => {
  const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8')

  assert.equal(DEFAULT_SYSTEM_NAME, 'RightMaaS')
  assert.equal(DEFAULT_LOGO, '/management/rightmaas-icon.svg')
  assert.match(html, /<title>RightMaaS<\/title>/)
  assert.match(html, /<meta name="title" content="RightMaaS"/)
})
