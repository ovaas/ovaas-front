<script setup lang="ts">
import { isDark } from '#imports'
const toggleDark = useToggle(isDark)
</script>

<template>
  <button class="p-2 text-white cursor-pointer focus:outline-none" @click="toggleDark()">
    <UnoIcon v-if="isDark" i-bx-bx-moon class="text-2xl" />
    <UnoIcon v-else i-bx-bx-sun class="text-2xl" />
  </button>
</template>
