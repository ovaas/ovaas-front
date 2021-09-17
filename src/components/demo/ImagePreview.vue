<script setup lang="ts">
defineProps<{ image: string }>()
</script>

<template>
  <div class="relative flex-1 overflow-hidden bg-light-100 border-2 border-light-700 rounded-2xl dark:(bg-dark-800 border-dark-200)">
    <ImageShare v-if="image !== ''" :image="image" />
    <img v-if="image !== ''" :src="image" alt="" class="absolute z-10 object-contain w-full h-full">
  </div>
</template>
