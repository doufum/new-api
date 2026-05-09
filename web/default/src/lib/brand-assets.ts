import { MANAGEMENT_MOUNT_PATH } from '../config/app-base'

const BUILTIN_BRAND_ASSET_PATHS = new Set([
  '/favicon.ico',
  '/icon-16x16.png',
  '/icon-32x32.png',
  '/icon-48x48.png',
  '/icon-128x128.png',
  '/icon-256x256.png',
  '/icon-512x512.png',
  '/logo.png',
  '/rightmaas-icon.svg',
  '/rightmaas-icon-32.png',
  '/rightmaas-icon-64.png',
  '/rightmaas-icon-128.png',
  '/rightmaas-icon-256.png',
  '/rightmaas-icon-512.png',
  '/righttoken-icon.svg',
  '/righttoken-icon-32.png',
  '/righttoken-icon-64.png',
  '/righttoken-icon-128.png',
  '/righttoken-icon-256.png',
  '/righttoken-icon-512.png',
])

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+.-]*:/i

export function normalizeManagementBrandUrl(
  value: string | null | undefined
): string {
  if (typeof value !== 'string') return ''

  const trimmed = value.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith(`${MANAGEMENT_MOUNT_PATH}/`)) return trimmed
  if (trimmed.startsWith('//') || ABSOLUTE_URL_PATTERN.test(trimmed)) {
    return trimmed
  }
  if (BUILTIN_BRAND_ASSET_PATHS.has(trimmed)) {
    return `${MANAGEMENT_MOUNT_PATH}${trimmed}`
  }

  return trimmed
}
