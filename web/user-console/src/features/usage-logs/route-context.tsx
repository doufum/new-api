import { createContext, useContext } from 'react'
import { type NavigateFn } from '@/hooks/use-table-url-state'
import { type UsageLogsSectionId } from './section-registry'
import type {
  UsageLogsSearch,
  UsageLogsSearchInput,
} from './route-schema'

type UsageLogsRouteContextValue = {
  activeSection: UsageLogsSectionId
  search: UsageLogsSearch
  navigateSearch: NavigateFn<UsageLogsSearch>
  goToSection: (
    section: UsageLogsSectionId,
    search?: UsageLogsSearchInput,
    replace?: boolean
  ) => void
}

const UsageLogsRouteContext = createContext<UsageLogsRouteContextValue | null>(
  null
)

type UsageLogsRouteProviderProps = {
  value: UsageLogsRouteContextValue
  children: React.ReactNode
}

export function UsageLogsRouteProvider(props: UsageLogsRouteProviderProps) {
  return (
    <UsageLogsRouteContext.Provider value={props.value}>
      {props.children}
    </UsageLogsRouteContext.Provider>
  )
}

export function useUsageLogsRoute() {
  const context = useContext(UsageLogsRouteContext)

  if (!context) {
    throw new Error('useUsageLogsRoute must be used within UsageLogsRouteProvider')
  }

  return context
}
