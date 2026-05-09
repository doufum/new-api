import { redirect } from '@tanstack/react-router'
import { routePaths } from './route-paths'

type MinimalUser = { id: number; username: string } | null

export function requireAuthenticatedUser(user: MinimalUser, redirectUrl: string) {
  if (!user) {
    throw redirect({
      to: routePaths.auth.signIn,
      search: { redirect: redirectUrl },
    })
  }
}

export function redirectAuthenticatedUser(user: MinimalUser, fallbackTo: string) {
  if (user) {
    throw redirect({ to: fallbackTo })
  }
}
