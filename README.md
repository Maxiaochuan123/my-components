# 基于 Git Dependencies 架构的 Vite + Vue3.5 + Typescript + NaviUi 组件库

# Git-based 组件库管理方案

## 背景说明
在前端开发中，我们经常需要在多个项目之间共享组件库。传统的组件库共享方式主要有：
1. 发布到 npm 仓库
2. Monorepo 方式
3. Git 相关方案

npm 发布方式需要额外的发布流程，而 Monorepo 方式会强制项目结构。因此，我们探讨了基于 Git 的两种方案，
以寻找一种既灵活又简单的组件库共享方式。

## 方案对比

### Git Dependencies
通过 package.json 中的依赖配置引用 Git 仓库中的组件库。本质上是利用了 npm 对 Git 仓库的支持特性，
可以直接在 package.json 中通过 Git URL 引用组件库。

**优势：**
- 使用包管理器（npm）管理，流程自然
- 安装和更新流程简单，只需 \`npm install\` 或 \`npm update\`
- 项目相互独立，不会互相影响
- 可以灵活切换版本，分支或 commit
- 与现有构建工具和开发流程完全兼容
- 不会改变项目结构
- 不需要发布到 npm 仓库，但保持了类似的使用体验
- 开发调试方便，可以通过 npm link 实现本地联调

**劣势：**
- 每个项目都有完整副本，占用更多存储空间
- 更新需要重新安装依赖
- 不能直接在主项目中修改依赖代码
- 首次安装和更新时需要完整克隆仓库

### Git Submodule
通过 git submodule 命令管理组件库。这是 Git 原生支持的子模块功能，可以将一个仓库作为另一个仓库的子目录。

**优势：**
- 可以直接在主项目中修改子模块代码
- 精确控制子模块版本
- 节省存储空间（共享 Git 历史）
- 可以保持子模块代码的独立性
- 适合多个项目共享代码
- 完整的版本控制能力

**劣势：**
- 学习成本较高，需要掌握额外的 Git 命令
- 团队成员都需要理解 submodule 机制
- 子模块更新流程较复杂
- 可能导致项目结构复杂化
- 容易出现同步问题
- 对开发工具的集成支持不如 npm 方式友好

## 为什么选择 Git Dependencies？

在详细讨论和对比后，我们选择了 Git Dependencies 方案，主要基于以下考虑：

1. **简单性**
   - 使用熟悉的 npm 工具链，不需要学习新的工具
   - 不需要学习额外的 Git 命令，降低团队学习成本
   - 项目结构清晰简单，避免子模块带来的复杂性
   - 开发流程与现有习惯一致，无需改变工作方式

2. **独立性**
   - 组件库完全独立维护，有专门的团队负责
   - 不同项目可以使用不同版本，互不影响
   - 避免代码耦合，职责划分清晰
   - 组件库可以独立演进，不受项目限制

3. **开发体验**
   - 支持本地开发调试（通过 npm link）
   - 与现有开发流程完全兼容
   - 版本管理更加直观
   - 调试和更新流程简单明确

4. **团队协作**
   - 降低团队协作成本
   - 避免 Git Submodule 带来的同步问题
   - 符合团队现有的开发习惯
   - 更容易进行版本控制

## 常见问题

### Q1: 为什么不直接发布到 npm？
A: 发布到 npm 需要额外的发布流程，而且：
1. 私有包需要付费或自建 npm 仓库
2. 每次修改都需要发布新版本
3. 本地调试不如 Git 方案方便
4. 对于内部使用的组件库来说过于复杂

### Q2: 为什么要执行 npm link vue naive-ui？直接 npm link 不行吗？
A: 这涉及到 Vue 的多实例问题：

1. **为什么需要这样做**：
   - 直接使用 `npm link` 时，组件库会使用自己 `node_modules` 中的 Vue 和 NaiveUI
   - 主项目也有自己的 Vue 和 NaiveUI
   - 这会导致同时存在两个 Vue 实例和两个 NaiveUI 实例
   - Vue 特别敏感，多实例会导致：
     - 组件通信失效
     - 响应式失效
     - hooks 不正常工作
     - 类型检查错误

2. **推荐的解决方案**：
   在组件库的 package.json 中添加链接脚本：
```json
{
  "scripts": {
    "link": "npm link && npm link vue naive-ui",
    "unlink": "npm unlink vue naive-ui && npm unlink"
  }
}
```

这样就可以简单地使用：
```bash
# 在组件库目录
npm run link    # 创建全局链接并链接到主项目的依赖

# 在主项目目录
npm link my-components

# 取消链接时：
# 在主项目目录
npm unlink my-components

# 在组件库目录
npm run unlink  # 移除全局链接（使用 npm rm --global）
```

如果遇到以下情况，很可能是多实例导致的：
- 组件的 props 或事件不生效
- 组件内的响应式数据不更新
- NaiveUI 的主题或样式异常
- Vue 的开发工具显示多个 Vue 实例

### Q3: 组件库和主项目使用相同的 UI 框架（如 NaiveUI）会有冲突吗？
A: 这是一个常见的问题，通过合理配置可以避免冲突：

1. 在组件库中将 UI 框架设置为 peerDependency：
```json
{
  "peerDependencies": {
    "naive-ui": "^2.x",
    "vue": "^3.x"
  },
  "devDependencies": {
    "naive-ui": "^2.x",
    "vue": "^3.x"
  }
}
```

2. 配置构建时外部化这些依赖：
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'naive-ui'],
      output: {
        globals: {
          vue: 'Vue',
          'naive-ui': 'naive'
        }
      }
    }
  }
})
```

3. 使用 npm link 时链接主项目的依赖：
```bash
npm link vue naive-ui
```

这样可以：
- 避免重复打包
- 防止多实例问题
- 减小打包体积
- 确保版本一致性

### Q4: 组件库如何独立开发和调试？
A: 组件库项目需要包含完整的开发环境：

1. 目录结构：
```
my-components/
├── src/
│   ├── components/        # 组件源码
│   │   ├── Button/
│   │   └── index.ts      # 组件导出
│   └── dev/              # 开发环境
│       ├── App.vue       # 测试页面
│       └── main.ts       # 开发入口
├── package.json
└── vite.config.ts
```

2. 开发入口配置：
```typescript
// src/dev/main.ts
import { createApp } from 'vue'
import naive from 'naive-ui'
import App from './App.vue'
import MyComponents from '../components'

const app = createApp(App)
app.use(naive)
app.use(MyComponents)
app.mount('#app')
```

3. 测试页面示例：
```vue
<!-- src/dev/App.vue -->
<template>
  <div>
    <h1>组件测试页面</h1>
    <my-button>测试按钮</my-button>
  </div>
</template>
```

这样可以：
1. 独立开发和测试组件
2. 提供开发时的即时反馈
3. 方便编写示例和文档
4. 确保组件的独立性

### Q5: 如何更新组件库？
A: 根据不同场景选择更新方式：

1. 开发环境：
   - 使用 npm link 实时更新
   - 修改即可看到效果
   - 无需提交代码

2. 测试环境：
   - 使用特定分支或 commit
   - 可以测试新功能
   - 方便回滚

3. 生产环境：
   - 使用特定的 tag 版本
   - 确保稳定性
   - 版本可控

更新命令：
```bash
# 更新到最新版本
npm update my-components

# 更新到特定版本
npm install my-components@git+https://github.com/username/my-components.git#v1.0.1
```

### Q6: 如何管理组件库版本？
A: 采用语义化版本管理：

1. 版本号规则：
   - 主版本号：不兼容的 API 修改
   - 次版本号：向下兼容的功能性新增
   - 修订号：向下兼容的问题修正

2. 发布流程：
```bash
# 1. 更新版本号
npm version patch/minor/major

# 2. 创建 tag
git tag v1.0.1

# 3. 推送到远程
git push origin main --tags
```

3. 版本日志：
   - 记录每个版本的变更
   - 说明不兼容的修改
   - 标注废弃的功能

### Q7: 为什么需要 peerDependencies？devDependencies 不够用吗？
A: `peerDependencies` 和 `devDependencies` 的作用是不同的：

1. **devDependencies（开发依赖）**：
   - 仅在组件库开发时使用
   - 不会被安装到使用该组件库的项目中
   - 用于开发、构建、测试等环境
   - 例如：用于本地开发时提供 Vue 和 NaiveUI 环境

2. **peerDependencies（对等依赖）**：
   - 声明组件库与哪些依赖兼容
   - 要求使用该组件库的项目必须安装这些依赖
   - 防止依赖版本冲突
   - 例如：告诉使用者"这个组件库需要 Vue 3.x 才能正常工作"

举个例子：
```json
{
  "name": "my-components",
  "peerDependencies": {
    "vue": "^3.x"  // 告诉使用者：你需要安装 Vue 3.x
  },
  "devDependencies": {
    "vue": "^3.x"  // 仅用于组件库开发
  }
}
```

如果不定义 `peerDependencies`：
- 使用者可能用 Vue 2.x 安装组件库（会导致错误）
- 无法知道需要安装什么版本的依赖
- npm 不会提示缺少必要的依赖

使用 `peerDependencies` 的好处：
1. 明确声明依赖要求
2. npm 会检查版本兼容性
3. 避免重复安装核心依赖
4. 防止版本冲突

### Q8: 每次开机启动项目都需要执行 npm link 吗？
A: 不需要。npm link 创建的是全局符号链接，一旦建立就会持续存在，除非：

1. 显式地执行了 `npm unlink`
2. 删除了 `node_modules` 目录需要重新 `npm install`
3. 重新安装了 Node.js

所以在正常情况下，你只需要：

1. 组件库目录 (`my-components`)：
```bash
npm run dev
```

2. 主项目目录 (`my-project`)：
```bash
npm run dev
```

只有在以下情况下，你才需要重新执行 link：
1. 如果你执行了 `npm unlink`
2. 如果你删除了 `node_modules` 并重新 `npm install`
3. 如果你重新安装了 Node.js
4. 如果链接出现了问题（比如组件无法正常使用）

简单来说：
- ✅ 日常开发：直接启动项目就好
- ❌ 不需要每次开机都 link
- 🔄 只有在链接被破坏时才需要重新 link

## 如何实施

### 1. 组件库设置
组件库需要合理配置以支持作为依赖库使用，同时保持开发的便利性。

```bash
# 创建并初始化组件库
mkdir my-components
cd my-components
npm init vite@latest . -- --template vue-ts

# 配置 package.json
{
  "name": "my-components",
  "version": "1.0.0",
  "main": "dist/my-components.umd.js",  # 指定 UMD 格式的入口文件
  "module": "dist/my-components.es.js",  # 指定 ES 模块格式的入口文件
  "types": "dist/types/index.d.ts",      # 指定类型声明文件
  "files": [                             # 指定要发布的文件
    "dist"
  ],
  "scripts": {
    "dev": "vite",                       # 开发环境
    "build": "vite build",               # 构建库
    "preview": "vite preview",            # 预览构建结果
    "link": "npm link && npm link vue naive-ui",
    "unlink": "npm unlink vue naive-ui && npm unlink"
  },
  "peerDependencies": {                  # 对等依赖，由主项目提供
    "naive-ui": "^2.x",
    "vue": "^3.x"
  },
  "devDependencies": {                   # 开发依赖，不会打包进库
    "naive-ui": "^2.x",
    "vue": "^3.x",
    "vite": "^5.x",
    "typescript": "^5.x"
  }
}

# 配置 vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MyComponents',
      fileName: 'my-components'
    },
    rollupOptions: {
      external: ['vue', 'naive-ui'],  # 外部化处理的依赖
      output: {
        globals: {
          vue: 'Vue',
          'naive-ui': 'naive'
        }
      }
    }
  }
})

# 提交到 GitHub
git init
git add .
git commit -m "init: project setup"
git remote add origin https://github.com/username/my-components.git
git push -u origin main
```

### 2. 在项目中使用
项目可以通过多种方式引用组件库，根据需求选择合适的方式。

```json
// package.json
{
  "dependencies": {
    // 方式1：使用主分支（不推荐用于生产环境）
    "my-components": "git+https://github.com/username/my-components.git#main",
    
    // 方式2：使用特定标签版本（推荐用于生产环境）
    "my-components": "git+https://github.com/username/my-components.git#v1.0.0",
    
    // 方式3：使用特定commit（用于临时测试或紧急修复）
    "my-components": "git+https://github.com/username/my-components.git#commit-hash",
    
    // 方式4：使用特定分支（用于功能测试）
    "my-components": "git+https://github.com/username/my-components.git#feature/new-button"
  }
}
```

### 3. 开发工作流
组件库的开发和使用涉及多个场景，需要采用不同的工作流程。

#### 3.1 独立开发组件
当需要开发新组件或修改现有组件时：
```bash
# 1. 在组件库中创建新分支
cd my-components
git checkout -b feature/new-component

# 2. 启动开发服务器
npm run dev

# 3. 开发和测试
# 编写组件代码和测试用例

# 4. 构建和验证
npm run build
npm run test  # 如果有测试

# 5. 提交代码
git add .
git commit -m "feat: add new component"
git push origin feature/new-component

# 6. 创建 PR 并合并到主分支
# 在 GitHub 上操作

# 7. 创建新版本
git tag v1.0.1
git push origin v1.0.1
```

#### 3.2 本地联调开发
当需要在主项目中调试组件库时：
```bash
# 1. 在组件库中创建链接
cd my-components
npm link
npm link vue naive-ui  # 链接主项目的依赖，避免多实例问题

# 2. 在主项目中使用链接
cd my-project
npm link my-components

# 3. 同时启动两个项目
# 终端1：组件库
cd my-components
npm run dev

# 终端2：主项目
cd my-project
npm run dev

# 4. 完成调试后取消链接
cd my-project
npm unlink my-components
cd ../my-components
npm unlink
```

## 最佳实践

1. **组件库开发**
   - 保持组件库的独立性
   - 完善的文档和示例
   - 语义化版本管理
   - 单元测试覆盖
   - 组件预览页面

2. **项目使用**
   - 锁定特定的组件库版本
   - 使用 npm link 进行本地开发
   - 及时更新到稳定版本
   - 做好版本更新测试

3. **团队协作**
   - 明确的责任划分
   - 标准的工作流程
   - 良好的版本控制
   - 完善的更新机制
   - 统一的代码规范

4. **版本管理**
   - 遵循语义化版本
   - 维护更新日志
   - 及时标记版本
   - 分支管理规范

## 注意事项

1. **依赖管理**
   - 合理使用 peerDependencies
   - 避免依赖冲突
   - 控制依赖版本范围
   - 及时更新依赖版本

2. **性能优化**
   - 组件按需加载
   - 合理的打包配置
   - 避免重复依赖
   - 优化构建产物

3. **兼容性**
   - 向下兼容原则
   - 废弃提示机制
   - 版本迁移指南
   - 破坏性更新说明

4. **文档维护**
   - 使用说明
   - 示例代码
   - 更新日志
   - API 文档
   - 常见问题

这种方案完全通过 Git 和 npm 生态来管理组件库，既保持了开发的灵活性，又不失工程化的规范性。通过合理的配置和规范的流程，可以很好地服务于团队的组件化开发需求。 