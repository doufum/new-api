import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SectionPageLayout } from '@/components/layout'
import { FadeIn } from '@/components/page-transition'
import { AnnouncementsPanel } from '@/features/dashboard/components/overview/announcements-panel'
import { ConsumptionDistributionChart } from '@/features/dashboard/components/models/consumption-distribution-chart'
import { LogStatCards } from '@/features/dashboard/components/models/log-stat-cards'
import { ModelCharts } from '@/features/dashboard/components/models/model-charts'
import {
  buildDefaultDashboardFilters,
  getSavedChartPreferences,
} from '@/features/dashboard/lib'
import type {
  DashboardChartPreferences,
  QuotaDataItem,
} from '@/features/dashboard/types'

export function Console() {
  const { t } = useTranslation()
  const chartPreferences = useMemo<DashboardChartPreferences>(
    () => getSavedChartPreferences(),
    []
  )
  const filters = useMemo(
    () => buildDefaultDashboardFilters(chartPreferences),
    [chartPreferences]
  )
  const [modelData, setModelData] = useState<QuotaDataItem[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  const handleDataUpdate = useCallback((data: QuotaDataItem[], loading: boolean) => {
    setModelData(data)
    setDataLoading(loading)
  }, [])

  return (
    <SectionPageLayout>
      <SectionPageLayout.Title>{t('Overview')}</SectionPageLayout.Title>
      <SectionPageLayout.Description>
        {t('View dashboard overview and statistics')}
      </SectionPageLayout.Description>
      <SectionPageLayout.Content>
        <div className='space-y-3 sm:space-y-4'>
          <FadeIn>
            <LogStatCards filters={filters} onDataUpdate={handleDataUpdate} />
          </FadeIn>

          <FadeIn delay={0.1}>
            <ModelCharts
              data={modelData}
              loading={dataLoading}
              timeGranularity={filters.time_granularity}
              defaultChartTab='trend'
            />
          </FadeIn>

          <div className='grid gap-3 xl:grid-cols-[minmax(0,1.2fr)_320px] xl:items-start'>
            <FadeIn delay={0.15}>
              <ConsumptionDistributionChart
                data={modelData}
                loading={dataLoading}
                timeGranularity={filters.time_granularity}
                defaultChartType={chartPreferences.consumptionDistributionChart}
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnnouncementsPanel />
            </FadeIn>
          </div>
        </div>
      </SectionPageLayout.Content>
    </SectionPageLayout>
  )
}
