export const routePaths = {
  home: '/',
  modelCenter: '/model-center',
  pricing: '/pricing',
  console: '/console',
  playground: '/playground',
  workspace: {
    keys: '/workspace/keys',
    logs: '/workspace/logs',
    tasks: '/workspace/tasks',
    docs: '/workspace/docs',
  },
  account: {
    profile: '/account/profile',
    wallet: '/account/wallet',
  },
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
} as const
