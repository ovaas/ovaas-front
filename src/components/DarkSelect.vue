<template>
  <div class="relative text-white">
    <Icon class="absolute inset-y-0 left-0 iconify ml-2 flex items-center" icon="carbon:language" :size="1.2" />
    <select class="select-dark" @change="emit('update:modelValue', $event.target.value)">
      <slot />
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
})

const emit = defineEmit(['update:modelValue'])
</script>

<style>

</style>
