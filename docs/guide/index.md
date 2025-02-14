# 介绍

My Components 是一个基于 Vue 3 和 Naive UI 的组件库，提供了一系列常用的 UI 组件。

## 特性

- 🚀 基于 Vue 3 和 TypeScript 开发
- 📦 开箱即用的高质量组件
- 🎨 继承 Naive UI 的主题系统
- 📝 详细的文档和示例
- 🔧 支持按需引入
- 🎯 TypeScript 类型支持

## 安装

```bash
npm install my-components
```

## 快速开始

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