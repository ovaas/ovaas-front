<template>
  <button class="focus:outline-none cursor-pointer px-3 md:px-5 text-white h-full" @click="isDark = !isDark">
    <bx-bx-moon v-if="isDark" class="text-2xl" />
    <bx-bx-sun v-else class="text-2xl" />
  </button>
</template>

<script setup lang="ts">
import { isDark } from '/~/logics'
</script>
