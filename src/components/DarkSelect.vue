<template>
  <select class="select-dark" @change="$emit('update:modelValue', $event.target.value)">
    <slot></slot>
  </select>
  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
  </div>
</template>

<script setup>
export default {
  props: {
    modelValue: {
      type: String,
      require: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style>

</style>