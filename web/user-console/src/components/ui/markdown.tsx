import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownProps {
  children: string
  className?: string
}

function isExternalHref(href?: string) {
  if (!href) return false

  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:')
  )
}

const markdownComponents: Components = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn('mt-8 scroll-m-20 text-3xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn('mt-8 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn('mt-6 scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn('mt-5 scroll-m-20 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn('mt-4 text-sm leading-7 text-foreground/90', className)} {...props} />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn('font-semibold text-foreground', className)} {...props} />
  ),
  em: ({ className, ...props }) => (
    <em className={cn('italic text-foreground/90', className)} {...props} />
  ),
  a: ({ className, href, rel, target, ...props }) => {
    const isExternal = isExternalHref(href)

    return (
      <a
        {...props}
        href={href}
        className={cn(
          'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
          className
        )}
        target={isExternal ? '_blank' : target}
        rel={isExternal ? 'noopener noreferrer' : rel}
      />
    )
  },
  ul: ({ className, ...props }) => (
    <ul className={cn('my-4 ml-6 list-disc space-y-2 text-sm leading-7', className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn('my-4 ml-6 list-decimal space-y-2 text-sm leading-7', className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn('pl-1 marker:text-muted-foreground', className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        'border-l-4 border-primary/40 bg-muted/40 px-4 py-3 text-sm italic text-foreground/80',
        className
      )}
      {...props}
    />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn('my-8 border-border', className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        'my-4 overflow-x-auto rounded-xl border bg-muted px-4 py-3 text-sm leading-6',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const text = Array.isArray(children)
      ? children.join('')
      : String(children ?? '')
    const isBlock = className?.includes('language-') || text.includes('\n')

    return (
      <code
        className={cn(
          isBlock
            ? 'block min-w-max font-mono text-[13px]'
            : 'rounded-md bg-muted px-1.5 py-0.5 font-mono text-[13px]',
          className
        )}
        {...props}
      >
        {children}
      </code>
    )
  },
  table: ({ className, ...props }) => (
    <div className='my-6 overflow-x-auto rounded-xl border'>
      <table className={cn('min-w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn('bg-muted/60', className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        'border-b border-border px-4 py-2.5 text-left font-semibold text-foreground',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn('border-t border-border px-4 py-2.5 align-top text-foreground/85', className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }) => (
    <img
      alt={alt ?? ''}
      className={cn('my-6 rounded-xl border shadow-sm', className)}
      {...props}
    />
  ),
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div
      className={cn(
        'max-w-none text-sm text-foreground',
        '[&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        '[overflow-wrap:anywhere] break-words',
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
