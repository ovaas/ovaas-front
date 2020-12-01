<template>
  <main :class="$attrs.class ? $attrs.class : 'w-5/6'" class="flex flex-col items-start min-h-full mx-auto px-4 py-10">
    <div class="text-4xl font-bold pb-8 relative">
      <h1>{{ title }}</h1>
      <div v-if="backBtn" class="absolute top-0 transform -translate-x-12 hover:text-gray-500 dark:hover:text-gray-300">
        <Icon class="iconify cursor-pointer" icon="bx:bx-left-arrow-circle" :size="1" @click="router.back()" />
      </div>
    </div>
    <slot />
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  backBtn: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
</script>

<style>

</style>
