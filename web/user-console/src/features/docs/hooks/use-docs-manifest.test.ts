import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useSystemConfigStore } from '@/stores/system-config-store'
import {
  getDocImportPath,
  getDocTitleFromManifest,
  getFirstDocPathFromManifest,
  resolveDocRequest,
  useDocsManifest,
} from './use-docs-manifest'

describe('use-docs-manifest helpers', () => {
  it('returns the first document route from manifest', () => {
    expect(getFirstDocPathFromManifest()).toBe(
      '/workspace/docs/getting-started/intro'
    )
  })

  it('resolves the doc title from manifest', () => {
    expect(getDocTitleFromManifest('getting-started', 'intro')).toBe(
      '新手入门'
    )
  })

  it('builds the markdown import path for a docs route', () => {
    expect(getDocImportPath('getting-started', 'intro')).toBe(
      './content/docs/getting-started/intro.md'
    )
  })

  it('returns null when the requested doc is not present', async () => {
    const result = await resolveDocRequest(
      'missing-category',
      'missing-slug',
      () => Promise.reject(new Error('should not load'))
    )

    expect(result).toBeNull()
  })

  it('returns the matching markdown content when the doc exists', async () => {
    const result = await resolveDocRequest(
      'getting-started',
      'intro',
      async (content) => content
    )

    expect(result).toContain('# 新手入门')
  })

  it('replaces branded doc placeholders with the configured values', async () => {
    useSystemConfigStore.setState((state) => ({
      ...state,
      config: {
        ...state.config,
        systemName: 'Acme Gateway',
        serverAddress: 'https://gateway.example.com/',
      },
    }))

    const { result } = renderHook(() => useDocsManifest())
    const content = await result.current.loadDoc('getting-started', 'intro')

    expect(content).toContain('https://gateway.example.com/v1/chat/completions')
    expect(content).not.toContain('<rightmaas_base_url>')
  })

  it('keeps document helpers referentially stable across rerenders', () => {
    const { result, rerender } = renderHook(() => useDocsManifest())

    const initialLoadDoc = result.current.loadDoc
    const initialGetDocTitle = result.current.getDocTitle

    rerender()

    expect(result.current.loadDoc).toBe(initialLoadDoc)
    expect(result.current.getDocTitle).toBe(initialGetDocTitle)
  })
})
