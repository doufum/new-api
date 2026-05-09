import { createFileRoute } from '@tanstack/react-router'
import { DocsPage } from '@/features/docs'

export const Route = createFileRoute(
  '/_authenticated/workspace/docs/$category/$slug'
)({
  component: WorkspaceDocsPage,
})

function WorkspaceDocsPage() {
  const { category, slug } = Route.useParams()
  return <DocsPage category={category} slug={slug} />
}
