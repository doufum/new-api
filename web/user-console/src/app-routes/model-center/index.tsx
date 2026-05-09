import { createFileRoute } from '@tanstack/react-router'
import { Pricing } from '@/features/pricing'
import { pricingSearchSchema } from '@/features/pricing/route-schema'

export const Route = createFileRoute('/model-center/')({
  validateSearch: pricingSearchSchema,
  component: Pricing,
})
