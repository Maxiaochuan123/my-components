<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// 组件已全局注册，无需导入
console.log('App.vue');
</script>

<style>
.app {
  min-height: 100vh;
  background: #fff;
}
</style>
