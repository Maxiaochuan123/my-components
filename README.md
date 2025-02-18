# 基于 Git Dependencies 架构的 Vite + Vue3.5 + TypeScript + NaiveUI 组件库

## 一、组件库架构方案对比

### 1. 常见架构方案
在前端开发中，我们经常需要在多个项目之间共享组件库。以下是几种主流的组件库管理方案：

#### 1.1 npm 包发布
通过将组件库发布到 npm 仓库，其他项目通过 npm install 安装使用。

**优势：**
- 标准的包管理和分发方式
- 版本管理规范，支持语义化版本
- 完整的生态系统支持
- 可以发布到公共或私有仓库
- 依赖管理清晰
- 支持自动化发布流程
- 天然支持 CDN 分发

**劣势：**
- 需要额外的发布流程
- 私有包需要付费或自建仓库
- 每次修改都需要发版本
- 本地开发调试相对繁琐
- 版本更新需要所有项目手动升级
- 不同版本之间的依赖可能产生冲突

#### 1.2 Monorepo
将组件库和使用它的项目都放在同一个代码仓库中管理。

**优势：**
- 代码集中管理，便于维护
- 可以共享配置和依赖
- 原子提交，便于跟踪变更
- 依赖关系明确
- 支持多包联调
- 工具链统一
- 便于进行跨包修改

**劣势：**
- 仓库体积较大
- 需要专门的工具链支持
- CI/CD 配置复杂
- 学习成本较高
- 项目结构固定
- 不利于项目解耦
- 团队协作可能受限

#### 1.3 Git Submodule
通过 git submodule 命令管理组件库。

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

#### 1.4 Git Dependencies
通过 package.json 中的依赖配置引用 Git 仓库中的组件库。

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
- 首次安装和更新时需要完整克隆仓库，可能较慢
- 更新需要重新安装依赖
- 需要额外的分支管理和版本控制策略

### 2. 为什么选择 Git Dependencies？

在详细对比后，我们选择了 Git Dependencies 方案，主要基于以下考虑：

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

## 二、基于 Git Dependencies 的组件库搭建

### 1. 项目初始化

```bash
# 创建并初始化组件库
mkdir my-components
cd my-components
npm init vite@latest . -- --template vue-ts
```

### 2. 目录结构
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

### 3. 关键配置文件

#### 3.1 package.json
```json
{
  "name": "my-components",
  "version": "1.0.0",
  "type": "module",
  
  // 本地 link 模式 访问 src 目录
  "main": "src/components/index.ts",
  "module": "src/components/index.ts",
  "types": "src/vite-env.d.ts",
  
//   打包时手动切换为 dist
//   "main": "./dist/my-components.js",
//   "module": "./dist/my-components.js",
//   "types": "./dist/types/index.d.ts",

  // 当使用 Git URL 安装 npm 包时，会自动下载 dist 目录
  "files": ["dist"],
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "link": "npm link && npm link vue naive-ui",
    "unlink": "npm rm --global my-components"
  },
  // 告诉主项目必须提供这些依赖（组件库打包后是以项目的 vue 和 naive-ui 为依赖）
  "peerDependencies": {
    "naive-ui": "^2.41.0",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "naive-ui": "^2.41.0",
    "vue": "^3.5.13",
    // ... 其他开发依赖
  }
}
```

#### 3.2 vite.config.ts
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    // 生成类型声明文件
    dts({
      include: ['src/components/**/*.{ts,tsx,vue}'],
      exclude: ['src/dev/**/*'],
      outDir: 'dist/types',
    })
  ],
  build: {
    // 库模式配置，指定入口文件和输出格式
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MyComponents',
      fileName: 'my-components',
      formats: ['es']
    },
    rollupOptions: {
      // 外部化 Vue 和 NaiveUI，避免重复打包
      external: ['vue', 'naive-ui'],

      // 在打包时生成 package.json
      output: {
        // 在打包时生成 package.json
        plugins: [{
          name: 'generate-package-json',
          generateBundle() {
            const pkg = require('./package.json');
            const distPkg = {
              name: pkg.name,
              version: pkg.version,
              type: pkg.type,
              main: './my-components.js',
              module: './my-components.js',
              types: './types/index.d.ts',
              peerDependencies: pkg.peerDependencies
            };
            writeFileSync(
              'dist/package.json',
              JSON.stringify(distPkg, null, 2)
            );
          }
        }]
      }
    }
  },
  // 预构建 naive-ui 和 vue，提高开发服务器性能，确保依赖版本一致性
  optimizeDeps: {
    include: ['naive-ui', 'vue', 'my-components']
  },
  resolve: {
    // 强制使用单一版本，避免多实例问题，确保主题系统正常工作
    dedupe: ['vue', 'naive-ui'],
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
```

### 4. 组件开发环境

#### 4.1 开发入口配置
```typescript
// src/dev/main.ts
import { createApp } from 'vue';
import naive from 'naive-ui';
import router from './router';
import App from './App.vue';
import Components from '../components';

const app = createApp(App);
app.use(naive);
app.use(router);
app.use(Components);
app.mount('#app');
```

#### 4.2 测试页面
```vue
<!-- src/dev/App.vue -->
<template>
  <div>
    <h1>组件测试页面</h1>
    <my-button>测试按钮</my-button>
  </div>
</template>
```

### 5.项目中添加类型
```typescript
// src/vite-env.d.ts
declare module 'my-components' {
  import type { App } from 'vue'
  
  const plugin: {
    install: (app: App) => void;
  };
  
  export default plugin;
}
```

### 6. 修改组件前缀
```typescript
// src/config/index.ts
export const defaultConfig: ComponentsConfig = {
  prefix: 'My', // 默认 My 前缀
  nameStyle: 'pascal', // 默认 pascal 命名风格
};
```

## 三、组件库开发与调试

### 1. 组件库独立开发调试

#### 1.1 启动开发服务
```bash
# 组件库目录
cd my-components
npm run dev
```

### 2. 在项目中开发调试（npm link）

#### 2.1 创建链接
```bash
# 组件库目录
"link": "npm link && npm link vue naive-ui", # 将组件库链接到主项目的 Vue 和 NaiveUI 实例，避免多实例问题
"unlink": "npm rm --global my-components",

# 主项目目录
"link": "npm link my-components", # 将主项目链接到组件库
"unlink": "npm unlink my-components"
```

#### 2.2 启动开发服务
```bash
# 终端1：组件库
cd my-components
npm run dev

# 终端2：主项目
cd my-project
npm run dev
```

### 3. 发布前可以在本地测试 组件库 dist 包（使用 file: 协议）

#### 3.1 配置依赖
```json
// my-project/package.json
{
  "dependencies": {
    "my-components": "file:../my-components/dist"
  }
}
```

#### 3.2 安装依赖
```bash
npm install
```

### 4. 发布和使用
#### 4.1 发布
```bash
# 1. 更新版本号
npm version patch/minor/major

# 2. 创建 tag
git tag v1.0.1

# 3. 推送到远程
git push origin main --tags
```

### 4.2 使用
<!-- 主项目中配置快捷指令 -->
```json
"file": "npm install file:../my-components/dist",        // 从本地文件安装

// （Git URL）
"gitUrlBranch": "npm install github:Maxiaochuan123/my-components#main",  // 从 GitHub main 分支安装
"gitUrlTag": "npm install github:Maxiaochuan123/my-components#v1.0.0"    // 从 GitHub v1.0.0 标签安装
```
#### 测试环境
```json
{
  "dependencies": {
    // 指定分支
    "my-components": "git+https://github.com/username/my-components.git#main"
  }
}
```

#### 生产环境
```json
{
  "dependencies": {
    // 指定 tag
    "my-components": "git+https://github.com/username/my-components.git#v1.0.0"
  }
}
```

#### 更新组件库
```bash
# 更新到最新版本
npm update my-components

# 更新到特定版本
npm install my-components@git+https://github.com/username/my-components.git#v1.0.1
```

**最佳实践**：
1. 开发初期：使用 `npm link` 进行快速迭代
2. 发布前测试：使用 `file:` 协议验证构建结果
3. 确认无误后：提交到 GitHub 并使用 Git URL

## 四、常见问题

### 1. 多实例问题
Q: 为什么要执行 npm link vue naive-ui？直接 npm link 不行吗？

A: 这涉及到 Vue 的多实例问题：
- 直接使用 `npm link` 时，组件库会使用自己 `node_modules` 中的 Vue 和 NaiveUI
- 主项目也有自己的 Vue 和 NaiveUI
- 这会导致同时存在两个 Vue 实例和两个 NaiveUI 实例
- 可能导致：
  - 组件通信失效
  - 响应式失效
  - hooks 不正常工作
  - 类型检查错误

所以当与主项目配合开发时，需要 `npm link vue naive-ui` 来确保组件库使用主项目的 Vue 和 NaiveUI 实例。

B: resolve.dedupe 配置
- 强制使用单一版本：确保项目中只使用一个版本的 Vue 和 Naive UI
- 为什么需要？
  1. 避免多实例问题：如果存在多个 Vue 实例，会导致：
     - 组件通信失效
     - 响应式系统异常
     - hooks 不正常工作
  2. 确保 Naive UI 的主题和样式正常工作
  3. 减小最终构建体积

这两个配置的组合使用可以：
1. 提高开发体验（更快的启动和热更新）
2. 避免常见的依赖问题（多实例、版本冲突）
3. 确保组件库正常工作

这对于使用 Git Dependencies 方式引入组件库的项目特别重要，因为：
1. 我们使用了 Git Dependencies 方式引入组件库
2. 组件库依赖于 Vue 和 Naive UI
3. 主项目也使用了相同的依赖

所以这些配置帮助我们维持一个稳定和高效的开发环境。

### 2. 组件库和主项目使用相同的 UI 框架（如 NaiveUI）会有冲突吗？

A: 这是一个常见的问题，通过合理配置可以避免冲突：

1. 在组件库中将 UI 框架设置为 peerDependency：
```json
{
  // 告诉主项目必须提供这些依赖（组件库打包后是以项目的 vue 和 naive-ui 为依赖）
  "peerDependencies": {
    "naive-ui": "^2.x",
    "vue": "^3.x"
  },
  // 开发时需要安装的依赖
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
      // 告诉打包工具，vue 和 naive-ui 是外部依赖，不要打包进组件库
      external: ['vue', 'naive-ui']
    }
  }
})
```

### 2. 类型声明问题
Q: 如何处理组件库的类型声明？

A: 我们采用两种方式结合：
1. 开发时：使用 `vite-env.d.ts` 提供基础类型支持
2. 发布时：使用 `vite-plugin-dts` 生成完整类型声明

B: 为什么我要在主项目中配置类型声明？我们在组件库中不是已经配置了 dts 吗？
- 组件库的 dts 配置
  - 是的，组件库中的 vite-plugin-dts 确实会生成类型声明文件
  - 但这些类型声明文件是在构建后生成在 dist/types 目录中的
  - 这些类型声明是为了发布后（使用 Git URL 安装时）使用的
- 为什么还需要在主项目中声明类型
  - 当我们使用 npm link 进行本地开发时，我们直接使用的是组件库的源码（src/components/index.ts）
  - 这时候还没有生成 dist/types 目录
  - TypeScript 需要知道 my-components 这个模块的基本结构

### 3. 样式覆盖问题
Q: 主项目如何覆盖组件库样式？

A: 两种方式：
1. 使用 NaiveUI 的主题系统
2. 使用全局 CSS 覆盖
组件库将会应用主项目的全局主题，或全局 CSS 覆盖组件库的样式，以支持定制化（一般不建议修改 NaiveUI 的组件全局样式，因为 NaiveUI 的样式已经是具有设计风格也很完善了，应该保持一致性）

### 4. 安装包是否会冲突问题
Q: file，gitUrlBranch，gitUrlTag 都执行了，那会不会冲突呢？

A: 不会冲突
1. 因为它们是并存的，file 模式是直接安装组件库的源码，gitUrlBranch 和 gitUrlTag 是安装组件库的 dist 包
2. 不会冲突，但会相互覆盖。因为这三个命令本质上都是在安装同一个包 my-components，只是来源不同
```json
{
  "scripts": {
    "file": "npm install file:../my-components/dist",        // 从本地文件安装
    "gitUrlBranch": "npm install github:Maxiaochuan123/my-components#main",  // 从 GitHub main 分支安装
    "gitUrlTag": "npm install github:Maxiaochuan123/my-components#v1.0.0"    // 从 GitHub v1.0.0 标签安装
  }
}
```
3. 每次执行新的安装命令都会
- 先卸载已安装的 my-components
- 然后安装新指定的版本


### 5. 构建优化问题
Q: 为什么需要 optimizeDeps 和 resolve 配置？

A: 这些配置用于：
1. `naive-ui`：是一个大型 UI 库，预构建可以提高开发服务器的启动速度和热更新性能
2. `vue`：作为框架核心，预构建可以确保使用正确的版本，避免多实例问题
3. `my-components`：我们的组件库，预构建可以确保它与其他依赖的兼容性