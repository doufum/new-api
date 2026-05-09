# 认证方式

平台当前采用最常见的 `Bearer Token` 方式认证。你在 [API 密钥](/workspace/keys) 创建出来的密钥，需要通过 `Authorization` 请求头发送给网关。

## 标准写法

```http
Authorization: Bearer sk-your-api-key
```

不要写成查询参数，也不要把前缀 `Bearer` 省略掉。

## 最小可用示例

```bash
curl "<rightmaas_base_url>/v1/models" \
  -H "Authorization: Bearer sk-your-api-key"
```

如果返回了模型列表，说明认证链路已经正常。

## Chat Completions 示例

```bash
curl "<rightmaas_base_url>/v1/chat/completions" \
  -H "Authorization: Bearer sk-your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      { "role": "user", "content": "Say hello." }
    ]
  }'
```

## 常见错误码

| 状态码 | 含义 | 优先检查项 |
| --- | --- | --- |
| `401` | 未认证或凭证无效 | Key 是否写错、是否过期、是否缺少 `Bearer` |
| `403` | 已认证但无权限 | 模型限制、用户权限、分组限制 |
| `429` | 请求频率或配额受限 | 额度、速率限制、上游负载 |

## 认证失败时的排查顺序

1. 确认请求头名字是否是 `Authorization`。
2. 确认值是否是 `Bearer sk-...` 这种格式。
3. 确认使用的是最新复制出来的真实 Key，而不是脱敏展示值。
4. 到 [API 密钥](/workspace/keys) 检查该 Key 是否过期、禁用或额度耗尽。
5. 到 [使用日志](/workspace/logs) 查看是否已经有对应请求记录。

## 在服务端程序中使用

无论你使用哪种语言，核心都是把 Key 放到环境变量里，然后在发请求时带上 Header。

```bash
export OPENAI_API_KEY="sk-your-api-key"
export OPENAI_BASE_URL="<rightmaas_base_url>"
```

这样通常能避免把真实密钥硬编码进代码仓库。

## 不建议的做法

- 把 Key 直接提交进 Git 仓库
- 在浏览器公开源码里硬编码生产 Key
- 多个环境共用一个无限额度的长期密钥

## 与日志联动排查

当你怀疑某个 Key 被错误使用时，可以在 [请求日志](/workspace/logs) 里按这些维度筛选：

- `token`
- `model`
- `group`
- `requestId`

这样比单纯看客户端报错更容易定位问题。
