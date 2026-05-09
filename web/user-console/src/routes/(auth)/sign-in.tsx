import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { routePaths } from '@/lib/route-paths'
import { redirectAuthenticatedUser } from '@/lib/auth-guards'
import { SignIn } from '@/features/auth/sign-in'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    redirectAuthenticatedUser(
      useAuthStore.getState().auth.user,
      search.redirect || routePaths.console
    )
  },
})
