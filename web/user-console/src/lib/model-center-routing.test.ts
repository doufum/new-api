import { describe, expect, it } from 'vitest'
import { Route as LegacyPricingRoute } from '@/app-routes/pricing/index'
import { Route as LegacyPricingDetailsRoute } from '@/app-routes/pricing/$modelId/index'
import { routePaths } from './route-paths'

describe('model center routing', () => {
  it('exposes the public model center entry path', () => {
    expect(routePaths.modelCenter).toBe('/model-center')
  })

  it('redirects the legacy pricing route to model center', async () => {
    try {
      await LegacyPricingRoute.options.beforeLoad?.({
        search: { view: 'card' },
      } as never)
    } catch (error) {
      expect(error).toMatchObject({
        options: {
          to: '/model-center',
          search: { view: 'card' },
        },
      })
      return
    }

    throw new Error('Expected legacy pricing route to redirect')
  })

  it('redirects legacy pricing details to the matching model center details page', async () => {
    try {
      await LegacyPricingDetailsRoute.options.beforeLoad?.({
        params: { modelId: 'gpt-4o' },
        search: { tokenUnit: 'M' },
      } as never)
    } catch (error) {
      expect(error).toMatchObject({
        options: {
          to: '/model-center/$modelId',
          params: { modelId: 'gpt-4o' },
          search: { tokenUnit: 'M' },
        },
      })
      return
    }

    throw new Error('Expected legacy pricing details route to redirect')
  })
})
