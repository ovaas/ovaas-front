<template>
  <main :class="$attrs.class ? $attrs.class : 'w-5/6'" class="flex flex-col items-start min-h-full mx-auto px-4 py-10 text-white relative">
    <h1 class="text-4xl font-bold pb-6">
      {{ title }}
    </h1>
    <Icon v-if="backBtn" class="absolute transform -translate-x-12 translate-y-1 iconify mb-1 hover:text-gray-300" icon="bx:bx-left-arrow-circle" :size="2" @click="$router.go(-1)" />
    <slot></slot>
  </main>
</template>

<script setup="props">
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    backBtn: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>

</style>