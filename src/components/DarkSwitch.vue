<template>
  <button class="h-full px-3 text-white cursor-pointer focus:outline-none md:px-5" @click="isDark = !isDark">
    <bx-bx-moon v-if="isDark" class="text-2xl" />
    <bx-bx-sun v-else class="text-2xl" />
  </button>
</template>

<script setup lang="ts">
import { isDark } from '/~/logics'
</script>
