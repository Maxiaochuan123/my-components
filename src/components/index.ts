import type { App } from 'vue';
import type { Component } from 'vue';
import naive from 'naive-ui';
// import type { ComponentsConfig } from './config';
// import config, { type ComponentsConfig } from './config';

interface ComponentModule {
  default: Component;
}

export interface ComponentsConfig {
  /** 组件前缀 */
  prefix: string;
  /** 组件命名风格 pascal:MyButton camel:myButton kebab:my-button */
  nameStyle: 'pascal' | 'camel' | 'kebab';
}

export const defaultConfig: ComponentsConfig = {
  prefix: 'My', // 默认 My 前缀
  nameStyle: 'pascal', // 默认 pascal 命名风格
};

// 自动导入所有组件
const componentModules = import.meta.glob<ComponentModule>('./*/index.vue', {
  eager: true,
});

// 从路径中提取组件名
const getComponents = (options: Partial<ComponentsConfig> = {}) => {
  const finalConfig = { ...defaultConfig, ...options };
  const { prefix, nameStyle } = finalConfig;

  const formatName = (name: string) => {
    switch (nameStyle) {
      case 'camel':
        return name.charAt(0).toLowerCase() + name.slice(1);
      case 'kebab':
        return name.replace(/([A-Z])/g, '-$1').toLowerCase();
      case 'pascal':
      default:
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const components = Object.entries(componentModules).reduce(
    (acc, [path, module]) => {
      // 从路径中提取组件名 (例如 './Button/index.vue' -> 'Button')
      const name = path.match(/\.\/(.+)\/index\.vue/)?.[1];
      if (name) {
        const formattedName = formatName(name);
        const prefixedName = `${prefix}${formattedName}` as string;
        acc[prefixedName] = module.default;
      }
      return acc;
    },
    {} as Record<string, Component>,
  );

  return components;
};

// 导出 Vue 插件
export default {
  install(app: App, options: Partial<ComponentsConfig> = {}) {
    // 确保先注册 naive-ui
    if (!app.config.globalProperties.$naive) {
      app.use(naive);
    }

    const components = getComponents(options);
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};
