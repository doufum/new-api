export const BUILTIN_SYSTEM_NAME = 'RightMaaS'
export const LEGACY_SYSTEM_NAME = 'New API'
export const LEGACY_BRAND_NAME = 'RightToken'

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
