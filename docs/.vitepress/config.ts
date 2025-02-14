import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  title: 'My Components',
  description: '基于 Vue 3 + NaiveUI 的组件库',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    },
    optimizeDeps: {
      include: ['vue', 'naive-ui']
    }
  },
  themeConfig: {
    logo: '/logo.svg',
    
    // 导航栏
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Maxiaochuan123/my-components' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' }
          ]
        }
      ]
    },

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Your Name'
    }
  }
}); 