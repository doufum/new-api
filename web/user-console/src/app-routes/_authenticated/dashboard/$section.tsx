import { createFileRoute } from '@tanstack/react-router'
import {
  LegacyRoutePlaceholder,
  redirectLegacyRoute,
} from '@/lib/legacy-route-guard'

export const Route = createFileRoute('/_authenticated/dashboard/$section')({
  beforeLoad: redirectLegacyRoute,
  component: LegacyRoutePlaceholder,
})
