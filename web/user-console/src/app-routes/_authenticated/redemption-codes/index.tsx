import { createFileRoute } from '@tanstack/react-router'
import {
  LegacyRoutePlaceholder,
  redirectLegacyRoute,
} from '@/lib/legacy-route-guard'

export const Route = createFileRoute('/_authenticated/redemption-codes/')({
  beforeLoad: redirectLegacyRoute,
  component: LegacyRoutePlaceholder,
})
