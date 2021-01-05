<template>
  <MainContant :title="t('pages-title.home')">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5">
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
import humanPoseImg from '/~/assets/images/human-pose-estimation.webp'
import handWritingImg from '/~/assets/images/handwriting-ocr.webp'
import drawColorsImg from '/~/assets/images/draw-colors.webp'

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
        image: humanPoseImg,
        content: t('demos.human-pose.content'),
        path: '/demo/human-pose-estimation',
      },
      {
        title: t('demos.hand-write-ocr.title'),
        image: handWritingImg,
        content: t('demos.hand-write-ocr.content'),
        path: '/demo/hand-write-ocr',
      },
      {
        title: t('demos.draw-colors.title'),
        image: drawColorsImg,
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
