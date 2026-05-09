import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { Wallet } from './index'

vi.mock('@/lib/api', () => ({
  getSelf: vi.fn().mockResolvedValue({
    success: true,
    data: {
      quota: 0,
      used_quota: 0,
      request_count: 0,
    },
  }),
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({
    status: { price: 1 },
  }),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    currency: {
      quotaDisplayType: 'USD',
      usdExchangeRate: 1,
    },
  }),
}))

vi.mock('@/components/layout', () => ({
  SectionPageLayout: Object.assign(
    ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    {
      Title: ({ children }: { children: React.ReactNode }) => <h1>{children}</h1>,
      Description: ({ children }: { children: React.ReactNode }) => (
        <p>{children}</p>
      ),
      Content: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    }
  ),
}))

vi.mock('./components/wallet-stats-card', () => ({
  WalletStatsCard: () => <div>Wallet Stats</div>,
}))

vi.mock('./components/recharge-form-card', () => ({
  RechargeFormCard: () => <div>Recharge Form</div>,
}))

vi.mock('./components/subscription-plans-card', () => ({
  SubscriptionPlansCard: () => <div>Subscription Plans</div>,
}))

vi.mock('./components/affiliate-rewards-card', () => ({
  AffiliateRewardsCard: () => <div>Referral Program</div>,
}))

vi.mock('./components/dialogs/payment-confirm-dialog', () => ({
  PaymentConfirmDialog: () => null,
}))

vi.mock('./components/dialogs/transfer-dialog', () => ({
  TransferDialog: () => null,
}))

vi.mock('./components/dialogs/billing-history-dialog', () => ({
  BillingHistoryDialog: () => null,
}))

vi.mock('./components/dialogs/creem-confirm-dialog', () => ({
  CreemConfirmDialog: () => null,
}))

vi.mock('./hooks', () => ({
  useTopupInfo: () => ({
    topupInfo: null,
    presetAmounts: [],
    loading: false,
  }),
  usePayment: () => ({
    amount: 0,
    calculating: false,
    processing: false,
    calculatePaymentAmount: vi.fn(),
    processPayment: vi.fn().mockResolvedValue(true),
  }),
  useAffiliate: () => ({
    affiliateLink: 'https://example.com/ref/demo',
    loading: false,
    transferQuota: vi.fn().mockResolvedValue(true),
    transferring: false,
  }),
  useRedemption: () => ({
    redeeming: false,
    redeemCode: vi.fn().mockResolvedValue(true),
  }),
  useCreemPayment: () => ({
    processing: false,
    processCreemPayment: vi.fn().mockResolvedValue(true),
  }),
  useWaffoPayment: () => ({
    processWaffoPayment: vi.fn().mockResolvedValue(true),
  }),
  useWaffoPancakePayment: () => ({
    processing: false,
    processWaffoPancakePayment: vi.fn().mockResolvedValue(true),
  }),
}))

describe('Wallet', () => {
  it('does not render invitation reward content in the user console', () => {
    render(<Wallet />)

    expect(screen.queryByText('Referral Program')).not.toBeInTheDocument()
  })
})
