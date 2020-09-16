<template>
  <div class="w-full h-full p-4 flex flex-col bg-white bg-opacity-15 rounded-lg" @click="$router.push(demo.path)">
    <div class="rounded-lg overflow-hidden h-40 w-full">
      <img
        :src="demo.image"
        alt="human-pose-estimation"
        class="object-cover w-full h-full"
      >
    </div>
    <div class="text-left px-2 w-full">
      <h2 class="text-xl font-medium pt-4">
        {{ demo.title }}
      </h2>
      <p class="mt-1">
        {{ demo.content }}
      </p>
    </div>
  </div>
</template>

<script setup="props">
import { ref } from "vue";
export default {
  props: {
    demo: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>
  p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>