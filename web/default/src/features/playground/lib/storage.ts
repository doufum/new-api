import { STORAGE_KEYS } from '../constants'
import type { PlaygroundConfig, ParameterEnabled, Message } from '../types'
import { sanitizeMessagesOnLoad } from './message-utils'

type LegacyPlaygroundMessage = {
  id?: string
  key?: string
  role?: string
  from?: string
  content?: string
  reasoningContent?: string
  status?: string
}

function normalizeLegacyMessage(message: unknown, index: number): Message | null {
  if (!message || typeof message !== 'object') {
    return null
  }

  const candidate = message as Partial<Message> & LegacyPlaygroundMessage
  if (
    typeof candidate.key === 'string' &&
    typeof candidate.from === 'string' &&
    Array.isArray(candidate.versions)
  ) {
    return candidate as Message
  }

  const keySource = candidate.key || candidate.id
  const fromSource = candidate.from || candidate.role
  if (typeof keySource !== 'string' || typeof fromSource !== 'string') {
    return null
  }

  const content =
    typeof candidate.content === 'string' ? candidate.content : ''
  const normalized: Message = {
    key: keySource,
    from: fromSource as Message['from'],
    versions: [{ id: `${keySource}-v${index}`, content }],
  }

  if (typeof candidate.reasoningContent === 'string' && candidate.reasoningContent) {
    normalized.reasoning = {
      content: candidate.reasoningContent,
      duration: 0,
    }
    normalized.isReasoningStreaming = false
  }

  if (typeof candidate.status === 'string') {
    normalized.status = candidate.status as Message['status']
  }

  return normalized
}

function normalizeMessages(rawMessages: unknown[]): Message[] {
  const normalized = rawMessages
    .map((message, index) => normalizeLegacyMessage(message, index))
    .filter((message): message is Message => message !== null)

  return normalized.length > 0 ? normalized : []
}

/**
 * Load playground config from localStorage
 */
export function loadConfig(): Partial<PlaygroundConfig> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load config:', error)
  }
  return {}
}

/**
 * Save playground config to localStorage
 */
export function saveConfig(config: Partial<PlaygroundConfig>): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save config:', error)
  }
}

/**
 * Load parameter enabled state from localStorage
 */
export function loadParameterEnabled(): Partial<ParameterEnabled> {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PARAMETER_ENABLED)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load parameter enabled:', error)
  }
  return {}
}

/**
 * Save parameter enabled state to localStorage
 */
export function saveParameterEnabled(
  parameterEnabled: Partial<ParameterEnabled>
): void {
  try {
    localStorage.setItem(
      STORAGE_KEYS.PARAMETER_ENABLED,
      JSON.stringify(parameterEnabled)
    )
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save parameter enabled:', error)
  }
}

/**
 * Load messages from localStorage
 */
export function loadMessages(): Message[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES)
    if (saved) {
      const parsed = JSON.parse(saved) as
        | Message[]
        | { messages?: Message[] | null }
        | null
      const rawMessages = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.messages)
          ? parsed.messages
          : null
      if (!rawMessages) {
        return null
      }
      const normalizedMessages = normalizeMessages(rawMessages)
      if (normalizedMessages.length === 0) {
        return null
      }
      const sanitized = sanitizeMessagesOnLoad(normalizedMessages)
      // Persist sanitized result to avoid re-sanitizing on subsequent loads
      if (sanitized !== normalizedMessages) {
        saveMessages(sanitized)
      }
      return sanitized
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load messages:', error)
  }
  return null
}

/**
 * Save messages to localStorage
 */
export function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to save messages:', error)
  }
}

/**
 * Clear all playground data
 */
export function clearPlaygroundData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CONFIG)
    localStorage.removeItem(STORAGE_KEYS.PARAMETER_ENABLED)
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear playground data:', error)
  }
}
