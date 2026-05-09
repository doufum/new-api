import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Wallet } from '@/features/wallet'

const walletSearchSchema = z.object({
  show_history: z.boolean().optional(),
})

export const Route = createFileRoute('/_authenticated/account/wallet/')({
  component: WalletPage,
  validateSearch: walletSearchSchema,
})

function WalletPage() {
  const { show_history } = Route.useSearch()
  return <Wallet initialShowHistory={show_history} />
}
