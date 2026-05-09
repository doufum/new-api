import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  LegacyRoutePlaceholder,
} from '@/lib/legacy-route-guard'
import { pricingSearchSchema } from '@/features/pricing/route-schema'

export const Route = createFileRoute('/pricing/$modelId/')({
  validateSearch: pricingSearchSchema,
  beforeLoad: ({ params, search }) => {
    throw redirect({
      to: '/model-center/$modelId',
      params: { modelId: params.modelId },
      search,
    })
  },
  component: LegacyRoutePlaceholder,
})
