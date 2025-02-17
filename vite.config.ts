import { defineConfig } from 'vite';
import { writeFileSync } from 'fs';
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
      outDir: 'dist',
    })
  ],
  build: {
    // 库模式配置，指定入口文件和输出格式
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'MyComponents',
      // fileName: (format) => `components/index.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      // 告诉打包工具，vue 和 naive-ui 是外部依赖，不要打包进组件库
      external: ['vue', 'naive-ui'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        dir: 'dist',
        // 在这里添加 hooks
        plugins: [{
          name: 'generate-package-json',
          generateBundle() {
            const pkg = require('./package.json');
            const distPkg = {
              name: pkg.name,
              version: pkg.version,
              type: pkg.type,
              module: './components/index.js',
              types: './components/index.d.ts',
              exports: {
                ".": {
                  "types": "./components/index.d.ts",
                  "import": "./components/index.js"
                }
              },
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
