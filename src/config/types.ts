export interface ComponentsConfig {
  /** 组件前缀 */
  prefix: string
  /** 组件命名风格 pascal:MyButton camel:myButton kebab:my-button */
  nameStyle: 'pascal' | 'camel' | 'kebab'
} 