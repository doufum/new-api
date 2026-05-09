import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/lib/route-paths'

export function CTA({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { t } = useTranslation()

  return (
    <section className='mx-auto max-w-7xl px-6 pb-20 pt-8'>
      <div className='rounded-[32px] border border-slate-200 bg-white px-6 py-10 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:px-10'>
        <h2 className='max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-slate-950'>
          {t('Start in the console, then scale with governance.')}
        </h2>
        <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600'>
          {t(
            'Create an API key, explore the console, and send your first request in under 2 minutes.'
          )}
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link
            to={isAuthenticated ? routePaths.console : routePaths.auth.signUp}
            className='rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5'
          >
            {isAuthenticated ? t('Enter Console') : t('Quickstart')}
          </Link>
          <Link
            to={routePaths.modelCenter}
            className='rounded-full border border-slate-300 px-6 py-3 font-medium text-slate-950 transition hover:-translate-y-0.5'
          >
            {t('View Models & Pricing')}
          </Link>
        </div>
      </div>
    </section>
  )
}
