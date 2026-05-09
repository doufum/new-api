import { describe, expect, it } from 'vitest'
import { redirectAuthenticatedUser, requireAuthenticatedUser } from './auth-guards'

describe('auth guards', () => {
  it('redirects anonymous users to sign-in with a redirect query', () => {
    try {
      requireAuthenticatedUser(
        null,
        'https://console.example.com/account/profile'
      )
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
      expect((error as Response & { options: { to: string } }).options.to).toBe(
        '/sign-in'
      )
      expect(
        (
          error as Response & {
            options: { search: { redirect: string } }
          }
        ).options.search.redirect
      ).toBe('https://console.example.com/account/profile')
      return
    }

    throw new Error('Expected redirect response')
  })

  it('redirects signed-in users away from sign-in', () => {
    try {
      redirectAuthenticatedUser({ id: 1, username: 'demo' }, '/console')
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
      expect((error as Response & { options: { to: string } }).options.to).toBe(
        '/console'
      )
      return
    }

    throw new Error('Expected redirect response')
  })
})
