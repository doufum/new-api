# OpenClaw

`OpenClaw` 不同版本的配置方式可能不完全一样，这页先给出一个通用、稳妥的接入方式：优先按 OpenAI 兼容方式尝试。

## 推荐的默认思路

如果 OpenClaw 支持自定义网关地址和 API 密钥，优先尝试：

- `OpenAI 兼容` 模式
- `base URL = <rightmaas_base_url>`
- `API 密钥 = sk-your-api-key`

也就是先把它当成一个普通的 OpenAI 风格客户端看待。

## 为什么先这样做

因为当前网站最稳定、最容易验证的公共接口就是：

- `/v1/models`
- `/v1/chat/completions`

只要 OpenClaw 底层兼容这套协议，通常就能先跑起来。

## 建议的接入步骤

1. 在 [游乐场](/playground) 里先找一个可用模型。
2. 用同一个 API 密钥调 `/v1/models` 验证认证和路由。
3. 再把同一套 `base URL` 和 `API 密钥` 配到 OpenClaw。

这样可以把问题快速分成两类：

- 网关 / API 密钥本身有问题
- OpenClaw 的配置格式与预期不同

## 需要你自己确认的部分

由于 OpenClaw 不同版本的配置方式可能有差异，你还需要根据自己所用版本确认：

- 它读取哪个环境变量或配置文件字段
- 它是否严格要求 OpenAI SDK 格式
- 它是否支持自定义模型名

## 一个通用模板

如果它支持环境变量或配置文件，核心信息通常应类似：

```text
base_url = <rightmaas_base_url>
api_key = sk-your-api-key
model = 你已验证可用的模型
```

## 排查建议

接入失败时，优先做这几个动作：

1. 回到 [游乐场](/playground) 确认同一个模型是否可用。
2. 回到 [API 密钥](/workspace/keys) 确认 API 密钥没有过期或模型限制。
3. 去 [请求日志](/workspace/logs) 看是否有请求落库。

如果日志里完全没有请求，说明问题更可能在 OpenClaw 侧配置阶段；如果日志里有请求但报错，说明网关已经收到流量，可以按模型、分组、`requestId` 继续排查。

如果你的 OpenClaw 版本字段名不同，以你正在使用的版本说明为准，再把站点地址和 API 密钥替换进去即可。
