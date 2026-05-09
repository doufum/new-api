import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { DocsPage } from './index'

const loadDoc = vi.fn(async () => '# 新手入门')

vi.mock('@/components/layout/components/app-header', () => ({
  AppHeader: () => <div>header</div>,
}))

vi.mock('@/components/layout/components/main', () => ({
  Main: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/page-transition', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('./components/docs-sidebar', () => ({
  DocsSidebar: () => <div>sidebar</div>,
}))

vi.mock('./components/docs-content', () => ({
  DocsContent: ({
    content,
    loading,
  }: {
    content: string | null
    loading: boolean
  }) => <div>{loading ? 'loading' : content}</div>,
}))

vi.mock('./hooks/use-docs-manifest', () => ({
  useDocsManifest: () => ({
    manifest: [],
    loadDoc,
    getDocTitle: () => '新手入门',
  }),
}))

describe('DocsPage', () => {
  it('loads the requested document once for stable inputs', async () => {
    render(<DocsPage category='getting-started' slug='intro' />)

    await screen.findByText('# 新手入门')

    await waitFor(() => {
      expect(loadDoc).toHaveBeenCalledTimes(1)
    })
  })
})
