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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import HumanPoseImg from '/~/assets/images/human-pose-estimation.webp'
import HandWritingImg from '/~/assets/images/handwriting-ocr.webp'
import DrawColorsImg from '/~/assets/images/draw-colors.webp'

interface Demo {
  title: string
  image: string
  content: string
  path: string
}

const { t } = useI18n()
const demos = computed<Demo[]>(() => ([
  {
    title: t('demos.human-pose.title'),
    image: HumanPoseImg,
    content: t('demos.human-pose.content'),
    path: '/demo/human-pose-estimation',
  },
  {
    title: t('demos.hand-write-ocr.title'),
    image: HandWritingImg,
    content: t('demos.hand-write-ocr.content'),
    path: '/demo/hand-write-ocr',
  },
  {
    title: t('demos.draw-colors.title'),
    image: DrawColorsImg,
    content: t('demos.draw-colors.content'),
    path: '/demo/draw-colors',
  },
]))
</script>

<style>
</style>
