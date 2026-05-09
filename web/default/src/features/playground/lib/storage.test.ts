import { beforeEach, describe, expect, it } from 'vitest'
import { loadMessages } from './storage'

function mockLocalStorage(value: string | null) {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => (key === 'playground_messages' ? value : null),
      setItem: () => {},
      removeItem: () => {},
    },
  })
}

describe('playground storage', () => {
  beforeEach(() => {
    mockLocalStorage(null)
  })

  it('loads classic playground message wrapper as message array', () => {
    mockLocalStorage(
      JSON.stringify({
        messages: [
          {
            key: 'msg-1',
            from: 'user',
            versions: [{ id: 'v1', content: 'hello' }],
          },
        ],
        timestamp: '2026-05-09T00:00:00.000Z',
      })
    )

    expect(loadMessages()).toEqual([
      {
        key: 'msg-1',
        from: 'user',
        versions: [{ id: 'v1', content: 'hello' }],
      },
    ])
  })

  it('returns null for non-array message payloads', () => {
    mockLocalStorage(JSON.stringify({ foo: 'bar' }))

    expect(loadMessages()).toBeNull()
  })

  it('normalizes classic message shape into current playground message format', () => {
    mockLocalStorage(
      JSON.stringify({
        messages: [
          {
            id: 'legacy-user',
            role: 'user',
            content: 'legacy question',
          },
          {
            id: 'legacy-assistant',
            role: 'assistant',
            content: 'legacy answer',
            reasoningContent: 'legacy thinking',
            status: 'complete',
          },
        ],
      })
    )

    expect(loadMessages()).toEqual([
      {
        key: 'legacy-user',
        from: 'user',
        versions: [{ id: 'legacy-user-v0', content: 'legacy question' }],
      },
      {
        key: 'legacy-assistant',
        from: 'assistant',
        versions: [{ id: 'legacy-assistant-v1', content: 'legacy answer' }],
        reasoning: {
          content: 'legacy thinking',
          duration: 0,
        },
        status: 'complete',
        isReasoningStreaming: false,
      },
    ])
  })
})
