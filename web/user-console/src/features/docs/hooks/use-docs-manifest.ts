import { useCallback, useMemo } from 'react'
import manifestData from '@/content/docs/manifest.json'
import apiReferenceAuthentication from '@/content/docs/api-reference/authentication.md?raw'
import apiReferenceOpenAICompatible from '@/content/docs/api-reference/openai-compatible.md?raw'
import faqIndex from '@/content/docs/faq/index.md?raw'
import gettingStartedApiKey from '@/content/docs/getting-started/api-key.md?raw'
import gettingStartedIntro from '@/content/docs/getting-started/intro.md?raw'
import modelsAndBillingBilling from '@/content/docs/models-and-billing/billing.md?raw'
import modelsAndBillingSupportedModels from '@/content/docs/models-and-billing/supported-models.md?raw'
import toolsClaudeCode from '@/content/docs/tools/claude-code.md?raw'
import toolsCodex from '@/content/docs/tools/codex.md?raw'
import toolsOpenClaw from '@/content/docs/tools/openclaw.md?raw'
import toolsOpenCode from '@/content/docs/tools/opencode.md?raw'
import { replaceDocsContentPlaceholders } from '@/lib/branding'
import { useSystemConfigStore } from '@/stores/system-config-store'

export type DocsManifestItem = {
  slug: string
  title: string
}

export type DocsManifestCategory = {
  id: string
  title: string
  icon: string
  items: DocsManifestItem[]
}

export type DocsManifest = DocsManifestCategory[]

const manifest = manifestData as DocsManifest

const docContentByPath = {
  './content/docs/api-reference/authentication.md': apiReferenceAuthentication,
  './content/docs/api-reference/openai-compatible.md':
    apiReferenceOpenAICompatible,
  './content/docs/faq/index.md': faqIndex,
  './content/docs/getting-started/api-key.md': gettingStartedApiKey,
  './content/docs/getting-started/intro.md': gettingStartedIntro,
  './content/docs/models-and-billing/billing.md': modelsAndBillingBilling,
  './content/docs/models-and-billing/supported-models.md':
    modelsAndBillingSupportedModels,
  './content/docs/tools/claude-code.md': toolsClaudeCode,
  './content/docs/tools/codex.md': toolsCodex,
  './content/docs/tools/openclaw.md': toolsOpenClaw,
  './content/docs/tools/opencode.md': toolsOpenCode,
} as const

export function getDocImportPath(category: string, slug: string): string {
  return `./content/docs/${category}/${slug}.md`
}

export function getFirstDocPathFromManifest(
  docsManifest: DocsManifest = manifest
): string {
  const firstCategory = docsManifest[0]
  const firstDoc = firstCategory?.items[0]

  if (!firstCategory || !firstDoc) {
    return '/workspace/docs'
  }

  return `/workspace/docs/${firstCategory.id}/${firstDoc.slug}`
}

export function getDocTitleFromManifest(
  categoryId: string,
  slug: string,
  docsManifest: DocsManifest = manifest
): string | null {
  const category = docsManifest.find((c) => c.id === categoryId)
  if (!category) return null
  const item = category.items.find((i) => i.slug === slug)
  return item?.title ?? null
}

export async function resolveDocRequest(
  category: string,
  slug: string,
  loadDocContent: (content: string) => Promise<string | null> = async (
    content
  ) => content
): Promise<string | null> {
  const path = getDocImportPath(category, slug)
  const content = docContentByPath[path as keyof typeof docContentByPath]
  if (!content) return null
  return loadDocContent(content)
}

export function useDocsManifest() {
  const systemName = useSystemConfigStore((state) => state.config.systemName)
  const serverAddress = useSystemConfigStore(
    (state) => state.config.serverAddress
  )
  const firstDocPath = useMemo(() => getFirstDocPathFromManifest(manifest), [])

  const loadDoc = useCallback(async function loadDoc(
    category: string,
    slug: string
  ): Promise<string | null> {
    return resolveDocRequest(category, slug, async (content) =>
      replaceDocsContentPlaceholders(content, {
        systemName,
        serverAddress,
      })
    )
  }, [serverAddress, systemName])

  const getDocTitle = useCallback(
    (categoryId: string, slug: string) =>
      getDocTitleFromManifest(categoryId, slug, manifest),
    []
  )

  return useMemo(
    () => ({
      manifest,
      firstDocPath,
      loadDoc,
      getDocTitle,
    }),
    [firstDocPath, loadDoc, getDocTitle]
  )
}
