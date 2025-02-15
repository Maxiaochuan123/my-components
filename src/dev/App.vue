<template>
  <n-layout has-sider>
    <!-- 侧边栏 -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :native-scrollbar="false"
      class="layout-sider"
    >
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <!-- 主内容区 -->
    <n-layout>
      <n-layout-header bordered class="layout-header">
        <div class="header-content">
          <h2>My Components</h2>
        </div>
      </n-layout-header>

      <n-layout-content class="layout-content">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const router = useRouter()
const activeKey = ref<string>('button')

// 菜单配置
const menuOptions: MenuOption[] = [
  {
    label: '通用组件',
    key: 'common',
    children: [
      {
        label: 'Button 按钮',
        key: 'button'
      },
      {
        label: 'Button 按钮2',
        key: 'button2'
      }
      // 其他组件菜单项
    ]
  }
]

// 菜单点击处理
const handleMenuClick = (key: string) => {
  activeKey.value = key
  router.push(`/${key}`)
}
</script>

<style scoped>
.layout-sider {
  height: 100vh;
}

.layout-header {
  height: 64px;
  padding: 0 24px;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
}

.layout-content {
  padding: 24px;
  background: #f5f5f5;
  min-height: calc(100vh - 64px);
}
</style>
