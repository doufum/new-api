import { redirect } from '@tanstack/react-router'

export function redirectLegacyRoute() {
  throw redirect({ to: '/404' })
}

export function LegacyRoutePlaceholder() {
  return null
}
