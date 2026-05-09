import { useLocation } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/lib/route-paths'

export type TopNavLink = {
  title: string
  href: string
  isActive?: boolean
  disabled?: boolean
  external?: boolean
}
export function useTopNavLinks(): TopNavLink[] {
  const { t } = useTranslation()
  const docsHref = `${routePaths.workspace.docs}/getting-started/intro`
  const { pathname } = useLocation()

  return [
    {
      title: t('Docs'),
      href: docsHref,
      isActive: pathname.startsWith(routePaths.workspace.docs),
    },
    {
      title: t('Model Center'),
      href: routePaths.modelCenter,
      isActive: pathname.startsWith(routePaths.modelCenter),
    },
  ]
}
