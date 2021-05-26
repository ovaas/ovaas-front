<template>
  <MainContent :title="t('demos.handwritten-ocr.title')" :back-btn="true">
    <div class="relative flex flex-col items-stretch flex-auto w-full h-full">
      <div class="inline-flex items-center justify-end mb-3 space-x-4 text-gray-600 md:(absolute top-0 right-0 transform -translate-y-14) text-md">
        <RoundedFullBtn aria-label="Undo" :is-disable="disableUndo || disableAllBtn" @click="undo()">
          <bx-bx-undo class="text-2xl" />
        </RoundedFullBtn>
        <RoundedFullBtn aria-label="Redo" :is-disable="disableRedo || disableAllBtn" @click="redo()">
          <bx-bx-redo class="text-2xl" />
        </RoundedFullBtn>
        <RoundedFullBtn aria-label="Clear" :is-disable="disableUndo && disableRedo || disableAllBtn" @click="clearAll()">
          <bx-bx-trash class="text-2xl" />
        </RoundedFullBtn>
        <SendBtn :loading="loading" :is-disabled="disableUndo || disableAllBtn" @click="sendImage()" />
      </div>
      <div ref="box" class="relative z-30 w-full h-full overflow-hidden border-2 border-gray-300 rounded-2xl">
        <canvas
          ref="canvas"
          class="absolute z-10 w-full h-full bg-gray-white cursor-pen"
          @mousedown="doMouseDown"
          @mousemove="doMouseMove"
          @mouseup="doEnd"
          @touchstart.prevent="doTouchStart"
          @touchmove.prevent="doTouchMove"
          @touchend.prevent="doEnd"
        />
        <ResultModel v-model:open="isModelOpen" :text="modelText?.text" />
      </div>
    </div>
  </MainContent>
</template>

<script setup lang="ts">
import { ref, reactive, onUnmounted, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useApi, useFromData } from '~/logics/axios'
import { generateHeadMeta } from '~/logics/meta'
import { useCanvas } from '~/logics/canvas'
import type { AxiosRequestConfig } from 'axios'
import type { HandwrittenResult } from '~/types'

const { t } = useI18n()

const siteData = reactive({
  title: `OVaaS - ${t('demos.handwritten-ocr.title')}`,
  description: t('demos.handwritten-ocr.content'),
})

useHead(generateHeadMeta(siteData))

const canvas = ref<HTMLCanvasElement | null>(null)
const box = ref<HTMLElement | null>(null)
const isModelOpen = ref(false)
const modelText = ref<HandwrittenResult>()
const disableAllBtn = ref(false)
const isProd = import.meta.env.MODE === 'production'

watch(isModelOpen, (value) => {
  disableAllBtn.value = !!value
})

const {
  clearAll,
  undo,
  redo,
  doMouseDown,
  doMouseMove,
  doTouchStart,
  doTouchMove,
  doEnd,
  disableUndo,
  disableRedo,
} = useCanvas(canvas, box)

const mimeType = 'image/jpeg'
const url = import.meta.env.VITE_FUNCTIONS_ENDPOINT
const handWriteUrl = `${url}/handwritten`
const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'json',
}

const { data, loading, error, post, cancel } = useApi<HandwrittenResult>(handWriteUrl, config)

watch(data, async(v) => {
  if (!v) return
  if (!isProd) console.log(v)
  modelText.value = v
  isModelOpen.value = true
})
watch(error, (e) => {
  console.log(e)
})

const sendImage = async() => {
  if (!canvas.value) return
  canvas.value.toBlob(async(blob) => {
    if (!blob) return
    const formData = useFromData('image', blob, 'handwritten.jpg')
    post(formData)
  }, mimeType)
}
onUnmounted(() => {
  cancel()
})
</script>
