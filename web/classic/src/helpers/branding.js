export const BUILTIN_SYSTEM_NAME = 'RightMaaS';
export const LEGACY_SYSTEM_NAME = 'New API';
export const LEGACY_BRAND_NAME = 'RightToken';

export function resolveSystemName(value) {
  if (typeof value !== 'string') return BUILTIN_SYSTEM_NAME;
  const trimmed = value.trim();
  if (
    trimmed === '' ||
    trimmed === LEGACY_SYSTEM_NAME ||
    trimmed === LEGACY_BRAND_NAME
  ) {
    return BUILTIN_SYSTEM_NAME;
  }
  return trimmed;
}

export function replaceBrandNameTokens(value, systemName = BUILTIN_SYSTEM_NAME) {
  if (typeof value !== 'string') return value;
  const resolvedName = resolveSystemName(systemName);
  return value
    .split(BUILTIN_SYSTEM_NAME)
    .join(resolvedName)
    .split(LEGACY_BRAND_NAME)
    .join(resolvedName)
    .split(LEGACY_SYSTEM_NAME)
    .join(resolvedName);
}
