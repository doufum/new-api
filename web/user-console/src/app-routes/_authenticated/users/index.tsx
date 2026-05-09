import { createFileRoute } from '@tanstack/react-router'
import {
  LegacyRoutePlaceholder,
  redirectLegacyRoute,
} from '@/lib/legacy-route-guard'

export const Route = createFileRoute('/_authenticated/users/')({
  beforeLoad: redirectLegacyRoute,
  component: LegacyRoutePlaceholder,
})
