<template>
  <div class="flex flex-col justify-center items-center w-14 h-14 bg-white rounded-lg bg-opacity-0 text-white hover:text-black hover:bg-opacity-100">
    <Icon class="iconify mb-1" :icon="icon" />
    <p class="text-xs font-bold">
      {{ text }}
    </p>
  </div>
</template>

<script setup="props">
export default {
  props: {
    isActive: {
      type: Boolean
    },
    text: {
      type: String,
      default: "Home"
    },
    icon: {
      type: String,
      require: true,
      default: 'bx:bx-home'
    }
  }
}
</script>

<style>
</style>