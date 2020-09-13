<template>
  <div class="w-full h-full p-4 bg-white bg-opacity-15 rounded-lg" @click="$router.push(demo.path)">
    <div class="rounded-lg overflow-hidden h-3/5 w-full">
      <img
        :src="demo.image"
        alt="human-pose-estimation"
        class="object-cover w-full h-full"
      >
    </div>
    <div class="h-2/5 text-left p-2">
      <h2 class="text-xl font-medium pt-2">
        {{ demo.title }}
      </h2>
      <p class="mt-1 w-full">
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