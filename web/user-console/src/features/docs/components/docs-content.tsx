import { Markdown } from '@/components/ui/markdown'
import { Skeleton } from '@/components/ui/skeleton'

interface DocsContentProps {
  content: string | null
  loading: boolean
}

export function DocsContent({ content, loading }: DocsContentProps) {
  if (loading) {
    return (
      <div className='space-y-4 p-6'>
        <Skeleton className='h-8 w-1/3' />
        <Skeleton className='h-4 w-2/3' />
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-32 w-full' />
      </div>
    )
  }

  if (content === null) {
    return (
      <div className='flex items-center justify-center p-12'>
        <p className='text-muted-foreground'>文档未找到</p>
      </div>
    )
  }

  return (
    <div className='max-w-3xl p-6'>
      <Markdown>{content}</Markdown>
    </div>
  )
}
