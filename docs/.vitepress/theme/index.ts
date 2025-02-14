import DefaultTheme from 'vitepress/theme'
import naive from 'naive-ui'
import Components from '../../../src/components'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(naive)
    app.use(Components)
  }
} 