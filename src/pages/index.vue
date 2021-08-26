<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { generateHeadMeta } from '@/logics/meta'

import type { Demo } from '@/types'

const { t } = useI18n()

const siteData = reactive({
  title: 'OVaaS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})

useHead(generateHeadMeta(siteData))

const demos = computed<Demo[]>(() => ([
  {
    title: t('demos.human-pose.title'),
    image: '/images/human-pose-estimation.webp',
    content: t('demos.human-pose.content'),
    path: '/demo/human-pose-estimation',
  },
  {
    title: t('demos.handwritten-ocr.title'),
    image: '/images/handwriting-ocr.webp',
    content: t('demos.handwritten-ocr.content'),
    path: '/demo/handwritten-ocr',
  },
  {
    title: t('demos.draw-colors.title'),
    image: '/images/draw-colors.webp',
    content: t('demos.draw-colors.content'),
    path: '/demo/draw-colors',
  },
  {
    title: t('demos.face-age.title'),
    image: '/images/face-age.webp',
    content: t('demos.face-age.content'),
    path: '/demo/face-age',
  },
  {
    title: t('demos.mono-depth.title'),
    image: '/images/mono-depth.webp',
    content: t('demos.mono-depth.content'),
    path: '/demo/mono-depth',
  },
  {
    title: t('demos.object-detection.title'),
    image: '/images/object-detection.webp',
    content: t('demos.object-detection.content'),
    path: '/demo/object-detection',
  },
  {
    title: t('demos.segmentation.title'),
    image: '/images/segmentation.webp',
    content: t('demos.segmentation.content'),
    path: '/demo/segmentation',
  },
  {
    title: t('demos.super-resolution.title'),
    image: '/images/super_resolution.webp',
    content: t('demos.super-resolution.content'),
    path: '/demo/super-resolution',
  },
  {
    title: t('demos.object-detection-yolo.title'),
    image: '/images/object-detection-yolo.webp',
    content: t('demos.object-detection-yolo.content'),
    path: '/demo/object-detection-yolo',
  },
]))
</script>

<template>
  <MainContent :title="t('pages-title.home')" layout="home">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DemoCard
        v-for="demo in demos"
        :key="demo.path"
        :demo="demo"
      />
    </div>
  </MainContent>
</template>
