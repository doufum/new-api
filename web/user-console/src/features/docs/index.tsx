import { useEffect, useState } from 'react'
import { AppHeader } from '@/components/layout/components/app-header'
import { Main } from '@/components/layout/components/main'
import { FadeIn } from '@/components/page-transition'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { DocsSidebar } from './components/docs-sidebar'
import { DocsContent } from './components/docs-content'
import { useDocsManifest } from './hooks/use-docs-manifest'

interface DocsPageProps {
  category: string
  slug: string
}

export function DocsPage({ category, slug }: DocsPageProps) {
  const { manifest, loadDoc, getDocTitle } = useDocsManifest()

  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!category || !slug) return
    setLoading(true)
    loadDoc(category, slug).then((md) => {
      setContent(md)
      setLoading(false)
    })
  }, [category, slug, loadDoc])

  const docTitle = getDocTitle(category, slug)

  const sidebarNav = <DocsSidebar manifest={manifest} />

  return (
    <>
      <AppHeader />
      <Main>
        <div className='flex h-full'>
          {/* Desktop sidebar */}
          <aside className='bg-muted/30 hidden w-56 shrink-0 border-r lg:block'>
            {sidebarNav}
          </aside>

          {/* Mobile sidebar */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side='left' className='w-64 p-0'>
              <div onClick={() => setMobileOpen(false)}>
                {sidebarNav}
              </div>
            </SheetContent>
          </Sheet>

          {/* Main content */}
          <div className='min-w-0 flex-1 overflow-auto'>
            <div className='px-4 pt-4 pb-2 sm:px-6 sm:pt-6'>
              <div className='flex items-center gap-3'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='lg:hidden'
                  onClick={() => setMobileOpen(true)}
                >
                  <Menu className='size-5' />
                </Button>
                <h2 className='text-base font-bold tracking-tight sm:text-lg'>
                  {docTitle ?? '文档'}
                </h2>
              </div>
            </div>
            <FadeIn>
              <DocsContent content={content} loading={loading} />
            </FadeIn>
          </div>
        </div>
      </Main>
    </>
  )
}
