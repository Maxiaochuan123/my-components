import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 生成类型声明文件
    dts({
      include: ['src/components/**/*.{ts,tsx,vue}'],
      exclude: ['src/dev/**/*'],
      outDir: 'dist/types',
    }),
  ],
  build: {
    // 库模式配置，指定入口文件和输出格式
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MyComponents',
      fileName: 'my-components',
    },
    rollupOptions: {
      // 告诉打包工具，vue 和 naive-ui 是外部依赖，不要打包进组件库
      external: ['vue', 'naive-ui']
    }
  },
  // 预构建 naive-ui 和 vue，提高开发服务器性能，确保依赖版本一致性
  optimizeDeps: {
    include: ['naive-ui', 'vue', 'my-components']
  },
  // 设置入口文件
  resolve: {
    // 强制使用单一版本，避免多实例问题，确保主题系统正常工作
    dedupe: ['vue', 'naive-ui'],
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
