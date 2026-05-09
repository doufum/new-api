import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { Command } from 'lucide-react'
import { describe, expect, it, vi } from 'vitest'
import '@/i18n/config'
import { SidebarProvider } from '@/components/ui/sidebar'
import { WorkspaceProvider } from '../context/workspace-context'
import { WORKSPACE_IDS } from '../lib/workspace-registry'
import { WorkspaceSwitcher } from './workspace-switcher'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/dashboard' }),
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({
    status: {
      system_name: 'New API',
      version: '',
    },
  }),
}))

vi.mock('@/hooks/use-system-config', () => ({
  useSystemConfig: () => ({
    systemName: 'RightMaaS',
    logo: '/righttoken-logo.svg',
  }),
}))

describe('WorkspaceSwitcher', () => {
  it('uses the user-console fixed brand and hides unknown version placeholder', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <WorkspaceProvider>
            <WorkspaceSwitcher
              workspaces={[
                {
                  id: WORKSPACE_IDS.DEFAULT,
                  name: '',
                  logo: Command,
                  plan: '',
                },
              ]}
            />
          </WorkspaceProvider>
        </SidebarProvider>
      </QueryClientProvider>
    )

    expect(screen.getByText('RightMaaS')).toBeInTheDocument()
    expect(screen.queryByText('New API')).not.toBeInTheDocument()
    expect(screen.queryByText('Unknown version')).not.toBeInTheDocument()
    expect(screen.queryByText('未知版本')).not.toBeInTheDocument()
  })
})
