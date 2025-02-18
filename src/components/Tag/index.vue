<template>
  <n-tag
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </n-tag>
</template>

<script setup lang="ts">
interface Props {
  /** 按钮文本 */
  text?: string;
}

withDefaults(defineProps<Props>(), {
  text: '默认标签',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script> 