import { useTranslation } from 'react-i18next'
import { type NavigateFn } from '@/hooks/use-table-url-state'
import { SectionPageLayout } from '@/components/layout'
import { ApiKeysDialogs } from './components/api-keys-dialogs'
import { ApiKeysProvider } from './components/api-keys-provider'
import { ApiKeysTable } from './components/api-keys-table'

type ApiKeysProps = {
  search: Record<string, unknown>
  navigate: NavigateFn
}

export function ApiKeys(props: ApiKeysProps) {
  const { t } = useTranslation()
  return (
    <ApiKeysProvider>
      <SectionPageLayout>
        <SectionPageLayout.Title>{t('API Keys')}</SectionPageLayout.Title>
        <SectionPageLayout.Description>
          {t('Manage your API keys for accessing the service')}
        </SectionPageLayout.Description>
        <SectionPageLayout.Content>
          <ApiKeysTable search={props.search} navigate={props.navigate} />
        </SectionPageLayout.Content>
      </SectionPageLayout>

      <ApiKeysDialogs />
    </ApiKeysProvider>
  )
}
