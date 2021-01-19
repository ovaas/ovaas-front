<template>
  <MainContant :title="t('demos.hand-write-ocr.title')" :back-btn="true">
    <div class="relative flex items-stretch flex-auto w-full">
      <div class="absolute top-0 right-0 inline-flex items-center space-x-4 text-gray-600 transform -translate-y-14 text-md">
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
      <div ref="box" class="relative w-full overflow-hidden border-2 border-gray-300 rounded-2xl">
        <canvas
          ref="canvas"
          class="absolute bg-gray-white cursor-pen"
          @mousedown="doMouseDown"
          @mousemove="doMouseMove"
          @mouseup="doMouseUp"
        />
        <ResultModel v-model:open="isModelOpen" :text="modelText.text" />
      </div>
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, watch } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { useApi, useFromData } from '/~/plugins/axios'
import { AxiosRequestConfig } from 'axios'
import { generateHeadMeta } from '/~/logics/meta'

const { t } = useI18n()

const siteData = reactive({
  title: `OVaaS - ${t('demos.hand-write-ocr.title')}`,
  description: t('demos.hand-write-ocr.content'),
})

useHead(generateHeadMeta(siteData))

const canvas = ref<HTMLCanvasElement | null>(null)
const box = ref<HTMLCanvasElement | null>(null)
const isModelOpen = ref(false)
const modelText = ref('')
const disableAllBtn = ref(false)
const isProd = import.meta.env.MODE === 'production'

const disableUndo = computed(() => {
  return undoDataStack.value.length === 0
})
const disableRedo = computed(() => {
  return redoDataStack.value.length === 0
})

watch(isModelOpen, (value) => {
  disableAllBtn.value = !!value
})

let ctx: CanvasRenderingContext2D

onMounted(() => {
  if (!canvas.value || !box.value) return
  window.addEventListener('resize', resize)
  canvas.value.width = box.value.offsetWidth
  canvas.value.height = box.value.offsetHeight
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})

const resize = () => {
  if (!canvas.value || !box.value) return
  const width = box.value.offsetWidth
  const height = box.value.offsetHeight
  canvas.value.width = width
  canvas.value.height = height
}

let draw = false
const color = '#000000'
const lineWidth = 10

const STACK_MAX_SIZE = 30
const undoDataStack = ref<ImageData[]>([])
const redoDataStack = ref<ImageData[]>([])

const clearAll = () => {
  undoDataStack.value = []
  redoDataStack.value = []
  ctx.fillStyle = '#FFFFFF'
  if (!canvas.value) return
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
}

const saveDraw = () => {
  redoDataStack.value = []
  if (undoDataStack.value.length >= STACK_MAX_SIZE)
    undoDataStack.value.pop()
  if (!canvas.value) return
  undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
}

const undo = () => {
  if (undoDataStack.value.length <= 0) return
  if (canvas.value)
    redoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
  const imageData = undoDataStack.value.shift() as ImageData
  ctx.putImageData(imageData, 0, 0)
}

const redo = () => {
  if (redoDataStack.value.length <= 0) return
  if (canvas.value)
    undoDataStack.value.unshift(ctx.getImageData(0, 0, canvas.value.width, canvas.value.height))
  const imageData = redoDataStack.value.shift() as ImageData
  ctx.putImageData(imageData, 0, 0)
}

const doMouseDown = (e: MouseEvent) => {
  saveDraw()
  draw = true
  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.beginPath()
  ctx.moveTo(e.offsetX, e.offsetY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
}
const doMouseMove = (e: MouseEvent) => {
  if (!draw) return
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
}
const doMouseUp = () => {
  draw = false
}

const mimeType = 'image/jpeg'
const url = import.meta.env.VITE_FUNCTIONS_ENDPOINT
const handWriteUrl = `${url}/handwritten`
const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'blob',
}

const { data, loading, error, post, cancel } = useApi<Blob>(handWriteUrl, config)

watch(data, async(v) => {
  if (!v) return
  if (!isProd) console.log(v)
  modelText.value = JSON.parse(await v.text())
  isModelOpen.value = true
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

<style>

</style>
