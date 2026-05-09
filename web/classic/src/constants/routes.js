export const MANAGEMENT_BASE_PATH = '/management';
export const MANAGEMENT_CONSOLE_BASE_PATH = `${MANAGEMENT_BASE_PATH}/console`;

export function withManagementPath(path) {
  if (!path.startsWith('/')) {
    return `${MANAGEMENT_BASE_PATH}/${path}`;
  }
  if (path.startsWith(MANAGEMENT_BASE_PATH)) {
    return path;
  }
  return `${MANAGEMENT_BASE_PATH}${path}`;
}
