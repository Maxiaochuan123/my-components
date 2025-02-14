<template>
  <div class="component-page">
    <n-card title="基础用法">
      <div class="demo-block">
        <my-button>默认按钮</my-button>
        <my-button type="primary">主要按钮</my-button>
        <my-button type="info">信息按钮</my-button>
        <my-button type="success">成功按钮</my-button>
        <my-button type="warning">警告按钮</my-button>
        <my-button type="error">错误按钮</my-button>
      </div>
    </n-card>

    <n-card title="不同尺寸" class="mt-4">
      <div class="demo-block">
        <my-button size="tiny">超小按钮</my-button>
        <my-button size="small">小按钮</my-button>
        <my-button size="medium">中等按钮</my-button>
        <my-button size="large">大按钮</my-button>
      </div>
    </n-card>

    <n-card title="禁用状态" class="mt-4">
      <div class="demo-block">
        <my-button disabled>禁用按钮</my-button>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
</script>

<style scoped>
.component-page {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-block {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.mt-4 {
  margin-top: 16px;
}
</style> 