# OpenCode

`OpenCode` 这类工具通常更接近标准的 OpenAI 兼容调用方式，所以配置思路与 [OpenAI 兼容接口](/workspace/docs/api-reference/openai-compatible) 一致。

## 连接思路

如果它要求你填写 `base_url` 或类似字段，优先填写网关基地址：

```text
<rightmaas_base_url>
```

真正调用时仍然按 OpenAI 兼容路径访问接口，但帮助文档里的基地址不再直接写成带 `/v1` 的形式。

## 配置示例

```json
{
  "provider": {
    "base_url": "<rightmaas_base_url>",
    "api_key": "sk-your-api-key"
  }
}
```

如果你的 OpenCode 版本配置格式不同，就把核心含义对应过去：

- `base_url` -> 网关基地址
- `api_key` -> 你的 API 密钥

## 接入前建议

在正式配置工具前，先确认：

1. 该 Key 可以访问你打算使用的模型。
2. `/v1/models` 可以返回模型列表。
3. 你已经在 [游乐场](/playground) 里验证过至少一个模型能正常对话。

## 为什么这里强调 OpenAI 兼容

因为当工具本身不是项目内建能力时，最稳的公共交集就是 OpenAI 兼容协议。

也就是说，哪怕第三方工具名字不同，只要它底层走的是 OpenAI 风格请求，通常都可以按这页思路接。

## 失败时优先查什么

优先检查：

- `base_url` 是否填成了错误地址
- `api_key` 是否正确
- 模型名是否写错
- 当前 API 密钥是否被“模型限制”约束

## 日志排查建议

如果工具请求已经发出，去 [请求日志](/workspace/logs) 查：

- 时间范围
- 模型
- 分组
- `requestId`

只要日志里能看到请求，问题通常就已经从“工具接不通”收敛到“请求参数或权限不对”。
