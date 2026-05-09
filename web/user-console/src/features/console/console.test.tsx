import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import i18n from '@/i18n/config'
import { Console } from './index'

vi.mock('@/components/layout', () => ({
  SectionPageLayout: Object.assign(
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    {
      Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
      Description: ({ children }: { children: React.ReactNode }) => (
        <p>{children}</p>
      ),
      Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    }
  ),
}))

vi.mock('@/components/page-transition', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

vi.mock('./components/console-hero', () => ({
  ConsoleHero: () => <div>User Workspace Hero</div>,
}))

vi.mock('./components/console-summary-grid', () => ({
  ConsoleSummaryGrid: () => <div>Legacy Summary Cards</div>,
}))

vi.mock('./components/console-action-deck', () => ({
  ConsoleActionDeck: () => <div>Legacy Action Deck</div>,
}))

vi.mock('./components/console-support-column', () => ({
  ConsoleSupportColumn: () => <div>Legacy Support Column</div>,
}))

vi.mock('./components/console-secondary-panels', () => ({
  ConsoleSecondaryPanels: () => (
    <div>
      <div>API Info Panel</div>
      <div>FAQ Panel</div>
      <div>Uptime Panel</div>
    </div>
  ),
}))

vi.mock('./hooks/use-console-support-data', () => ({
  useConsoleSupportData: () => ({
    apiRouteCount: 2,
    apiLoading: false,
    monitorCount: 3,
    healthyMonitorCount: 2,
    uptimeLoading: false,
  }),
}))

vi.mock('@/features/dashboard/lib', () => ({
  getSavedChartPreferences: () => ({
    consumptionDistributionChart: 'bar',
    modelAnalyticsChart: 'trend',
    defaultTimeRangeDays: 1,
    defaultTimeGranularity: 'hour',
  }),
  buildDefaultDashboardFilters: () => ({
    start_timestamp: new Date('2026-05-07T00:00:00.000Z'),
    end_timestamp: new Date('2026-05-08T00:00:00.000Z'),
    time_granularity: 'hour',
  }),
}))

vi.mock('@/features/dashboard/components/models/log-stat-cards', () => ({
  LogStatCards: () => (
    <div>
      <div>Request Count Card</div>
      <div>Total Tokens Card</div>
      <div>Average RPM Card</div>
      <div>Average TPM Card</div>
    </div>
  ),
}))

vi.mock('@/features/dashboard/components/models/model-charts', () => ({
  ModelCharts: () => <div>Call Trend Chart</div>,
}))

vi.mock(
  '@/features/dashboard/components/models/consumption-distribution-chart',
  () => ({
    ConsumptionDistributionChart: () => <div>Quota Distribution Chart</div>,
  })
)

vi.mock('@/features/dashboard/components/overview/announcements-panel', () => ({
  AnnouncementsPanel: () => <div>Announcements Panel</div>,
}))

describe('Console', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('zh')
  })

  it('renders the overview analytics layout and removes legacy support panels', () => {
    render(<Console />)

    expect(screen.getByRole('heading', { name: '概览' })).toBeInTheDocument()
    expect(screen.queryByText('用户工作台')).not.toBeInTheDocument()
    expect(screen.queryByText('控制台总览')).not.toBeInTheDocument()

    expect(screen.getByText('Request Count Card')).toBeInTheDocument()
    expect(screen.getByText('Total Tokens Card')).toBeInTheDocument()
    expect(screen.getByText('Average RPM Card')).toBeInTheDocument()
    expect(screen.getByText('Average TPM Card')).toBeInTheDocument()
    expect(screen.getByText('Call Trend Chart')).toBeInTheDocument()
    expect(screen.getByText('Quota Distribution Chart')).toBeInTheDocument()
    expect(screen.getByText('Announcements Panel')).toBeInTheDocument()

    expect(screen.queryByText('API Info Panel')).not.toBeInTheDocument()
    expect(screen.queryByText('FAQ Panel')).not.toBeInTheDocument()
    expect(screen.queryByText('Uptime Panel')).not.toBeInTheDocument()
    expect(screen.queryByText('Legacy Summary Cards')).not.toBeInTheDocument()
  })
})
