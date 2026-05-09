import { createFileRoute } from '@tanstack/react-router'
import { Console } from '@/features/console'

export const Route = createFileRoute('/_authenticated/console/')({
  component: Console,
})
