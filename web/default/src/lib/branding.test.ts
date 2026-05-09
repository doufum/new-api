import { describe, expect, it } from 'vitest'
import { replaceBrandNameTokens, resolveSystemName } from './branding'

describe('branding helpers', () => {
  it('replaces RightMaaS with the configured system name', () => {
    expect(replaceBrandNameTokens('Why RightMaaS', 'Acme Gateway')).toBe(
      'Why Acme Gateway'
    )
  })

  it('maps legacy bundled brand names back to the current default', () => {
    expect(resolveSystemName('New API')).toBe('RightMaaS')
    expect(resolveSystemName('RightToken')).toBe('RightMaaS')
  })
})
