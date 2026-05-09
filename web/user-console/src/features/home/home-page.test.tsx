import type React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import i18n from '@/i18n/config'
import { useAuthStore, type AuthUser } from '@/stores/auth-store'
import { Home } from './index'

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

vi.mock('@/components/layout', () => ({
  PublicLayout: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('@/components/layout/components/footer', () => ({
  Footer: () => <div>footer</div>,
}))

describe('Home', () => {
  const setAuthUser = (user: AuthUser | null) =>
    useAuthStore.setState((state) => ({
      auth: { ...state.auth, user },
    }))

  beforeEach(async () => {
    await i18n.changeLanguage('en')
    setAuthUser(null)
  })

  afterEach(() => {
    setAuthUser(null)
  })

  it('renders the hosted service narrative for guests', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )

    expect(
      await screen.findByRole('heading', {
        name: /Connect to leading AI models with lower cost and faster rollout\./,
      })
    ).toBeInTheDocument()
    expect(
      screen.getAllByText('Compatible with mainstream model APIs').length
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('heading', {
        name: 'A faster path from evaluation to production',
      })
    ).toBeInTheDocument()
    expect(screen.getByText('Why RightMaaS')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Operate AI access with more control',
      })
    ).toBeInTheDocument()
  })

  it('keeps the bottom CTA focused on console entry and model center', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    )

    expect(
      await screen.findByRole('heading', {
        name: 'Start in the console, then scale with governance.',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Create an API key, explore the console, and send your first request in under 2 minutes.'
      )
    ).toBeInTheDocument()

    expect(screen.getAllByRole('link', { name: 'View Models & Pricing' })).toHaveLength(
      2
    )
    for (const link of screen.getAllByRole('link', { name: 'View Models & Pricing' })) {
      expect(link).toHaveAttribute('href', '/model-center')
    }
    expect(screen.getAllByRole('link', { name: 'Quickstart' })).toHaveLength(2)
    for (const link of screen.getAllByRole('link', { name: 'Quickstart' })) {
      expect(link).toHaveAttribute('href', '/sign-up')
    }
  })
})
