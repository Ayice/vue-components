<script setup lang="ts">
const props = defineProps<{
  modelValue: string,
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
<input
  :value="modelValue"
  @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />


</template>
