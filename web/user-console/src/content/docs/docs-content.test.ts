import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

function readDoc(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), 'utf8')
}

describe('docs content', () => {
  it('covers the real onboarding flow in getting-started docs', () => {
    const intro = readDoc('./getting-started/intro.md')
    const apiKey = readDoc('./getting-started/api-key.md')

    expect(intro).toContain('/workspace/keys')
    expect(intro).toContain('/playground')
    expect(intro).toContain('/workspace/logs')
    expect(intro).toContain('```bash')
    expect(intro).toContain('| API 密钥 | `/workspace/keys` |')
    expect(intro).toContain('| 文档 | `/workspace/docs` |')
    expect(intro).toContain('| 游乐场 | `/playground` |')
    expect(intro).toContain('| 使用日志 | `/workspace/logs` |')
    expect(intro).toContain('| 钱包 | `/account/wallet` |')
    expect(intro).not.toContain('user-console')
    expect(intro).not.toContain('expired_time')
    expect(intro).not.toContain('remain_quota_dollars')
    expect(intro).not.toContain('tokenCount')
    expect(intro).not.toContain('model_limits')

    expect(apiKey).toContain('名称')
    expect(apiKey).toContain('分组')
    expect(apiKey).toContain('过期时间')
    expect(apiKey).toContain('数量')
    expect(apiKey).toContain('无限额度')
    expect(apiKey).toContain('模型限制')
    expect(apiKey).toContain('[API 密钥](/workspace/keys)')
    expect(apiKey).not.toContain('cross_group_retry')
    expect(apiKey).not.toContain('model_limits')
    expect(apiKey).not.toContain('remain_quota_dollars')
    expect(apiKey).not.toContain('expired_time')
    expect(apiKey).not.toContain('tokenCount')
  })

  it('documents authentication, compatible API usage, and billing workflow', () => {
    const authentication = readDoc('./api-reference/authentication.md')
    const openaiCompatible = readDoc('./api-reference/openai-compatible.md')
    const billing = readDoc('./models-and-billing/billing.md')
    const faq = readDoc('./faq/index.md')

    expect(authentication).toContain('Authorization: Bearer')
    expect(authentication).toContain('/v1/models')
    expect(authentication).toContain('401')
    expect(authentication).toContain('OPENAI_BASE_URL="<rightmaas_base_url>"')

    expect(openaiCompatible).toContain('/v1/chat/completions')
    expect(openaiCompatible).toContain('baseURL')
    expect(openaiCompatible).toContain('```ts')
    expect(openaiCompatible).toContain("<rightmaas_base_url>")
    expect(openaiCompatible).not.toContain('user-console')

    expect(billing).toContain('/account/wallet')
    expect(billing).toContain('充值码')
    expect(billing).toContain('订阅')
    expect(billing).toContain('/workspace/logs')
    expect(billing).toContain('| 钱包 | `/account/wallet` |')
    expect(billing).toContain('| 使用日志 | `/workspace/logs` |')
    expect(billing).toContain('| API 密钥 | `/workspace/keys` |')
    expect(billing).toContain('通用日志')
    expect(billing).toContain('优先订阅')
    expect(billing).not.toContain('Billing Preference')
    expect(billing).not.toContain('Common Logs')

    expect(faq).toContain('游乐场')
    expect(faq).toContain('请求日志')
    expect(faq).toContain('模型限制')
    expect(faq).toContain('基础地址')
    expect(faq).not.toContain('baseURL')
    expect(faq).not.toContain('model_limits')
    expect(faq).not.toContain('cross_group_retry')
    expect(faq).not.toContain('Common Logs')
  })

  it('covers model categories and tool-specific connection rules', () => {
    const supportedModels = readDoc('./models-and-billing/supported-models.md')
    const claudeCode = readDoc('./tools/claude-code.md')
    const codex = readDoc('./tools/codex.md')
    const opencode = readDoc('./tools/opencode.md')
    const openclaw = readDoc('./tools/openclaw.md')

    expect(supportedModels).toContain('OpenAI-Compatible')
    expect(supportedModels).toContain('OpenAI Responses')
    expect(supportedModels).toContain('Claude Messages')
    expect(supportedModels).toContain('Gemini')
    expect(supportedModels).toContain('/api/user/models')
    expect(supportedModels).toContain('curl "<rightmaas_base_url>/v1/models"')
    expect(supportedModels).not.toContain('README')
    expect(supportedModels).not.toContain('model_limits')

    expect(claudeCode).toContain('ANTHROPIC_BASE_URL')
    expect(claudeCode).toContain('CC 切换')
    expect(claudeCode).toContain('```bash')
    expect(claudeCode).toContain('ANTHROPIC_BASE_URL="<rightmaas_base_url>"')
    expect(claudeCode).not.toContain('当前项目里')
    expect(claudeCode).not.toContain('仓库里')
    expect(claudeCode).not.toContain('集成逻辑')

    expect(codex).toContain('OPENAI_BASE_URL')
    expect(codex).toContain('<rightmaas_base_url>')
    expect(codex).toContain('requestId')
    expect(codex).not.toContain('当前项目里')
    expect(codex).not.toContain('仓库里')
    expect(codex).not.toContain('集成逻辑')
    expect(codex).not.toContain('model_limits')

    expect(opencode).toContain('base_url')
    expect(opencode).toContain('<rightmaas_base_url>')
    expect(opencode).toContain('OpenAI 兼容')
    expect(opencode).not.toContain('model_limits')

    expect(openclaw).toContain('OpenAI 兼容')
    expect(openclaw).toContain('API 密钥')
    expect(openclaw).toContain('游乐场')
    expect(openclaw).not.toContain('README')
    expect(openclaw).not.toContain('仓库')
  })

  it('uses placeholder base URLs and avoids internal project phrasing in docs', () => {
    const docs = [
      readDoc('./getting-started/intro.md'),
      readDoc('./getting-started/api-key.md'),
      readDoc('./api-reference/authentication.md'),
      readDoc('./api-reference/openai-compatible.md'),
      readDoc('./faq/index.md'),
      readDoc('./models-and-billing/billing.md'),
      readDoc('./models-and-billing/supported-models.md'),
      readDoc('./tools/claude-code.md'),
      readDoc('./tools/codex.md'),
      readDoc('./tools/opencode.md'),
      readDoc('./tools/openclaw.md'),
    ]

    for (const content of docs) {
      expect(content).not.toContain('localhost:3000')
      expect(content).not.toContain('https://your-domain.example.com')
      expect(content).not.toContain('user-console')
      expect(content).not.toContain('README')
      expect(content).not.toContain('当前项目里')
      expect(content).not.toContain('仓库里')
      expect(content).not.toContain('集成逻辑')
    }
  })
})
