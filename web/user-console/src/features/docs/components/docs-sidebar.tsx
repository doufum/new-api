import { Link, useRouterState } from '@tanstack/react-router'
import {
  Rocket,
  Wrench,
  Code,
  Coins,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { DocsManifestCategory } from '../hooks/use-docs-manifest'

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  Wrench,
  Code,
  Coins,
  HelpCircle,
}

interface DocsSidebarProps {
  manifest: DocsManifestCategory[]
}

export function DocsSidebar({ manifest }: DocsSidebarProps) {
  const router = useRouterState()
  const currentPath = router.location.pathname

  return (
    <ScrollArea className='h-full'>
      <nav className='flex flex-col gap-6 p-4'>
        {manifest.map((category) => {
          const Icon = iconMap[category.icon]
          return (
            <div key={category.id}>
              <div className='mb-2 flex items-center gap-2'>
                {Icon && (
                  <Icon className='text-muted-foreground size-4' />
                )}
                <span className='text-muted-foreground text-xs font-medium tracking-wider uppercase'>
                  {category.title}
                </span>
              </div>
              <ul className='space-y-0.5'>
                {category.items.map((item) => {
                  const href = `/workspace/docs/${category.id}/${item.slug}`
                  const isActive = currentPath === href
                  return (
                    <li key={item.slug}>
                      <Link
                        to={href}
                        className={cn(
                          'block rounded-md px-3 py-1.5 text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>
    </ScrollArea>
  )
}
