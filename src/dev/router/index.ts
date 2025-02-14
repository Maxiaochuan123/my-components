import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/button/index.vue'),
  },
  // 其他组件路由可以按需添加
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 