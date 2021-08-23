<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import HumanPoseImg from '@/assets/images/human-pose-estimation.webp'
import HandWritingImg from '@/assets/images/handwriting-ocr.webp'
import DrawColorsImg from '@/assets/images/draw-colors.webp'
import MonoDepthImg from '@/assets/images/mono-depth.webp'
import ObjectDetectionImg from '@/assets/images/object-detection.webp'
import SegmentationImg from '@/assets/images/segmentation.webp'
import SuperResolutionImg from '@/assets/images/super_resolution.webp'
import ObjectDetectionYoloImg from '@/assets/images/object-detection-yolo.webp'
import type { Demo } from '@/types'
import { generateHeadMeta } from '@/logics/meta'

const { t } = useI18n()

const siteData = reactive({
  title: 'OVaaS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})

useHead(generateHeadMeta(siteData))

const demos = computed<Demo[]>(() => ([
  {
    title: t('demos.human-pose.title'),
    image: HumanPoseImg,
    content: t('demos.human-pose.content'),
    path: '/demo/human-pose-estimation',
  },
  {
    title: t('demos.handwritten-ocr.title'),
    image: HandWritingImg,
    content: t('demos.handwritten-ocr.content'),
    path: '/demo/handwritten-ocr',
  },
  {
    title: t('demos.draw-colors.title'),
    image: DrawColorsImg,
    content: t('demos.draw-colors.content'),
    path: '/demo/draw-colors',
  },
  {
    title: t('demos.mono-depth.title'),
    image: MonoDepthImg,
    content: t('demos.mono-depth.content'),
    path: '/demo/mono-depth',
  },
  {
    title: t('demos.object-detection.title'),
    image: ObjectDetectionImg,
    content: t('demos.object-detection.content'),
    path: '/demo/object-detection',
  },
  {
    title: t('demos.segmentation.title'),
    image: SegmentationImg,
    content: t('demos.segmentation.content'),
    path: '/demo/segmentation',
  },
  {
    title: t('demos.super-resolution.title'),
    image: SuperResolutionImg,
    content: t('demos.super-resolution.content'),
    path: '/demo/super-resolution',
  },
  {
    title: t('demos.object-detection-yolo.title'),
    image: ObjectDetectionYoloImg,
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
