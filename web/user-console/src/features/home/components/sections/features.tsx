import { useTranslation } from 'react-i18next'

const items = [
  [
    'Try models fast',
    'Compare prompts and responses without leaving the console.',
  ],
  [
    'Manage keys',
    'Generate and revoke API keys from a dedicated workspace area.',
  ],
  [
    'Track usage',
    'Review common logs and task logs with user-facing filters.',
  ],
  [
    'Control account spend',
    'Top up balance, inspect billing history, and review plan options.',
  ],
] as const

export function Features() {
  const { t } = useTranslation()

  return (
    <section className='mx-auto max-w-7xl px-6 py-16'>
      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-4'>
        {items.map(([title, body]) => (
          <article
            key={title}
            className='rounded-[24px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] backdrop-blur'
          >
            <h2 className='text-2xl font-semibold tracking-[-0.03em] text-slate-950'>
              {t(title)}
            </h2>
            <p className='mt-4 text-sm leading-7 text-slate-700'>{t(body)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
