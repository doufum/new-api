import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { routePaths } from '@/lib/route-paths'
import i18n from '@/i18n/config'
import { useSidebarData } from './use-sidebar-data'

describe('useSidebarData', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renames console navigation to overview and removes docs from the sidebar', () => {
    const { result } = renderHook(() => useSidebarData())

    expect(result.current.navGroups.map((group) => group.title)).toEqual([
      'Overview',
      'Workspace',
      'Account',
    ])

    const items = result.current.navGroups.flatMap((group) => group.items)

    expect(items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Overview',
          url: routePaths.console,
        }),
        expect.objectContaining({
          title: 'Playground',
          url: routePaths.playground,
        }),
        expect.objectContaining({
          title: 'API Keys',
          url: routePaths.workspace.keys,
        }),
        expect.objectContaining({
          title: 'Usage Logs',
          url: routePaths.workspace.logs,
        }),
        expect.objectContaining({
          title: 'Task Logs',
          url: routePaths.workspace.tasks,
        }),
        expect.objectContaining({
          title: 'Profile',
          url: routePaths.account.profile,
        }),
        expect.objectContaining({
          title: 'Wallet',
          url: routePaths.account.wallet,
        }),
      ])
    )

    expect(items).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Docs',
        }),
      ])
    )
  })

  it('marks task logs as active for task and drawing subsections', () => {
    const { result } = renderHook(() => useSidebarData())
    const taskLogsItem = result.current.navGroups
      .flatMap((group) => group.items)
      .find((item) => 'url' in item && item.url === routePaths.workspace.tasks)

    expect(taskLogsItem).toEqual(
      expect.objectContaining({
        activeUrls: [
          routePaths.workspace.tasks,
          `${routePaths.workspace.tasks}/task`,
          `${routePaths.workspace.tasks}/drawing`,
        ],
      })
    )
  })
})
