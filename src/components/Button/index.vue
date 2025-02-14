<template>
  <n-button
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </n-button>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'

interface Props {
  /** 按钮文本 */
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: '默认按钮'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script> 