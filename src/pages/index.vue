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
import handWriteOCRImage from '/~/assets/handwriting-ocr.jpg'

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
      title: t('demos.hand-write-ocr.title'),
      image: handWriteOCRImage,
      content: t('demos.hand-write-ocr.content'),
      path: '/demo/hand-write-ocr'
    }
  ]})
</script>

<style>
</style>