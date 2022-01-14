<script setup lang="ts">
  const props = defineProps<{
    to?: string,
  }>()

  const emit = defineEmits<{
    (e: 'click'): void
  }>()
</script>

<template>
  <button @click="emit('click')">
    <slot />
  </button>
</template>
<style lang="">

</style>
