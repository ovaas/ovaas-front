<template>
  <main :class="$attrs.class ? $attrs.class : 'w-5/6'" class="flex flex-col items-start min-h-full mx-auto px-4 py-10 text-white">
    <div class="text-4xl font-bold pb-6 relative">
      <h1>{{ title }}</h1>
      <div class="absolute top-0 transform -translate-x-12 translate-y-2 hover:text-gray-300">
        <Icon v-if="backBtn" class="iconify mb-1　cursor-pointer" icon="bx:bx-left-arrow-circle" :size="1" @click="$router.go(-1)" />
      </div>
    </div>
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