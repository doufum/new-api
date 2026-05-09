import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PublicLayout } from '@/components/layout'
import { PageTransition } from '@/components/page-transition'
import {
  LoadingSkeleton,
  EmptyState,
  SearchBar,
  PricingTable,
  PricingSidebar,
  PricingToolbar,
  ModelCardGrid,
  ModelDetailsDrawer,
} from './components'
import { EXCLUDED_GROUPS, VIEW_MODES } from './constants'
import { useFilters } from './hooks/use-filters'
import { usePricingData } from './hooks/use-pricing-data'

export function Pricing() {
  const { t } = useTranslation()
  const [selectedModelName, setSelectedModelName] = useState<string | null>(null)

  const {
    models,
    vendors,
    groupRatio,
    usableGroup,
    endpointMap,
    autoGroups,
    isLoading,
    priceRate,
    usdExchangeRate,
  } = usePricingData()

  const {
    searchInput,
    sortBy,
    vendorFilter,
    groupFilter,
    quotaTypeFilter,
    endpointTypeFilter,
    tagFilter,
    tokenUnit,
    viewMode,
    showRechargePrice,
    setSearchInput,
    setSortBy,
    setVendorFilter,
    setGroupFilter,
    setQuotaTypeFilter,
    setEndpointTypeFilter,
    setTagFilter,
    setTokenUnit,
    setViewMode,
    setShowRechargePrice,
    filteredModels,
    hasActiveFilters,
    activeFilterCount,
    availableTags,
    clearFilters,
    clearSearch,
  } = useFilters(models || [])

  const handleModelClick = useCallback(
    (modelName: string) => {
      setSelectedModelName(modelName)
    },
    []
  )

  const selectedModel = useMemo(
    () =>
      selectedModelName
        ? (models || []).find((model) => model.model_name === selectedModelName) ||
          null
        : null,
    [models, selectedModelName]
  )

  const availableGroups = useMemo(
    () =>
      Object.keys(usableGroup || {}).filter(
        (g) => !EXCLUDED_GROUPS.includes(g)
      ),
    [usableGroup]
  )

  const handleClearAll = useCallback(() => {
    clearFilters()
    clearSearch()
  }, [clearFilters, clearSearch])

  const renderPricingContent = () => {
    if (filteredModels.length === 0) {
      return (
        <EmptyState
          searchQuery={searchInput}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={handleClearAll}
        />
      )
    }

    if (viewMode === VIEW_MODES.CARD) {
      return (
        <ModelCardGrid
          models={filteredModels}
          onModelClick={handleModelClick}
          priceRate={priceRate}
          usdExchangeRate={usdExchangeRate}
          tokenUnit={tokenUnit}
          showRechargePrice={showRechargePrice}
        />
      )
    }

    return (
      <PricingTable
        models={filteredModels}
        priceRate={priceRate}
        usdExchangeRate={usdExchangeRate}
        tokenUnit={tokenUnit}
        showRechargePrice={showRechargePrice}
        onModelClick={handleModelClick}
      />
    )
  }

  if (isLoading) {
    return (
      <PublicLayout showMainContainer={false}>
        <div className='mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <LoadingSkeleton viewMode={viewMode} />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false}>
      <div className='relative'>
        <div
          aria-hidden
          className='pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-20 dark:opacity-[0.10]'
          style={{
            background: [
              'radial-gradient(ellipse 58% 48% at 18% 18%, oklch(0.84 0.09 75 / 82%) 0%, transparent 72%)',
              'radial-gradient(ellipse 48% 40% at 82% 15%, oklch(0.82 0.09 230 / 70%) 0%, transparent 70%)',
              'radial-gradient(ellipse 36% 32% at 54% 72%, oklch(0.91 0.03 240 / 45%) 0%, transparent 75%)',
            ].join(', '),
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        />
        <PageTransition className='relative mx-auto w-full max-w-[1800px] px-3 pt-16 pb-8 sm:px-6 sm:pt-20 sm:pb-10 xl:px-8'>
          <header className='mb-6 pt-4 sm:mb-8 sm:pt-6'>
            <section className='relative overflow-hidden rounded-[28px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,248,240,0.95)_0%,rgba(255,255,255,0.96)_44%,rgba(240,247,255,0.98)_100%)] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-7'>
              <div className='pointer-events-none absolute top-[-12%] left-[-4%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.16),transparent_70%)]' />
              <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-[32%] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.15),transparent_64%)] lg:block' />

              <div className='relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end'>
                <div className='space-y-4'>
                  <span className='inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.22em] uppercase text-slate-600'>
                    {t('Models Directory')}
                  </span>

                  <div className='space-y-2'>
                    <h1 className='text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] font-semibold tracking-[-0.05em] text-slate-950'>
                      {t('Model Center')}
                    </h1>
                    <p className='max-w-3xl text-sm leading-7 text-slate-700 sm:text-base'>
                      {t(
                        'Browse the models currently enabled on this site, compare pricing and capabilities, and narrow down the right option for each task.'
                      )}
                    </p>
                  </div>

                  <div className='flex flex-wrap items-center gap-3'>
                    <span className='inline-flex items-center rounded-full border border-slate-200/80 bg-white/85 px-3 py-1.5 text-sm font-medium text-slate-700'>
                      {t('This site currently has {{count}} models enabled', {
                        count: models?.length || 0,
                      })}
                    </span>
                  </div>

                  <SearchBar
                    value={searchInput}
                    onChange={setSearchInput}
                    onClear={clearSearch}
                    placeholder={t('Search model name, provider, endpoint, or tag...')}
                    className='max-w-2xl'
                  />
                </div>

                <div className='rounded-[24px] bg-slate-950 p-4 text-white shadow-[0_20px_50px_rgba(15,23,42,0.22)] lg:justify-self-end lg:w-full'>
                  <p className='text-xs font-semibold tracking-[0.24em] uppercase text-white/60'>
                    {t('Available Models')}
                  </p>
                  <p className='mt-3 text-3xl font-semibold'>
                    {models?.length || 0}
                  </p>
                  <p className='mt-2 text-sm leading-6 text-white/70'>
                    {t('This site currently has {{count}} models enabled', {
                      count: models?.length || 0,
                    })}
                  </p>
                </div>
              </div>
            </section>
          </header>

          <div className='grid gap-4 xl:grid-cols-[330px_minmax(0,1fr)] 2xl:grid-cols-[330px_minmax(0,1fr)]'>
            <PricingSidebar
              quotaTypeFilter={quotaTypeFilter}
              endpointTypeFilter={endpointTypeFilter}
              vendorFilter={vendorFilter}
              groupFilter={groupFilter}
              tagFilter={tagFilter}
              onQuotaTypeChange={setQuotaTypeFilter}
              onEndpointTypeChange={setEndpointTypeFilter}
              onVendorChange={setVendorFilter}
              onGroupChange={setGroupFilter}
              onTagChange={setTagFilter}
              vendors={vendors || []}
              groups={availableGroups}
              groupRatios={groupRatio}
              tags={availableTags}
              models={models || []}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              className='sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto xl:block'
            />

            <main className='min-w-0 space-y-4'>
              <PricingToolbar
                filteredCount={filteredModels.length}
                totalCount={models?.length}
                sortBy={sortBy}
                onSortChange={setSortBy}
                tokenUnit={tokenUnit}
                onTokenUnitChange={setTokenUnit}
                showRechargePrice={showRechargePrice}
                onRechargePriceChange={setShowRechargePrice}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                quotaTypeFilter={quotaTypeFilter}
                endpointTypeFilter={endpointTypeFilter}
                vendorFilter={vendorFilter}
                groupFilter={groupFilter}
                tagFilter={tagFilter}
                onQuotaTypeChange={setQuotaTypeFilter}
                onEndpointTypeChange={setEndpointTypeFilter}
                onVendorChange={setVendorFilter}
                onGroupChange={setGroupFilter}
                onTagChange={setTagFilter}
                vendors={vendors || []}
                groups={availableGroups}
                groupRatios={groupRatio}
                tags={availableTags}
                models={models || []}
                hasActiveFilters={hasActiveFilters}
                activeFilterCount={activeFilterCount}
                onClearFilters={clearFilters}
              />

              {renderPricingContent()}
            </main>
          </div>

          {selectedModel && (
            <ModelDetailsDrawer
              open={Boolean(selectedModel)}
              onOpenChange={(open) => {
                if (!open) setSelectedModelName(null)
              }}
              model={selectedModel}
              groupRatio={groupRatio || {}}
              usableGroup={usableGroup || {}}
              endpointMap={
                (endpointMap as Record<
                  string,
                  { path?: string; method?: string }
                >) || {}
              }
              autoGroups={autoGroups || []}
              priceRate={priceRate ?? 1}
              usdExchangeRate={usdExchangeRate ?? 1}
              tokenUnit={tokenUnit}
              showRechargePrice={showRechargePrice}
            />
          )}
        </PageTransition>
      </div>
    </PublicLayout>
  )
}
