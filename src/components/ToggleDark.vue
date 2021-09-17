<script setup lang="ts">
import { isDark, toggleDark } from '@/logics'
</script>

<template>
  <button class="p-2 text-white cursor-pointer focus:outline-none" @click="toggleDark()">
    <bx-bx-moon v-if="isDark" class="text-2xl" />
    <bx-bx-sun v-else class="text-2xl" />
  </button>
</template>
