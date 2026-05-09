import { describe, expect, it } from 'vitest'
import en from '@/i18n/locales/en.json'
import fr from '@/i18n/locales/fr.json'
import ja from '@/i18n/locales/ja.json'
import ru from '@/i18n/locales/ru.json'
import vi from '@/i18n/locales/vi.json'
import zh from '@/i18n/locales/zh.json'

const locales = { en, zh, fr, ja, ru, vi } as const

const homepageKeys = [
  'Hosted AI Gateway',
  'Connect to leading AI models with lower cost and faster rollout.',
  'Use one hosted gateway to compare models and pricing, simplify integration, and move production traffic with clearer support and governance.',
  'Cost status',
  'Coverage',
  'Support',
  'Readiness',
  'Lower integration cost',
  'Service-backed delivery',
  'Faster production rollout',
  'View Models & Pricing',
  'Compatible with mainstream model APIs',
  'Transparent model and pricing catalog',
  'Documentation and onboarding support',
  'Ready for production use cases',
  'Quickstart',
  'Create an account and send your first request in under 2 minutes.',
  'Why RightMaaS',
  'A faster path from evaluation to production',
  'Connect multiple model APIs once',
  'Reduce repeated adapter work and keep access to mainstream model APIs behind one hosted entry point.',
  'Keep pricing and model choices easier to manage',
  'Review model options and pricing in one place so teams can compare trade-offs before routing production traffic.',
  'Shorten the path from signup to live traffic',
  'Move from account creation to testing and managed usage without stitching together separate gateways first.',
  'Operate AI access with more control',
  'Unified gateway surface',
  'Present one gateway entry for model access so application teams do not need to manage provider-by-provider routing.',
  'Stability for ongoing traffic',
  'Give teams a steadier way to move from evaluation to repeated usage with less switching friction.',
  'Permissions and billing controls',
  'Support team access control and usage management without turning the homepage into a settings manual.',
  'Start in the console, then scale with governance.',
  'Create an API key, explore the console, and send your first request in under 2 minutes.',
] as const

describe('homepage locale coverage', () => {
  it.each(Object.entries(locales))('%s includes all homepage copy', (_name, locale) => {
    for (const key of homepageKeys) {
      expect(locale.translation[key]).toBeTruthy()
    }
  })
})
