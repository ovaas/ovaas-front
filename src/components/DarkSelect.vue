<template>
  <div class="relative text-white hover:text-gray-200">
    <div class="absolute top-0 left-0 ml-2 h-full flex items-center">
      <carbon-language />
    </div>
    <select
      class="block appearance-none w-full bg-gray-700 pl-10 pr-8 py-2 rounded leading-tight focus:outline-none basic-transition dark:bg-gray-800 focus:ring-2"
      @change="emit('update:modelValue', $event.target.value)"
    >
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
