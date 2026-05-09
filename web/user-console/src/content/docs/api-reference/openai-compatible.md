# OpenAI 兼容接口

本网站提供 OpenAI 兼容接口。如果你已经在使用 OpenAI SDK 或 OpenAI 兼容工具，通常只需要替换：

- `baseURL`
- `API Key`
- `model`

## 基础地址

文档中的基地址统一使用占位符：

```text
<rightmaas_base_url>
```

把它替换成你的实际网关根地址即可，不要在基地址本身追加 `/v1`。实际请求路径仍然按下面示例拼接。

## 已确认可用的常见端点

- `/v1/models`
- `/v1/chat/completions`
- `/v1/completions`
- `/v1/embeddings`
- `/v1/images/generations`

实际是否可用，还取决于你的账号权限、可用模型和上游通道配置。

## curl 示例

```bash
curl "<rightmaas_base_url>/v1/chat/completions" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "system", "content": "You are a concise assistant." },
      { "role": "user", "content": "Return the word OK." }
    ]
  }'
```

## TypeScript SDK 示例

如果你的项目本来就是 OpenAI SDK，用法可以保持非常接近：

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: '<rightmaas_base_url>',
})

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'user', content: 'Reply with OK only.' },
  ],
})

console.log(response.choices[0]?.message?.content)
```

## Python SDK 示例

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-api-key",
    base_url="<rightmaas_base_url>",
)

resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Reply with OK only."}],
)

print(resp.choices[0].message.content)
```

## 如何选择模型

你可以通过以下方式确认当前账号实际能用哪些模型：

1. 打开 [游乐场](/playground)，看模型下拉列表。
2. 调用 `/v1/models` 查看返回结果。
3. 如果你在 [API 密钥](/workspace/keys) 里设置了“模型限制”，还要以该限制为准。

> 文档里不要假设某个模型一定存在。最终以你的账号、分组权限和管理员配置为准。

## 与分组的关系

如果你在站内主要通过游乐场测试，建议先确认默认分组就能正常工作。只有在你明确需要固定某个分组时，再额外处理分组参数。

如果你已经在 Key 上选择了 `auto`，通常建议先验证默认行为，再决定是否在应用层额外指定组。

## 调试建议

接入 OpenAI 兼容接口时，最短排查路径通常是：

1. 先请求 `/v1/models`，验证认证与基础路由。
2. 再请求 `/v1/chat/completions`，验证推理链路。
3. 如果失败，到 [请求日志](/workspace/logs) 查 `requestId`、模型、分组和报错详情。
4. 如果前端游乐场正常而 SDK 不正常，优先对比：
   - 基础地址
   - `Authorization`
   - `model`
   - 请求体结构

## 什么时候需要额外参考资料

如果你要接的是某个具体工具或上层封装，而不是直接调用 OpenAI SDK，例如 Claude Code、Codex、OpenCode 之类，建议继续看：

- [Claude Code](/workspace/docs/tools/claude-code)
- [Codex](/workspace/docs/tools/codex)
- [OpenCode](/workspace/docs/tools/opencode)
- [OpenClaw](/workspace/docs/tools/openclaw)
