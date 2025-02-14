# My Components

基于 Vue 3 + NaiveUI 的组件库

## 安装

```bash
npm install my-components
```

## 使用

### 全局注册

```ts
import { createApp } from 'vue'
import naive from 'naive-ui'
import MyComponents from 'my-components'
import App from './App.vue'

const app = createApp(App)
app.use(naive)
app.use(MyComponents)
app.mount('#app')
```

### 按钮组件

基础用法：
```vue
<template>
  <my-button>默认按钮</my-button>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="warning">警告按钮</my-button>
  <my-button type="error">错误按钮</my-button>
</template>
```

支持所有 NaiveUI Button 的属性：
- type: 按钮类型
- size: 按钮大小
- disabled: 是否禁用
- 等等...

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build

# 本地调试
npm run link
```
