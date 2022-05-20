<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex justify-between mb-8">
    <h1 class="text-4xl font-bold">
      {{ title }}
    </h1>
    <div class="flex-shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
