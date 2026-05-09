import { describe, expect, it } from 'vitest'
import en from './locales/en.json'

describe('branding translations', () => {
  it('does not expose New API in visible English brand copy', () => {
    expect(en.translation['RightMaaS &lt;noreply@example.com&gt;']).toBe(
      'RightMaaS &lt;noreply@example.com&gt;'
    )
    expect(en.translation['e.g. RightMaaS Console']).toBe(
      'e.g. RightMaaS Console'
    )
    expect(en.translation['Welcome to RightMaaS...']).toBe(
      'Welcome to RightMaaS...'
    )
  })
})
