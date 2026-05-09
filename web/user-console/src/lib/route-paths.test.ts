import { describe, expect, it } from 'vitest'
import { routePaths } from './route-paths'

describe('routePaths', () => {
  it('defines the public and authenticated user-console routes', () => {
    expect(routePaths.home).toBe('/')
    expect(routePaths.modelCenter).toBe('/model-center')
    expect(routePaths.console).toBe('/console')
    expect(routePaths.playground).toBe('/playground')
    expect(routePaths.workspace.keys).toBe('/workspace/keys')
    expect(routePaths.workspace.logs).toBe('/workspace/logs')
    expect(routePaths.workspace.tasks).toBe('/workspace/tasks')
    expect(routePaths.account.profile).toBe('/account/profile')
    expect(routePaths.account.wallet).toBe('/account/wallet')
  })
})
