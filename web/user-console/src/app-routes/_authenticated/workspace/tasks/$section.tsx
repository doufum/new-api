import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { routePaths } from '@/lib/route-paths'
import { UsageLogs } from '@/features/usage-logs'
import {
  isUsageLogsSectionId,
  type UsageLogsSectionId,
} from '@/features/usage-logs/section-registry'
import { UsageLogsRouteProvider } from '@/features/usage-logs/route-context'
import {
  type UsageLogsSearchInput,
  usageLogsSearchSchema,
} from '@/features/usage-logs/route-schema'

export const Route = createFileRoute('/_authenticated/workspace/tasks/$section')({
  validateSearch: usageLogsSearchSchema,
  beforeLoad: ({ params }) => {
    if (!isUsageLogsSectionId(params.section) || params.section === 'common') {
      throw redirect({
        to: '/workspace/tasks/$section',
        params: { section: 'task' },
      })
    }
  },
  component: WorkspaceTaskLogsPage,
})

function WorkspaceTaskLogsPage() {
  const navigate = useNavigate()
  const params = Route.useParams()
  const activeSection =
    params.section === 'drawing' || params.section === 'task'
      ? params.section
      : 'task'

  const goToSection = (
    section: UsageLogsSectionId,
    search?: UsageLogsSearchInput,
    replace?: boolean
  ) => {
    if (section === 'common') {
      void navigate({
        to: routePaths.workspace.logs,
        search,
        replace,
      })
      return
    }

    void navigate({
      to: '/workspace/tasks/$section',
      params: { section },
      search,
      replace,
    })
  }

  return (
    <UsageLogsRouteProvider
      value={{
        activeSection,
        search: Route.useSearch(),
        navigateSearch: Route.useNavigate(),
        goToSection,
      }}
    >
      <UsageLogs />
    </UsageLogsRouteProvider>
  )
}
