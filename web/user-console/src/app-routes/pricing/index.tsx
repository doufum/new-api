import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  LegacyRoutePlaceholder,
} from '@/lib/legacy-route-guard'
import { pricingSearchSchema } from '@/features/pricing/route-schema'

export const Route = createFileRoute('/pricing/')({
  validateSearch: pricingSearchSchema,
  beforeLoad: ({ search }) => {
    throw redirect({ to: '/model-center', search })
  },
  component: LegacyRoutePlaceholder,
})
