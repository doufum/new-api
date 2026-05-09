import {
  LayoutDashboard,
  Key,
  FileText,
  Wallet,
  User,
  Command,
  FlaskConical,
  ListTodo,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/lib/route-paths'
import { WORKSPACE_IDS } from '@/components/layout/lib/workspace-registry'
import { type SidebarData } from '@/components/layout/types'

export function useSidebarData(): SidebarData {
  const { t } = useTranslation()

  return {
    workspaces: [
      {
        id: WORKSPACE_IDS.DEFAULT,
        name: '', // Dynamically fetches system name
        logo: Command,
        plan: '', // Dynamically fetches system version
      },
    ],
    navGroups: [
      {
        id: 'console',
        title: t('Overview'),
        items: [
          {
            title: t('Overview'),
            url: routePaths.console,
            icon: LayoutDashboard,
          },
          {
            title: t('Playground'),
            url: routePaths.playground,
            icon: FlaskConical,
          },
        ],
      },
      {
        id: 'workspace',
        title: t('Workspace'),
        items: [
          {
            title: t('API Keys'),
            url: routePaths.workspace.keys,
            icon: Key,
          },
          {
            title: t('Usage Logs'),
            url: routePaths.workspace.logs,
            icon: FileText,
          },
          {
            title: t('Task Logs'),
            url: routePaths.workspace.tasks,
            icon: ListTodo,
            activeUrls: [
              routePaths.workspace.tasks,
              `${routePaths.workspace.tasks}/task`,
              `${routePaths.workspace.tasks}/drawing`,
            ],
            configUrls: [
              routePaths.workspace.tasks,
              `${routePaths.workspace.tasks}/task`,
              `${routePaths.workspace.tasks}/drawing`,
            ],
          },
        ],
      },
      {
        id: 'account',
        title: t('Account'),
        items: [
          {
            title: t('Wallet'),
            url: routePaths.account.wallet,
            icon: Wallet,
          },
          {
            title: t('Profile'),
            url: routePaths.account.profile,
            icon: User,
          },
        ],
      },
    ],
  }
}
