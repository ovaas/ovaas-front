<template>
  <MainContant :title="t('pages-title.home')">
    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4">
      <DemoCard
        v-for="demo in demos"
        :key="demo.path"
        :demo="demo"
      />
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import humanPoseImage from '/~/assets/human-pose-estimation-0001.png'
import handWriteOCRImage from '/~/assets/handwriting-ocr.jpg'
import drawColorsImage from '/~/assets/draw-colors.jpeg'

interface Demo {
  title: string
  image: string
  content: string
  path: string
}

const { t, locale } = useI18n()
const demos = ref<Demo[]>()

watch(
  locale,
  () => {
    demos.value = [
      {
        title: t('demos.human-pose.title'),
        image: humanPoseImage,
        content: t('demos.human-pose.content'),
        path: '/demo/human-pose-estimation',
      },
      {
        title: t('demos.hand-write-ocr.title'),
        image: handWriteOCRImage,
        content: t('demos.hand-write-ocr.content'),
        path: '/demo/hand-write-ocr',
      },
      {
        title: t('demos.draw-colors.title'),
        image: drawColorsImage,
        content: t('demos.draw-colors.content'),
        path: '/demo/draw-colors',
      },
    ]
  },
  { immediate: true },
)
</script>

<style>
</style>
