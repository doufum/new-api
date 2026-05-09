import { createFileRoute } from '@tanstack/react-router'
import { LegacyRoutePlaceholder } from '@/lib/legacy-route-guard'

export const Route = createFileRoute('/_authenticated/system-settings/content/$section')({
  component: LegacyRoutePlaceholder,
})
