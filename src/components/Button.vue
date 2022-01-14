<script setup lang="ts">
import { computed } from 'vue'
import { ToProp } from '@/types'

interface Props {
  disabled?: boolean
  color?: string
  variantType?: string
  size?: string
  icon?: boolean
  type?: string
  to?: ToProp
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  icon: false,
  type: '',
  color: 'primary',
  to: undefined,
  variantType: 'normal',
  loading: false
})

const emit = defineEmits<{
  (e: 'click', event: Event): void
}>()

const componentName = computed(() => {
  if (props.to) {
    return 'router-link'
  }

  return 'button'
})

const buttonClass = computed(() => {
  return {
    'base-spinner': props.loading,
    'cursor-not-allowed': props.disabled
  }
})

const buttonSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-4 py-2'
    case 'lg':
      return 'text-base px-6 py-3'
    case 'md':
    default:
      return 'text-base px-4 py-2'
  }
})

const colorVariants = computed(() => {
  if (props.disabled) {
    if (props.icon) {
      return 'border-0 shadow-none hover:shadow-md focus:shadow-none active:shadow-none'
    }
    return 'border-0 bg-gray-300 shadow-none hover:shadow-none'
  }
  switch (props.color) {
    case 'primary':
      switch (props.variantType) {
        case 'normal':
          if (props.disabled) {
            return 'border-blue-300 bg-blue-300 text-white hover:shadow-0'
          }
          return 'border-blue-600 bg-blue-600 hover:bg-blue-700 hover:border-blue-700 text-white'
        default:
          return ''
      }
    case 'danger':
      switch (props.variantType) {
        case 'normal':
          if (props.disabled) {
            return 'border-red-300 bg-red-300 text-white'
          }
          return 'border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white'
        default:
          return ''
      }
    case 'warning':
      switch (props.variantType) {
        case 'normal':
          return 'border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white'
        default:
          return ''
      }
    case 'success':
      return 'border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white'
    case 'text':
      return 'bg-transparent shadow-none border-0 py-1 flex items-center'
    case 'white':
    default:
      return 'border-white bg-white text-blue-600 hover:text-blue-800'
  }
})

const onClick = (e: Event) => {
  if (props.disabled || props.loading) {
    e.preventDefault()
    e.stopPropagation()

    return
  }

  emit('click', e)
}
</script>

<template>
  <component
    :is="componentName"
    :type="type"
    :disabled="disabled || loading"
    :class="[
      buttonClass,
      colorVariants,
      buttonSize,
      'rounded-md ripple-container'
    ]"
    :to="to"
    v-bind="$attrs"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<style>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}
</style>
