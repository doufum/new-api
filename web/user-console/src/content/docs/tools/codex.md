# Codex

如果你要把 OpenAI 风格的命令行工具接到当前网关，`Codex` 这类工具通常是最接近 [OpenAI 兼容接口](/workspace/docs/api-reference/openai-compatible) 的。

## 连接规则

`Codex` 的基础地址需要指向网关根地址：

```text
<rightmaas_base_url>
```

帮助文档里的基地址不直接写成带 `/v1` 的形式。实际请求路径仍然是 `/v1/models`、`/v1/chat/completions` 这类 OpenAI 兼容接口。

## 最小环境变量示例

```bash
export OPENAI_BASE_URL="<rightmaas_base_url>"
export OPENAI_API_KEY="sk-your-api-key"
```

如果你的工具使用的是 `OPENAI_API_BASE`、`BASE_URL` 或其他名字，请以该工具自己的文档为准，但核心仍然是指向网关基地址。

## 先做的最小验证

建议在接入 Codex 前先做这两步：

1. 调用 `/v1/models`
2. 调用 `/v1/chat/completions`

只要这两步能通，Codex 这类 OpenAI 风格工具通常就具备了最基础的接入前提。

## 示例

```bash
curl "<rightmaas_base_url>/v1/models" \
  -H "Authorization: Bearer sk-your-api-key"
```

```bash
curl "<rightmaas_base_url>/v1/chat/completions" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "Reply with OK only." }
    ]
  }'
```

## 模型选择建议

如果你准备用 Codex 跑代码助手类工作，优先确认：

- 当前账号能看到哪些模型
- 这些模型是否在你的“模型限制”里
- 你是否真的需要高价模型

最简单的确认方法还是看：

- [游乐场](/playground)
- `/v1/models`

## 使用“CC 切换”快速导入

如果你在 [API 密钥](/workspace/keys) 列表的操作菜单里看到了“CC 切换”，可以直接把站点地址、API 密钥和当前选择的模型带到外部应用。

如果你经常需要给外部工具快速导入配置，这个入口比手动抄环境变量更稳。

## 出问题时怎么排查

如果 Codex 连接失败，优先排查下面几项：

1. `OPENAI_BASE_URL` 是否指向正确的网关基地址
2. API 密钥是否正确
3. API 密钥是否受“模型限制”约束
4. 目标模型是否能在 [游乐场](/playground) 中直接跑通

如果请求已经发出，再去 [请求日志](/workspace/logs) 查：

- `model`
- `group`
- `requestId`

其中 `requestId` 往往是最快定位单次失败的入口。

## 一条实用原则

如果某个 OpenAI 风格工具接不通，不要先怀疑工具。

先确认这三个事实：

1. `/v1/models` 能通
2. `/v1/chat/completions` 能通
3. 日志里能看到这次请求

这三件事都成立后，再去看工具自己的兼容问题，效率最高。
