import { useTranslation } from 'react-i18next'

export function TrustBar() {
  const { t } = useTranslation()
  const items = [
    t('Compatible with mainstream model APIs'),
    t('Transparent model and pricing catalog'),
    t('Documentation and onboarding support'),
    t('Ready for production use cases'),
  ]

  return (
    <section className='mx-auto max-w-7xl px-6 py-6'>
      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
        {items.map((item) => (
          <div
            key={item}
            className='flex min-h-16 items-center rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.05)]'
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
