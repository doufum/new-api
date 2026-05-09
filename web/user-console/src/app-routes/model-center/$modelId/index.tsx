import { createFileRoute } from '@tanstack/react-router'
import { ModelDetails } from '@/features/pricing/components/model-details'
import { pricingSearchSchema } from '@/features/pricing/route-schema'

export const Route = createFileRoute('/model-center/$modelId/')({
  validateSearch: pricingSearchSchema,
  component: ModelDetails,
})
