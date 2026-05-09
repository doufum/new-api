import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routePaths } from '@/lib/route-paths'
import { useAuthRedirect } from './use-auth-redirect'

const navigateMock = vi.fn()
const getSelfMock = vi.fn()
const setUserMock = vi.fn()
const saveUserIdMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => navigateMock,
}))

vi.mock('@/stores/auth-store', () => ({
  useAuthStore: () => ({
    auth: {
      setUser: setUserMock,
    },
  }),
}))

vi.mock('@/lib/api', () => ({
  getSelf: () => getSelfMock(),
}))

vi.mock('../lib/storage', () => ({
  saveUserId: (...args: unknown[]) => saveUserIdMock(...args),
}))

describe('useAuthRedirect', () => {
  beforeEach(() => {
    navigateMock.mockReset()
    getSelfMock.mockReset()
    setUserMock.mockReset()
    saveUserIdMock.mockReset()
  })

  it('uses the new console route as the default post-login destination', async () => {
    getSelfMock.mockResolvedValue({ success: false })

    const { result } = renderHook(() => useAuthRedirect())

    await act(async () => {
      await result.current.handleLoginSuccess()
    })

    expect(navigateMock).toHaveBeenCalledWith({
      to: routePaths.console,
      replace: true,
    })
  })
})
