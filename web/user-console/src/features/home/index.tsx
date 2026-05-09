import { useAuthStore } from '@/stores/auth-store'
import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { CTA, Governance, Hero, TrustBar, ValueSections } from './components'

export function Home() {
  const isAuthenticated = Boolean(useAuthStore((state) => state.auth.user))

  return (
    <PublicLayout showMainContainer={false}>
      <main className='relative isolate overflow-hidden bg-[linear-gradient(180deg,#fffcf8_0%,#fff7f0_42%,#f6f8ff_100%)] text-slate-950'>
        <Hero isAuthenticated={isAuthenticated} />
        <TrustBar />
        <ValueSections />
        <Governance />
        <CTA isAuthenticated={isAuthenticated} />
        <Footer />
      </main>
    </PublicLayout>
  )
}
