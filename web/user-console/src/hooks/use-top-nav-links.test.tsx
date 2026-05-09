import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routePaths } from '@/lib/route-paths'
import i18n from '@/i18n/config'
import '@/i18n/config'
import { useTopNavLinks } from './use-top-nav-links'

const useLocationMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => useLocationMock(),
}))

describe('useTopNavLinks', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
    useLocationMock.mockReset()
  })

  it('returns the localized docs link and marks docs pages as active', () => {
    useLocationMock.mockReturnValue({
      pathname: '/workspace/docs/getting-started/intro',
    })

    const { result } = renderHook(() => useTopNavLinks())

    expect(result.current).toEqual([
      {
        title: '文档',
        href: `${routePaths.workspace.docs}/getting-started/intro`,
        isActive: true,
      },
      {
        title: '模型中心',
        href: routePaths.modelCenter,
        isActive: false,
      },
    ])
  })
})
