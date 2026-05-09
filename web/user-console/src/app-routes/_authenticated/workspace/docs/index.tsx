import { createFileRoute, redirect } from '@tanstack/react-router'
import manifest from '@/content/docs/manifest.json'

const firstCategory = manifest[0]
const firstSlug = firstCategory?.items[0]?.slug

export const Route = createFileRoute('/_authenticated/workspace/docs/')({
  beforeLoad: () => {
    if (firstCategory && firstSlug) {
      throw redirect({
        to: '/workspace/docs/$category/$slug',
        params: { category: firstCategory.id, slug: firstSlug },
      })
    }
  },
})
