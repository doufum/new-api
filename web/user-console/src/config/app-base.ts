export const USER_CONSOLE_MOUNT_PATH = '/'

export type UserConsoleMountConfig = {
  assetPrefix: string
  routerBasePath: string
}

export function getUserConsoleMountConfig(
  isProduction: boolean
): UserConsoleMountConfig {
  if (isProduction) {
    return {
      assetPrefix: USER_CONSOLE_MOUNT_PATH,
      routerBasePath: USER_CONSOLE_MOUNT_PATH,
    }
  }

  return {
    assetPrefix: '/',
    routerBasePath: '/',
  }
}
