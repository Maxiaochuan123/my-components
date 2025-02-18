import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import fs from 'fs';

interface PackageJson {
  name: string;
  version: string;
  type: string;
  main: string;
  module: string;
  types: string;
  files: string[];
  scripts: Record<string, string>;
  peerDependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// 读取和写入 package.json
const packageJsonPath = './package.json';
const readPackageJson = (): PackageJson => JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const writePackageJson = (content: PackageJson): void => {
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n');
};

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
    // 自动修改 package.json 路径的插件
    {
      name: 'modify-package-json',
      buildStart() {
        // 构建开始前：修改为 dist 路径
        const pkg = readPackageJson();
        const distPkg = {
          ...pkg,
          main: './dist/my-components.js',
          module: './dist/my-components.js',
          types: './dist/types/index.d.ts'
        };
        writePackageJson(distPkg);
      },
      closeBundle() {
        // 构建结束后：改回 src 路径
        const pkg = readPackageJson();
        const srcPkg = {
          ...pkg,
          main: 'src/components/index.ts',
          module: 'src/components/index.ts',
          types: 'src/vite-env.d.ts'
        };
        writePackageJson(srcPkg);
      }
    }
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
      external: ['vue', 'naive-ui']
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
