# User Console 文档页面设计

## 概述

在 user-console 应用内新建独立的文档/知识库页面，使用分类侧边栏导航展示静态 Markdown 文档，替代 footer 中指向外部站点的文档链接。

## 需求

- 内容来源：静态 Markdown 文件，构建时通过 `import.meta.glob` 导入
- 语言：统一中文
- 导航：左侧分类树 + 右侧内容区
- 路由：`/workspace/docs`，需登录（`_authenticated` 路由保护）
- 访问入口：workspace 侧边栏 + footer 文档链接

## 文件结构

```
src/content/docs/
  ├── manifest.json              ← 侧边栏分类与顺序定义
  ├── getting-started/
  │   ├── intro.md
  │   └── api-key.md
  ├── tools/
  │   ├── claude-code.md
  │   ├── codex.md
  │   ├── opencode.md
  │   └── openclaw.md
  ├── api-reference/
  │   ├── openai-compatible.md
  │   └── authentication.md
  ├── models-and-billing/
  │   ├── supported-models.md
  │   └── billing.md
  └── faq/
      └── index.md
```

### manifest.json 格式

```json
[
  {
    "id": "getting-started",
    "title": "快速开始",
    "icon": "Rocket01",
    "items": [
      { "slug": "intro", "title": "新手入门" },
      { "slug": "api-key", "title": "API 密钥说明" }
    ]
  },
  {
    "id": "tools",
    "title": "工具使用",
    "icon": "Wrench01",
    "items": [
      { "slug": "claude-code", "title": "Claude Code" },
      { "slug": "codex", "title": "Codex" },
      { "slug": "opencode", "title": "OpenCode" },
      { "slug": "openclaw", "title": "OpenClaw" }
    ]
  },
  {
    "id": "api-reference",
    "title": "API 文档",
    "icon": "Code",
    "items": [
      { "slug": "openai-compatible", "title": "OpenAI 兼容接口" },
      { "slug": "authentication", "title": "认证方式" }
    ]
  },
  {
    "id": "models-and-billing",
    "title": "模型与计费",
    "icon": "Coin",
    "items": [
      { "slug": "supported-models", "title": "支持的模型" },
      { "slug": "billing", "title": "计费说明" }
    ]
  },
  {
    "id": "faq",
    "title": "常见问题",
    "icon": "Question",
    "items": [
      { "slug": "index", "title": "常见问题" }
    ]
  }
]
```

## 路由设计

```
src/app-routes/_authenticated/workspace/
  ├── docs/
  │   ├── index.tsx              ← /workspace/docs（重定向到第一篇文章）
  │   └── $category.$slug.tsx    ← /workspace/docs/:category/:slug
```

- `/workspace/docs` → 自动重定向到 manifest 中第一篇文档
- `/workspace/docs/:category/:slug` → 渲染对应 Markdown 文件
- 使用 `AuthenticatedLayout` 包裹

## 组件结构

```
src/features/docs/
  ├── index.tsx                        ← 文档页面主组件
  ├── components/
  │   ├── docs-sidebar.tsx             ← 左侧分类导航
  │   ├── docs-content.tsx             ← 右侧 Markdown 内容区
  │   └── docs-sidebar-item.tsx        ← 导航项组件
  └── hooks/
      └── use-docs-manifest.ts         ← 解析 manifest + glob 加载
```

### 页面布局

- 左侧固定侧边栏：分类标题 + 文档链接列表，当前文档高亮
- 右侧内容区：使用已有 `Markdown` 组件渲染 `.md` 内容，加 `FadeIn` 动画
- 响应式：移动端侧边栏收起为 Sheet 抽屉

### 加载逻辑

- `use-docs-manifest.ts` 用 `import.meta.glob('*.md', { query: '?raw' })` 预扫描所有 md 文件
- 读取 `manifest.json` 构建侧边栏树
- 根据 URL 参数动态加载对应 md 内容（lazy load，非一次性加载全部）

## Footer 链接更新

将 `footer.tsx` 中文档列的外部链接改为内部路由：

| 原链接 | 新链接 |
|--------|--------|
| `https://docs.newapi.pro/getting-started/` | `/workspace/docs/getting-started/intro` |
| `https://docs.newapi.pro/installation/` | `/workspace/docs/tools/claude-code` |
| `https://docs.newapi.pro/api/` | `/workspace/docs/api-reference/openai-compatible` |

使用 TanStack Router 的 `<Link>` 组件替代 `<a>` 标签。

## 侧边栏导航集成

在 `workspace-registry.ts` 的 Default workspace 导航项中加入「文档」入口，图标使用 `BookOpen`，指向 `/workspace/docs`。

## 复用的现有组件

- `Markdown`（`src/components/ui/markdown.tsx`）
- `SectionPageLayout`（`src/components/layout/components/section-page-layout.tsx`）
- `FadeIn` 动画组件
- `Sheet`（移动端侧边栏抽屉）

## i18n

文档内容统一中文，不做多语言版本。UI 元素（如侧边栏标题）从 `manifest.json` 读取，不经过 i18n 系统。文档页面本身的导航文案（如"文档"菜单名）需要添加到 i18n 翻译文件中。
