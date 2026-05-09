export const BUILTIN_SYSTEM_NAME = 'RightMaaS'
export const LEGACY_SYSTEM_NAME = 'New API'
export const LEGACY_BRAND_NAME = 'RightToken'
export const DOCS_BASE_URL_PLACEHOLDER = '<rightmaas_base_url>'
export const LEGACY_DOCS_BASE_URL_PLACEHOLDER = '<righttoken_base_url>'

export function resolveSystemName(value: unknown): string {
  if (typeof value !== 'string') return BUILTIN_SYSTEM_NAME
  const trimmed = value.trim()
  if (
    trimmed === '' ||
    trimmed === LEGACY_SYSTEM_NAME ||
    trimmed === LEGACY_BRAND_NAME
  ) {
    return BUILTIN_SYSTEM_NAME
  }
  return trimmed
}

export function normalizeServerAddress(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().replace(/\/+$/, '')
  return trimmed === '' ? undefined : trimmed
}

export function replaceBrandNameTokens(
  value: string,
  systemName: string = BUILTIN_SYSTEM_NAME
): string {
  const resolvedName = resolveSystemName(systemName)
  if (
    !value.includes(BUILTIN_SYSTEM_NAME) &&
    !value.includes(LEGACY_BRAND_NAME)
  ) {
    return value
  }
  return value
    .split(BUILTIN_SYSTEM_NAME)
    .join(resolvedName)
    .split(LEGACY_BRAND_NAME)
    .join(resolvedName)
}

export function replaceDocsContentPlaceholders(
  content: string,
  options?: {
    systemName?: string
    serverAddress?: string
  }
): string {
  let replaced = replaceBrandNameTokens(content, options?.systemName)
  const serverAddress = normalizeServerAddress(options?.serverAddress)
  if (serverAddress) {
    replaced = replaced
      .split(DOCS_BASE_URL_PLACEHOLDER)
      .join(serverAddress)
      .split(LEGACY_DOCS_BASE_URL_PLACEHOLDER)
      .join(serverAddress)
  }
  return replaced
}
