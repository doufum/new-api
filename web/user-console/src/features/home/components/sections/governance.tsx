import { useTranslation } from 'react-i18next'

export function Governance() {
  const { t } = useTranslation()

  const cards = [
    {
      title: t('Unified gateway surface'),
      body: t(
        'Present one gateway entry for model access so application teams do not need to manage provider-by-provider routing.'
      ),
    },
    {
      title: t('Stability for ongoing traffic'),
      body: t(
        'Give teams a steadier way to move from evaluation to repeated usage with less switching friction.'
      ),
    },
    {
      title: t('Permissions and billing controls'),
      body: t(
        'Support team access control and usage management without turning the homepage into a settings manual.'
      ),
    },
  ]

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <div className='rounded-[32px] bg-slate-950 px-6 py-10 text-white sm:px-10'>
        <p className='text-sm font-semibold uppercase tracking-[0.35em] text-white/60'>
          {t('Unified gateway surface')}
        </p>
        <h2 className='mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl'>
          {t('Operate AI access with more control')}
        </h2>
        <div className='mt-8 grid gap-6 lg:grid-cols-3'>
          {cards.map((card) => (
            <div
              key={card.title}
              className='flex h-full flex-col rounded-[24px] border border-white/10 bg-white/5 p-6'
            >
              <h3 className='text-xl font-semibold'>{card.title}</h3>
              <p className='mt-3 flex-1 text-sm leading-7 text-white/70'>
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
