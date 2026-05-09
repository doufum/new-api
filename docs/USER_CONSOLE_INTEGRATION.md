# User Console 集成指南

## 概述

User Console 已成功集成到 new-api 项目中，支持两种部署模式：

1. **生产模式**：前端构建产物嵌入到后端二进制文件中
2. **开发模式**：独立的前端开发服务器，支持热重载

## 架构变更

### 1. Dockerfile 修改

添加了 `user-console` 的构建阶段：

```dockerfile
FROM oven/bun:1 AS builder-user-console
WORKDIR /build
COPY web/user-console/package.json .
COPY web/user-console/bun.lock .
RUN bun install
COPY ./web/user-console .
COPY ./VERSION .
RUN VITE_REACT_APP_VERSION=$(cat VERSION) bun run build
```

构建产物被复制到 Go 二进制文件中：

```dockerfile
COPY --from=builder-user-console /build/dist ./web/user-console/dist
```

### 2. 后端代码修改

#### main.go

添加了 user-console 的 embed 声明：

```go
//go:embed web/user-console/dist
var userConsoleBuildFS embed.FS

//go:embed web/user-console/dist/index.html
var userConsoleIndexPage []byte
```

#### router/web-router.go

- 扩展了 `ThemeAssets` 结构体，添加 `UserConsoleBuildFS` 和 `UserConsoleIndexPage` 字段
- 添加了独立的路由处理逻辑，将 `/user-console` 路径映射到 user-console 前端

### 3. Docker Compose 配置

#### docker-compose.dev.yml

添加了 `user-console-dev` 服务，用于开发环境：

```yaml
user-console-dev:
  image: oven/bun:1
  container_name: user-console-dev
  working_dir: /app
  command: sh -c "bun install && bun run dev"
  ports:
    - "5173:5173"
  volumes:
    - ./web/user-console:/app
    - /app/node_modules
  environment:
    - VITE_REACT_APP_SERVER_URL=http://localhost:3000
```

## 使用方法

### 生产环境部署

1. **构建镜像**：

```bash
docker-compose build
```

2. **启动服务**：

```bash
docker-compose up -d
```

3. **访问**：

- 后端 API：`http://localhost:3000`
- User Console（嵌入式）：`http://localhost:3000/user-console`
- Default 前端：`http://localhost:3000`（根据 theme 设置）

### 开发环境

#### 方式 1：使用 docker-compose.dev.yml（推荐）

1. **启动所有服务**：

```bash
docker-compose -f docker-compose.dev.yml up -d
```

2. **访问**：

- 后端 API：`http://localhost:3000`
- User Console（开发服务器，热重载）：`http://localhost:5173`
- User Console（嵌入式）：`http://localhost:3000/user-console`

3. **查看日志**：

```bash
# 查看所有服务日志
docker-compose -f docker-compose.dev.yml logs -f

# 仅查看 user-console 日志
docker-compose -f docker-compose.dev.yml logs -f user-console-dev
```

4. **停止服务**：

```bash
docker-compose -f docker-compose.dev.yml down
```

#### 方式 2：本地开发（不使用 Docker）

1. **启动后端服务**（使用 docker-compose.dev.yml 或本地运行）

2. **进入 user-console 目录**：

```bash
cd web/user-console
```

3. **安装依赖**：

```bash
bun install
```

4. **启动开发服务器**：

```bash
bun run dev
```

5. **访问**：`http://localhost:5173`

### 构建验证

验证 user-console 是否正确构建：

```bash
# 构建镜像
docker-compose build new-api

# 检查构建产物
docker run --rm new-api:local ls -la /web/user-console/dist
```

## 路由说明

### 生产环境路由

- `/` - 根据 `THEME` 环境变量返回 default 或 classic 前端
- `/user-console` - User Console 前端入口
- `/user-console/*` - User Console 的所有子路由（SPA 路由）
- `/api/*` - 后端 API 路由
- `/v1/*` - OpenAI 兼容 API 路由

### 开发环境路由

开发模式下，user-console 运行在独立的端口 `5173`，通过 Rsbuild 的代理配置将 API 请求转发到后端：

```typescript
// rsbuild.config.ts
server: {
  host: '0.0.0.0',
  proxy: {
    '/api': { target: serverUrl, changeOrigin: true },
    '/mj': { target: serverUrl, changeOrigin: true },
    '/pg': { target: serverUrl, changeOrigin: true },
  },
}
```

## 环境变量

### User Console 前端

- `VITE_REACT_APP_SERVER_URL` - 后端 API 地址（开发模式使用）
- `VITE_REACT_APP_VERSION` - 应用版本号（从 `VERSION` 文件读取）

### 后端

无需额外配置，user-console 会自动嵌入到二进制文件中。

## 故障排查

### 问题 1：访问 /user-console 返回 404

**原因**：前端构建产物未正确嵌入

**解决方案**：

```bash
# 重新构建镜像
docker-compose build --no-cache new-api

# 验证构建产物
docker run --rm new-api:local ls -la /web/user-console/dist
```

### 问题 2：开发模式下 API 请求失败

**原因**：后端服务未启动或代理配置错误

**解决方案**：

1. 确认后端服务正常运行：

```bash
curl http://localhost:3000/api/status
```

2. 检查 `rsbuild.config.ts` 中的 `VITE_REACT_APP_SERVER_URL` 配置

3. 检查 docker-compose.dev.yml 中的环境变量

### 问题 3：热重载不工作

**原因**：文件挂载问题或 node_modules 冲突

**解决方案**：

```bash
# 重启 user-console-dev 服务
docker-compose -f docker-compose.dev.yml restart user-console-dev

# 或者重新构建
docker-compose -f docker-compose.dev.yml up -d --force-recreate user-console-dev
```

### 问题 4：依赖安装失败

**原因**：网络问题或 bun.lock 不同步

**解决方案**：

```bash
# 进入容器手动安装
docker-compose -f docker-compose.dev.yml exec user-console-dev bun install

# 或者删除 node_modules 重新安装
cd web/user-console
rm -rf node_modules
bun install
```

## 技术栈

### User Console 前端

- **构建工具**：Rsbuild 2.0
- **框架**：React 19
- **路由**：TanStack Router
- **状态管理**：Zustand + TanStack Query
- **UI 组件**：Radix UI + Tailwind CSS 4
- **图表**：VChart
- **包管理器**：Bun

### 后端集成

- **静态文件服务**：gin-contrib/static
- **文件嵌入**：Go embed.FS
- **路由**：Gin Web Framework

## 下一步

1. **配置后端路由权限**：确保 `/user-console` 路径的访问权限符合需求
2. **添加认证**：如果需要，为 user-console 添加身份验证
3. **优化构建**：考虑使用多阶段构建缓存加速构建过程
4. **监控集成**：添加前端错误监控和性能监控

## 参考资料

- [Rsbuild 文档](https://rsbuild.dev/)
- [TanStack Router 文档](https://tanstack.com/router)
- [Gin 静态文件服务](https://github.com/gin-contrib/static)
- [Go embed 包](https://pkg.go.dev/embed)
