import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { AppHeader } from './app-header'

const useTopNavLinksMock = vi.fn()

vi.mock('@/hooks/use-top-nav-links', () => ({
  useTopNavLinks: () => useTopNavLinksMock(),
}))

vi.mock('@/hooks/use-notifications', () => ({
  useNotifications: () => ({
    unreadCount: 0,
    openDialog: vi.fn(),
    dialogOpen: false,
    setDialogOpen: vi.fn(),
    activeTab: 'notifications',
    setActiveTab: vi.fn(),
    notice: [],
    announcements: [],
    loading: false,
    closeToday: vi.fn(),
  }),
}))

vi.mock('@/components/search', () => ({
  Search: () => <div>search</div>,
}))

vi.mock('@/components/notification-button', () => ({
  NotificationButton: () => <button type='button'>notifications</button>,
}))

vi.mock('@/components/notification-dialog', () => ({
  NotificationDialog: () => null,
}))

vi.mock('@/components/language-switcher', () => ({
  LanguageSwitcher: () => <button type='button'>Change language</button>,
}))

vi.mock('@/components/config-drawer', () => ({
  ConfigDrawer: () => <button type='button'>config</button>,
}))

vi.mock('@/components/profile-dropdown', () => ({
  ProfileDropdown: () => <button type='button'>profile</button>,
}))

vi.mock('@/components/layout/components/header', () => ({
  Header: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('@/components/layout/components/top-nav', () => ({
  TopNav: () => <nav data-testid='top-nav'>top nav</nav>,
}))

describe('AppHeader', () => {
  beforeEach(() => {
    useTopNavLinksMock.mockReset()
    useTopNavLinksMock.mockReturnValue([])
  })

  it('does not render the language switcher', () => {
    render(<AppHeader />)

    expect(screen.queryByRole('button', { name: 'Change language' })).toBeNull()
  })

  it('places top nav links in the actions cluster before search when links exist', () => {
    useTopNavLinksMock.mockReturnValue([
      {
        title: 'Docs',
        href: '/workspace/docs/getting-started/intro',
      },
    ])

    render(<AppHeader />)

    const topNav = screen.getByTestId('top-nav')
    const search = screen.getByText('search')

    expect(search.parentElement).toContainElement(topNav)
    expect(
      topNav.compareDocumentPosition(search) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy()
  })
})
