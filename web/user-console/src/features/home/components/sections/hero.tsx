import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { routePaths } from '@/lib/route-paths'

interface HeroProps {
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()

  return (
    <section className='mx-auto grid max-w-7xl gap-6 px-6 pb-12 pt-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-stretch lg:gap-8 lg:pt-28'>
      <div className='flex min-w-0 flex-col justify-center space-y-6'>
        <p className='text-sm font-semibold uppercase tracking-[0.32em] text-slate-600'>
          {t('Hosted AI Gateway')}
        </p>
        <h1 className='max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl'>
          {t(
            'Connect to leading AI models with lower cost and faster rollout.'
          )}
        </h1>
        <p className='max-w-2xl text-lg leading-8 text-slate-700'>
          {t(
            'Use one hosted gateway to compare models and pricing, simplify integration, and move production traffic with clearer support and governance.'
          )}
        </p>
        <div className='space-y-3'>
          <div className='flex flex-wrap gap-3'>
            <Link
              to={
                props.isAuthenticated ? routePaths.console : routePaths.auth.signUp
              }
              className='rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5'
            >
              {props.isAuthenticated ? t('Enter Console') : t('Quickstart')}
            </Link>
            <Link
              to={routePaths.modelCenter}
              className='rounded-full border border-slate-300 bg-white/80 px-6 py-3 font-medium text-slate-950 transition hover:-translate-y-0.5'
            >
              {t('View Models & Pricing')}
            </Link>
          </div>
          {!props.isAuthenticated ? (
            <p className='text-sm text-slate-600'>
              {t('Create an account and send your first request in under 2 minutes.')}
            </p>
          ) : null}
        </div>
        <div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {[
            t('Lower integration cost'),
            t('Service-backed delivery'),
            t('Faster production rollout'),
          ].map((item) => (
            <div
              key={item}
              className='flex min-h-16 items-center rounded-2xl border border-white/70 bg-white/75 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.06)]'
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className='flex h-full min-h-[22rem] rounded-[28px] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-8'>
        <div className='grid flex-1 auto-rows-fr gap-4 sm:grid-cols-2'>
          <div className='rounded-3xl bg-white/10 p-6'>
            <p className='text-sm font-medium text-white/80'>{t('Cost status')}</p>
            <p className='mt-4 text-2xl font-semibold leading-tight'>
              {t('Lower integration cost')}
            </p>
          </div>
          <div className='rounded-3xl bg-white/10 p-6'>
            <p className='text-sm font-medium text-white/80'>{t('Coverage')}</p>
            <p className='mt-4 text-2xl font-semibold leading-tight'>
              {t('Compatible with mainstream model APIs')}
            </p>
          </div>
          <div className='flex flex-col rounded-3xl border border-white/20 bg-white/5 p-6'>
            <p className='text-sm font-medium text-white/80'>{t('Support')}</p>
            <p className='mt-4 text-base font-medium leading-relaxed text-white/95'>
              {t('Documentation and onboarding support')}
            </p>
          </div>
          <div className='flex flex-col rounded-3xl border border-white/20 bg-white/5 p-6'>
            <p className='text-sm font-medium text-white/80'>{t('Readiness')}</p>
            <p className='mt-4 text-base font-medium leading-relaxed text-white/95'>
              {t('Ready for production use cases')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
