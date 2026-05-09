import { createFileRoute } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { requireAuthenticatedUser } from '@/lib/auth-guards'
import { AuthenticatedLayout } from '@/components/layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    requireAuthenticatedUser(useAuthStore.getState().auth.user, location.href)
  },
  component: AuthenticatedLayout,
})
