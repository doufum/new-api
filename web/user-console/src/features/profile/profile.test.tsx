import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { Profile } from './index'

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: (selector?: (state: { auth: { user: { permissions: Record<string, boolean> } } }) => unknown) => {
    const state = {
      auth: {
        user: {
          permissions: {
            sidebar_settings: true,
          },
        },
      },
    }
    return typeof selector === 'function' ? selector(state) : state
  },
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({
    status: {
      checkin_enabled: false,
      turnstile_check: false,
      turnstile_site_key: '',
    },
  }),
}))

vi.mock('@/components/layout', () => ({
  AppHeader: () => <div>header</div>,
  Main: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/page-transition', () => ({
  CardStaggerContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CardStaggerItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('./hooks', () => ({
  useProfile: () => ({
    profile: null,
    loading: false,
    refreshProfile: vi.fn(),
  }),
}))

vi.mock('./components/profile-header', () => ({
  ProfileHeader: () => <div>profile header</div>,
}))

vi.mock('./components/profile-settings-card', () => ({
  ProfileSettingsCard: () => <div>profile settings</div>,
}))

vi.mock('./components/language-preferences-card', () => ({
  LanguagePreferencesCard: () => <div>Interface Language</div>,
}))

vi.mock('./components/profile-security-card', () => ({
  ProfileSecurityCard: () => <div>profile security</div>,
}))

vi.mock('./components/sidebar-modules-card', () => ({
  SidebarModulesCard: () => <div>sidebar modules</div>,
}))

vi.mock('./components/passkey-card', () => ({
  PasskeyCard: () => <div>passkey</div>,
}))

vi.mock('./components/two-fa-card', () => ({
  TwoFACard: () => <div>two fa</div>,
}))

vi.mock('./components/checkin-calendar-card', () => ({
  CheckinCalendarCard: () => <div>checkin</div>,
}))

describe('Profile', () => {
  it('does not render the language preferences card', () => {
    render(<Profile />)

    expect(screen.queryByText('Interface Language')).toBeNull()
  })
})
