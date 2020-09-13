<template>
  <MainContant title="Demos">
    <div class="grid grid-cols-4 gap-4">
      <DemoCard
        v-for="demo in demos"
        :key="demo.path"
        :demo="demo"
      />
    </div>
  </MainContant>
</template>

<script setup>
import { reactive } from 'vue'
export const demos = reactive([
  {
    title: 'Human pose estimation',
    image: '/~/assets/human-pose-estimation-0001.png',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
    path: '/demo/human-pose-estimation'
  },
  {
    title: 'Human pose estimation',
    image: '/~/assets/human-pose-estimation-0001.png',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
    path: '/demo/human-pose-estimation'
  },
  {
    title: 'Human pose estimation',
    image: '/~/assets/human-pose-estimation-0001.png',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
    path: '/demo/human-pose-estimation'
  },
  {
    title: 'Human pose estimation',
    image: '/~/assets/human-pose-estimation-0001.png',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
    path: '/demo/human-pose-estimation'
  },
  {
    title: 'Human pose estimation',
    image: '/~/assets/human-pose-estimation-0001.png',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
    path: '/demo/human-pose-estimation'
  }
])
</script>

<style>
</style>