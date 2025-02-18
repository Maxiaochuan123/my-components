import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { writeFileSync } from 'fs';

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
      formats: ['es'],
    },
    rollupOptions: {
      // 告诉打包工具，vue 和 naive-ui 是外部依赖，不要打包进组件库
      external: ['vue', 'naive-ui'],
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
    },
  },
  // 预构建 naive-ui 和 vue，提高开发服务器性能，确保依赖版本一致性
  optimizeDeps: {
    include: ['naive-ui', 'vue']
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
