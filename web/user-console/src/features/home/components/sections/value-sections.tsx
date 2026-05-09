import { useTranslation } from 'react-i18next'

export function ValueSections() {
  const { t } = useTranslation()

  const cards = [
    {
      title: t('Connect multiple model APIs once'),
      body: t(
        'Reduce repeated adapter work and keep access to mainstream model APIs behind one hosted entry point.'
      ),
    },
    {
      title: t('Keep pricing and model choices easier to manage'),
      body: t(
        'Review model options and pricing in one place so teams can compare trade-offs before routing production traffic.'
      ),
    },
    {
      title: t('Shorten the path from signup to live traffic'),
      body: t(
        'Move from account creation to testing and managed usage without stitching together separate gateways first.'
      ),
    },
  ]

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <div className='max-w-3xl space-y-3'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-slate-600'>
          {t('Why RightMaaS')}
        </p>
        <h2 className='text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl'>
          {t('A faster path from evaluation to production')}
        </h2>
      </div>
      <div className='mt-8 grid gap-6 lg:grid-cols-3'>
        {cards.map((card) => (
          <article
            key={card.title}
            className='flex h-full flex-col rounded-[24px] border border-white/70 bg-white/78 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur'
          >
            <h3 className='text-2xl font-semibold tracking-[-0.03em] text-slate-950'>
              {card.title}
            </h3>
            <p className='mt-4 flex-1 text-sm leading-7 text-slate-700'>
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
