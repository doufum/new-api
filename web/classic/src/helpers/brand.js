const MANAGEMENT_MOUNT_PATH = '/management';
const DEFAULT_LOGO = `${MANAGEMENT_MOUNT_PATH}/logo.png`;
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+.-]*:/i;

export function normalizeManagementLogoPath(value) {
  if (typeof value !== 'string') {
    return DEFAULT_LOGO;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return DEFAULT_LOGO;
  }
  if (trimmed.startsWith(`${MANAGEMENT_MOUNT_PATH}/`)) {
    return trimmed;
  }
  if (trimmed.startsWith('//') || ABSOLUTE_URL_PATTERN.test(trimmed)) {
    return trimmed;
  }
  if (trimmed === '/logo.png') {
    return DEFAULT_LOGO;
  }

  return trimmed;
}
