import type React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import i18n from '@/i18n/config'
import { Hero } from './hero'

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

describe('Hero', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('sends guests to sign-up and model center', async () => {
    render(<Hero isAuthenticated={false} />)

    expect(
      await screen.findByRole('heading', {
        name: /Connect to leading AI models with lower cost and faster rollout\./,
      })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Quickstart' })).toHaveAttribute(
      'href',
      '/sign-up'
    )
    expect(
      screen.getByRole('link', { name: 'View Models & Pricing' })
    ).toHaveAttribute('href', '/model-center')
    expect(
      screen.getByText(
        'Create an account and send your first request in under 2 minutes.'
      )
    ).toBeInTheDocument()
    expect(screen.getAllByText('Lower integration cost').length).toBeGreaterThan(0)
    expect(screen.getByText('Service-backed delivery')).toBeInTheDocument()
    expect(screen.getByText('Faster production rollout')).toBeInTheDocument()
  })

  it('sends signed-in users to console and model center', () => {
    render(<Hero isAuthenticated />)

    expect(screen.getByRole('link', { name: 'Enter Console' })).toHaveAttribute(
      'href',
      '/console'
    )
    expect(
      screen.getByRole('link', { name: 'View Models & Pricing' })
    ).toHaveAttribute('href', '/model-center')
  })
})
