import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeManagementBrandUrl } from './src/lib/brand-assets'

test('default 管理端品牌资源路径会映射到 /management', () => {
  assert.equal(
    normalizeManagementBrandUrl('/rightmaas-icon.svg'),
    '/management/rightmaas-icon.svg'
  )
  assert.equal(
    normalizeManagementBrandUrl('/logo.png'),
    '/management/logo.png'
  )
  assert.equal(
    normalizeManagementBrandUrl('/management/rightmaas-icon.svg'),
    '/management/rightmaas-icon.svg'
  )
  assert.equal(
    normalizeManagementBrandUrl('https://example.com/logo.png'),
    'https://example.com/logo.png'
  )
  assert.equal(
    normalizeManagementBrandUrl('/uploads/logo.png'),
    '/uploads/logo.png'
  )
})
