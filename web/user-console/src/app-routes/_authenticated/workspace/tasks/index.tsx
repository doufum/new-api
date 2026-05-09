import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/workspace/tasks/')({
  beforeLoad: () => {
    throw redirect({
      to: '/workspace/tasks/$section',
      params: { section: 'task' },
    })
  },
})
