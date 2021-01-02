<template>
  <main :class="$attrs.class ? $attrs.class : 'w-5/6'" class="flex flex-col items-start min-h-full px-4 pt-10 mx-auto pb-14">
    <div class="relative mb-8 text-4xl font-bold">
      <h1>{{ title }}</h1>
      <div v-if="backBtn" class="absolute top-0 inline-flex items-center h-full transform -translate-x-12 hover:text-gray-500 dark:hover:text-gray-300">
        <button class="focus:outline-none" aria-label="Back" @click="router.push('/')">
          <bx-bx-left-arrow-circle />
        </button>
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
