import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { AuthLayout } from './auth-layout'

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
  }),
}))

describe('AuthLayout', () => {
  it('renders RightMaaS as the fallback brand name', () => {
    render(
      <AuthLayout>
        <div>content</div>
      </AuthLayout>
    )

    expect(screen.getByText('RightMaaS')).toBeInTheDocument()
  })
})
