import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { SetupWizard } from './setup-wizard'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    systemName: 'RightMaaS',
    logo: '/righttoken-logo.svg',
    loading: false,
  }),
}))

vi.mock('./api', () => ({
  getSetupStatus: async () => ({
    success: true,
    data: {
      status: false,
      root_init: false,
      database_type: 'sqlite',
    },
  }),
  submitSetup: async () => ({
    success: true,
  }),
  buildSetupPayload: () => ({}),
}))

vi.mock('@/components/language-switcher', () => ({
  LanguageSwitcher: () => <button type='button'>Change language</button>,
}))

describe('SetupWizard', () => {
  it('does not render the language switcher', async () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <SetupWizard />
      </QueryClientProvider>
    )

    expect(
      await screen.findByRole('heading', { name: /初始化\s*RightMaaS/ })
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Change language' })).toBeNull()
  })
})
