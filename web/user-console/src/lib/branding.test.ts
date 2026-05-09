import { describe, expect, it } from 'vitest'
import {
  DOCS_BASE_URL_PLACEHOLDER,
  normalizeServerAddress,
  replaceBrandNameTokens,
  replaceDocsContentPlaceholders,
  resolveSystemName,
} from './branding'

describe('branding helpers', () => {
  it('replaces RightMaaS with the configured system name', () => {
    expect(replaceBrandNameTokens('Why RightMaaS', 'Acme Gateway')).toBe(
      'Why Acme Gateway'
    )
  })

  it('normalizes server addresses and removes trailing slashes', () => {
    expect(normalizeServerAddress(' https://gateway.example.com/ ')).toBe(
      'https://gateway.example.com'
    )
  })

  it('replaces docs base url placeholders with the configured server address', () => {
    expect(
      replaceDocsContentPlaceholders(
        `curl "${DOCS_BASE_URL_PLACEHOLDER}/v1/models"`,
        {
          serverAddress: 'https://gateway.example.com/',
        }
      )
    ).toBe('curl "https://gateway.example.com/v1/models"')
  })

  it('keeps the placeholder when no server address is available', () => {
    expect(
      replaceDocsContentPlaceholders(
        `curl "${DOCS_BASE_URL_PLACEHOLDER}/v1/models"`
      )
    ).toBe(`curl "${DOCS_BASE_URL_PLACEHOLDER}/v1/models"`)
  })

  it('replaces the legacy docs base url placeholder for backward compatibility', () => {
    expect(
      replaceDocsContentPlaceholders(
        'curl "<righttoken_base_url>/v1/models"',
        {
          serverAddress: 'https://gateway.example.com/',
        }
      )
    ).toBe('curl "https://gateway.example.com/v1/models"')
  })

  it('maps legacy New API branding back to the bundled default', () => {
    expect(resolveSystemName('New API')).toBe('RightMaaS')
  })

  it('maps legacy RightToken branding back to the bundled default', () => {
    expect(resolveSystemName('RightToken')).toBe('RightMaaS')
  })
})
