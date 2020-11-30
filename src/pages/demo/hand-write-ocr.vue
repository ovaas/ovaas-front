<template>
  <MainContant :title="t('demos.hand-write-ocr.title')" :back-btn="true">
    <div class="relative flex-auto flex w-full items-stretch">
      <div class="absolute transform -translate-y-14 w-full text-gray-600 flex space-x-4 text-md justify-end">
        <RoundedFullBtn icon="bx:bx-undo" :is-disable="disableUndo || disableAllBtn" @click="undo()" />
        <RoundedFullBtn icon="bx:bx-redo" :is-disable="disableRedo || disableAllBtn" @click="redo()" />
        <RoundedFullBtn icon="bx:bx-trash" :is-disable="disableUndo && disableRedo || disableAllBtn" @click="clearAll()" />
        <button class="bg-white dark:bg-gray-300 hover:bg-gray-50 dark:hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex shadow-sm items-center focus:outline-none" :disabled="disableUndo || disableAllBtn" :class="{ 'opacity-50 cursor-not-allowed': disableUndo || disableAllBtn }" @click="sendImage()">
          <Icon v-if="uploading" class="text-xl iconify mr-2 -ml-1 animate-spin" icon="mdi:loading" />
          <Icon v-else icon="bx:bx-cloud-upload" class="text-2xl mr-2 -ml-1" />
          {{ t('upload.text') }}
        </button>
      </div>
      <div ref="box" class="w-full relative rounded-lg overflow-hidden">
        <canvas
          ref="canvas"
          class="absolute bg-gray-white cursor-pen"
          @mousedown="doMouseDown"
          @mousemove="doMouseMove"
          @mouseup="doMouseUp"
        />
        <div v-if="isModelOpen" class="absolute object-cover h-full w-full bg-gray-800 bg-opacity-50">
          <div class="text-white flex h-full items-center justify-center text-5xl font-semibold relative">
            {{ modelText.text || t('demos.hand-write-ocr.text-not-found') }}
            <div class="absolute top-0 right-0 p-6 text-lg">
              <div class="h-10 w-10 inline-flex items-center justify-center rounded-full bg-gray-800 hover:bg-opacity-50 text-gray-300 border border-gray-500" @click="isModelOpen = false">
                <Icon icon="mdi:close" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const canvas = ref<HTMLCanvasElement | null>(null)
const box = ref<HTMLCanvasElement | null>(null)
const uploading = ref<boolean>(false)
const isModelOpen = ref<boolean>(false)
const modelText = ref<string>('')
const disableAllBtn = ref<boolean>(false)
const isProd: boolean = process.env.NODE_ENV === 'production'

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
  const width = box.value.offsetWidth
  const height = box.value.offsetHeight
  window.addEventListener('resize', () => {
    if (!canvas.value) return
    canvas.value.width = width
    canvas.value.height = height
  })
  canvas.value.width = box.value.offsetWidth
  canvas.value.height = box.value.offsetHeight
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
  ctx.fillStyle = '#EDF2F7'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
})

let draw = false
const color = '#000000'
const lineWidth = 10

const STACK_MAX_SIZE = 30
const undoDataStack = ref<ImageData[]>([])
const redoDataStack = ref<ImageData[]>([])

const clearAll = () => {
  undoDataStack.value = []
  redoDataStack.value = []
  ctx.fillStyle = '#EDF2F7'
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

const sendImage = async() => {
  uploading.value = true

  const mimeType = 'image/jpeg'
  const url = process.env.HUMAN_POSE_API || 'https://ovaashumanpose-test.azurewebsites.net/api/handwritten'
  const formData = new FormData()
  // let link = document.createElement("a")
  // link.download = "image.jpeg"
  if (!canvas.value) return
  canvas.value.toBlob(async(blob) => {
    // link.href = URL.createObjectURL(blob)
    // link.click()
    formData.append('image', blob as Blob, 'hand-written.jpeg')
    if (!isProd) {
      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)
    }

    await axios.post(url, formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(async(response) => {
        if (!isProd) console.log(response)
        modelText.value = JSON.parse(await response.data.text())
        isModelOpen.value = true
        uploading.value = false
      })
      .catch((error) => {
        if (error.response.status === 408)
          alert('Server Timeout')
        else if (error.response.status === 500)
          alert('Server Error')
        else if (error.response.status === 404)
          alert('文字を見つかりませんでした')
        else
          alert('Error')
        uploading.value = false
        throw error
      })
  }, mimeType)
}

</script>

<style>

</style>
