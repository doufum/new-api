import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { Footer } from './footer'

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode
    to: string
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    systemName: '',
    logo: '',
    footerHtml: '',
    demoSiteEnabled: false,
  }),
}))

describe('Footer', () => {
  it('shows RightMaaS as the fallback display name', () => {
    render(<Footer />)

    expect(screen.getAllByText('RightMaaS').length).toBeGreaterThan(0)
  })
})
