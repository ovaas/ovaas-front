<template>
  <MainContant :title="t('pages-title.home')">
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
import { ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import humanPoseImage from '/~/assets/human-pose-estimation-0001.png'

const { t } = useI18n()
export { t }

export const demos = ref([])

watchEffect(() => {
  demos.value = [
    {
      title: t('demos.human-pose.title'),
      image: humanPoseImage,
      content: t('demos.human-pose.content'),
      path: '/demo/human-pose-estimation'
    },
    {
      title: 'Human pose estimation',
      image: humanPoseImage,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
      path: '/demo/human-pose-estimation'
    },
    {
      title: 'Human pose estimation',
      image: humanPoseImage,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
      path: '/demo/human-pose-estimation'
    },
    {
      title: 'Human pose estimation',
      image: humanPoseImage,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
      path: '/demo/human-pose-estimation'
    },
    {
      title: 'Human pose estimation',
      image: humanPoseImage,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore autem, voluptatem distinctio deleniti cumque accusamus deserunt officiis ducimus minima consequuntur dicta laboriosam modi incidunt, natus architecto iste tempora sit eligendi.',
      path: '/demo/human-pose-estimation'
    }
  ]})
</script>

<style>
</style>