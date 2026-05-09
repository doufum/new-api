import { useTranslation } from 'react-i18next'

const steps = [
  ['1', 'Sign in', 'Authenticate into the standalone user console.'],
  [
    '2',
    'Fund or create a key',
    'Recharge balance or generate credentials before testing.',
  ],
  ['3', 'Run traffic', 'Open playground or send real API traffic and inspect logs.'],
] as const

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <div className='rounded-[32px] bg-slate-950 px-6 py-10 text-white sm:px-10'>
        <p className='text-sm font-semibold uppercase tracking-[0.35em] text-white/60'>
          {t('Workflow')}
        </p>
        <div className='mt-8 grid gap-6 lg:grid-cols-3'>
          {steps.map(([index, title, body]) => (
            <div
              key={title}
              className='rounded-[24px] border border-white/10 bg-white/5 p-6'
            >
              <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold'>
                {index}
              </span>
              <h3 className='mt-5 text-xl font-semibold'>{t(title)}</h3>
              <p className='mt-3 text-sm leading-7 text-white/70'>{t(body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
