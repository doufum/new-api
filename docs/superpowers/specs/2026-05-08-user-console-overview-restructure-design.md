# user-console 总览页重构设计

## 1. 背景

当前 `web/user-console` 的已登录首页为 `Console` 视图，信息结构偏“用户入口页”：

- 左侧菜单包含 `Docs`
- 左侧一级导航标题为 `Console`
- 首页顶部存在 `用户工作台` 标识与较强的欢迎区块
- 首页下方包含 `API 信息`、`运行时间`、`FAQ` 等支撑型模块

这与目标信息架构不一致。用户需要一个更直接的数据总览首页，而不是带较强引导感的工作台页。

## 2. 目标

本次改造只处理 `web/user-console` 已登录区的导航与首页结构，目标如下：

1. 将左侧菜单中的 `文档` 迁移到 header 搜索栏旁边。
2. 将左侧菜单 `控制台` 改为 `总览`。
3. 将首页从“工作台导向”调整为“数据优先导向”。
4. 移除首页上部 `用户工作台` 标识及其原有重欢迎式表达。
5. 在首页展示以下数据能力：
   - 请求次数统计
   - 统计 Tokens
   - 平均 RPM
   - 平均 TPM
   - 模型数据分析：消耗分布
   - 模型数据分析：调用趋势
6. 保留 `公告` 模块。
7. 移除首页底部 `API 信息`、`运行时间`、`FAQ`。

## 3. 非目标

以下内容不在本次范围内：

- 不修改 `web/default`、`web/classic` 或后端 dashboard 的路由结构
- 不新增统计 API
- 不扩展新的筛选器、时间粒度配置或图表交互
- 不重做用户中心其他页面
- 不调整文档内容页本身，仅调整入口位置

## 4. 设计决策

### 4.1 导航层

#### 左侧菜单

调整 `useSidebarData()`：

- 删除 `Workspace` 分组中的 `Docs`
- 将原 `Console` 文案改为 `Overview` 对应的翻译键

结果：

- 左侧只保留与高频操作直接相关的导航
- 文档入口不再占用侧栏层级

#### Header 顶部导航

调整 `useTopNavLinks()`：

- 返回一个顶部链接项：`Docs`
- 链接目标保持为当前文档首页
  - `routePaths.workspace.docs + '/getting-started/intro'`

这样可以复用现有 `AppHeader -> TopNav` 渲染链路，不需要在 header 右侧区域额外硬编码按钮。

选择该方案的原因：

- KISS：复用既有顶部导航机制
- DRY：避免为单一入口单独新建 header 按钮实现
- 可维护：后续如果还要把更多“轻量入口”上移到 header，可继续沿用同一机制

### 4.2 首页信息架构

首页采用已确认的 `B` 方案，即“数据优先型”。

页面结构调整为：

1. 页面标题与说明保留，但弱化视觉存在感
2. 第一屏直接展示 4 个统计卡片
3. 第二层展示模型调用趋势图
4. 第三层展示消耗分布图与公告

说明：

- 不再保留当前 `ConsoleHero` 的强欢迎视觉中心
- 不再保留“操作入口卡片 + 右侧支撑列”的结构
- 首页的首要任务改为“告诉用户现在的使用情况”

### 4.3 首页模块取舍

#### 保留

- `AnnouncementsPanel`

#### 新增到总览页主体

- `LogStatCards`
- `ModelCharts`
- `ConsumptionDistributionChart`

#### 删除

- `ConsoleHero`
- `ConsoleSummaryGrid`
- `ConsoleActionDeck`
- `ConsoleSupportColumn`
- `ConsoleSecondaryPanels` 中的：
  - `ApiInfoPanel`
  - `FAQPanel`
  - `UptimePanel`

### 4.4 数据来源复用

本次不重新实现统计逻辑，直接复用 dashboard 已有数据链路。

复用对象：

- `LogStatCards`
  - 提供请求次数、统计 Tokens、平均 RPM、平均 TPM
- `ModelCharts`
  - 使用 `trend` 视图表达调用趋势
- `ConsumptionDistributionChart`
  - 表达消耗分布

复用方式：

- 在 user console 的 `Console` 视图中直接组合这些组件
- 复用它们内部已有的请求与数据处理逻辑

理由：

- DRY：避免复制 dashboard 的统计请求、数据聚合、图表配置
- 风险低：这些组件已经服务于现有 dashboard，行为边界更清晰
- YAGNI：当前需求只要求展示，不要求重新定义统计语义或新增数据口径

## 5. 组件结构设计

### 5.1 目标组件树

`Console`

- `SectionPageLayout.Title`
- `SectionPageLayout.Description`
- `SectionPageLayout.Content`
  - `LogStatCards`
  - `ModelCharts`
    - 默认激活 `trend`
  - 一个双列区域
    - `ConsumptionDistributionChart`
    - `AnnouncementsPanel`

### 5.2 旧组件处理策略

#### `ConsoleHero`

- 从 `Console` 中移除
- 若仅被该页面使用，可后续删除对应文件与测试
- 若当前回合只做最小风险改造，也可先停止引用，待实现阶段确认是否物理删除

#### `ConsoleSummaryGrid`

- 从 `Console` 中移除
- 其“余额/历史消耗/请求数”语义不再作为首页主体卡片
- 新首页主体卡片改用 `LogStatCards`

#### `ConsoleActionDeck`

- 从 `Console` 中移除
- 不迁移到新首页其他位置

#### `ConsoleSupportColumn`

- 从 `Console` 中移除
- 因 `API 信息` 与 `运行时间` 不再保留

#### `ConsoleSecondaryPanels`

- 不再作为首页容器保留
- 由首页直接组合保留模块，避免继续透传不需要的面板

## 6. 布局设计

### 6.1 桌面端

推荐布局：

1. 顶部：标题 + 简短说明
2. 第二行：`LogStatCards`
3. 第三行：`ModelCharts`
4. 第四行：双列
   - 左：`ConsumptionDistributionChart`
   - 右：`AnnouncementsPanel`

原因：

- 调用趋势图通常更适合占据更完整的横向空间
- 公告仍需保留，但不应抢占第一屏主导地位
- 消耗分布与公告并列时，整体信息密度比较平衡

### 6.2 移动端

按自然垂直顺序折叠：

1. 标题与说明
2. 统计卡片
3. 调用趋势
4. 消耗分布
5. 公告

这样无需为移动端引入新的交互模型。

## 7. 交互与状态

### 7.1 Header 文档入口

- 文档入口作为顶部导航文本链接展示
- 在桌面端位于左侧导航区，视觉上靠近搜索框
- 在移动端进入 `TopNav` 下拉中展示

### 7.2 图表默认状态

- `ModelCharts` 默认切到 `trend`
- `ConsumptionDistributionChart` 保持组件默认图表类型，除非实现阶段确认需要固定为某一类型

### 7.3 加载与异常

继续沿用被复用组件自身的加载/空态/错误态逻辑，不额外包一层新的业务状态管理。

这意味着：

- 统计卡片继续使用 `LogStatCards` 内部 loading skeleton
- 图表继续使用图表组件内部的 loading 数据分支
- 公告继续沿用 `AnnouncementsPanel` 当前加载与空态展示

## 8. 路由与命名

### 8.1 路由

不改动路由路径：

- `routePaths.console` 仍为 `/console`

只改动界面文案：

- 侧栏显示从 `Console` 改为 `Overview`

### 8.2 国际化

涉及点：

- 复用已有 `Overview` 翻译键作为侧栏文案
- `Docs` 保持现有翻译键
- 若实现过程中发现首页标题仍使用 `Console overview`，则需要根据实际设计统一评估是否同步改为 `Overview`

建议：

- 侧栏必须改成 `Overview`
- 页面标题是否从 `Console overview` 改成 `Overview`，实现阶段按最终视觉一致性一起处理

## 9. 测试策略

### 9.1 单元/组件测试

至少需要覆盖：

1. `useSidebarData`：
   - 不再包含 `Docs`
   - `Console` 菜单文案变为 `Overview`
2. `useTopNavLinks`：
   - 返回 `Docs` 顶部链接
3. `Console` 页：
   - 不再渲染 `用户工作台`
   - 不再渲染 `API 信息`
   - 不再渲染 `运行时间`
   - 不再渲染 `FAQ`
   - 渲染 4 个统计卡片相关区域
   - 渲染调用趋势与消耗分布相关图表容器
   - 渲染 `公告`

### 9.2 回归验证

实现完成后应至少验证：

1. 桌面端 header 中 `Docs` 位置正确
2. 移动端顶部菜单仍可访问 `Docs`
3. 左侧导航高亮未受影响
4. `/workspace/docs/...` 现有文档路由不受影响
5. `/console` 页面在无数据、加载中、有数据时都能正常展示

## 10. 风险与缓解

### 风险 1：dashboard 组件在 user console 语境下视觉不一致

缓解：

- 优先直接复用
- 若出现明显视觉断层，仅做外层布局与间距调整，不修改统计逻辑

### 风险 2：复用图表组件导致首页请求链路变重

缓解：

- 当前需求本身就是数据优先首页，这部分请求属于目标成本
- 不额外引入更多 dashboard 模块，控制总请求量

### 风险 3：旧测试与新结构冲突

缓解：

- 先更新导航与首页测试断言
- 只保留与新信息架构一致的断言，删除对旧 hero/support 区块的依赖

## 11. 实施摘要

实现阶段预计会集中修改以下区域：

- `src/hooks/use-sidebar-data.ts`
- `src/hooks/use-top-nav-links.ts`
- `src/features/console/index.tsx`
- `src/features/console` 相关测试
- 可能涉及未再使用的 console 子组件与测试清理

## 12. 结论

本方案采用“数据优先型总览”：

- 侧栏更轻
- header 承担文档入口
- 首页不再强调欢迎与跳转操作
- 统计卡片与模型分析成为核心
- 公告保留但降级为辅助信息

该方案在不新增后端能力的前提下，能够以最小业务风险完成信息架构升级，并最大化复用现有 dashboard 统计能力。
