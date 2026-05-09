import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { Pricing } from './index'

vi.mock('@/components/layout', () => ({
  PublicLayout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('@/components/page-transition', () => ({
  PageTransition: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <div className={className}>{children}</div>,
}))

vi.mock('./components', () => ({
  LoadingSkeleton: () => <div>loading skeleton</div>,
  EmptyState: () => <div>empty state</div>,
  SearchBar: ({
    placeholder,
    className,
  }: {
    placeholder?: string
    className?: string
  }) => <input className={className} placeholder={placeholder} />,
  PricingTable: () => <div>pricing table</div>,
  PricingSidebar: () => <div>pricing sidebar</div>,
  PricingToolbar: () => <div>pricing toolbar</div>,
  ModelCardGrid: () => <div>model card grid</div>,
  ModelDetailsDrawer: () => <div>model details drawer</div>,
}))

vi.mock('./hooks/use-pricing-data', () => ({
  usePricingData: () => ({
    models: [{ model_name: 'gpt-4o' }],
    vendors: [],
    groupRatio: {},
    usableGroup: { default: 1 },
    endpointMap: {},
    autoGroups: [],
    isLoading: false,
    priceRate: 1,
    usdExchangeRate: 1,
  }),
}))

vi.mock('./hooks/use-filters', () => ({
  useFilters: (models: Array<{ model_name: string }>) => ({
    searchInput: '',
    sortBy: 'default',
    vendorFilter: 'all',
    groupFilter: 'all',
    quotaTypeFilter: 'all',
    endpointTypeFilter: 'all',
    tagFilter: 'all',
    tokenUnit: 'M',
    viewMode: 'card',
    showRechargePrice: false,
    setSearchInput: vi.fn(),
    setSortBy: vi.fn(),
    setVendorFilter: vi.fn(),
    setGroupFilter: vi.fn(),
    setQuotaTypeFilter: vi.fn(),
    setEndpointTypeFilter: vi.fn(),
    setTagFilter: vi.fn(),
    setTokenUnit: vi.fn(),
    setViewMode: vi.fn(),
    setShowRechargePrice: vi.fn(),
    filteredModels: models,
    hasActiveFilters: false,
    activeFilterCount: 0,
    availableTags: [],
    clearFilters: vi.fn(),
    clearSearch: vi.fn(),
  }),
}))

describe('Pricing', () => {
  it('renders the model center hero instead of the old model square title', () => {
    render(<Pricing />)

    expect(screen.getByRole('heading', { name: '模型中心' })).toBeInTheDocument()
    expect(
      screen.getByText(
        '集中查看本站当前启用的模型，比较价格与能力信息，并快速筛选适合当前任务的选择。'
      )
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: '模型广场' })).not.toBeInTheDocument()
  })
})
