<script setup lang="ts">
import { HandwrittenResult } from '@/lib/types'
import { isDev } from '@/lib/utils'
import { Demo } from '@/lib/schema'

const props = defineProps<{
  demo: Demo
}>()

const { title, description } = useDemoLocale(props.demo)

useCustomHead({
  title: title.value,
  description: description.value,
})

const canvas = ref<HTMLCanvasElement | null>(null)
const box = ref<HTMLDivElement | null>(null)
const {
  clearAll,
  undo,
  redo,
  disableUndo,
  disableRedo,
  toBlob,
  download,
} = useCanvas(canvas, box)

const modelText = ref('')
const isModelOpen = ref(false)

const { data, loading, post, cancel } = useApi<HandwrittenResult>(props.demo.apiUrl, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'json',
})

watch(data, async(v) => {
  if (!v) return
  // eslint-disable-next-line no-console
  if (isDev) console.log(v)
  modelText.value = v.text
  isModelOpen.value = true
})

async function uploadImage() {
  const blob = await toBlob()
  if (!blob) return
  const formData = useFromData('image', blob, 'handwritten.jpg')
  await post(formData)
}

onUnmounted(() => {
  cancel()
})
</script>

<template>
  <div class="">
    <PageTitle :title="title">
      <template #actions>
        <DemoSendBtn :loading="loading" :is-disabled="disableUndo && disableRedo" @click="uploadImage" />
      </template>
    </PageTitle>
    <div relative>
      <div class="space-y-4 select-none">
        <div class="px-3 py-2 border border-light-800 dark:border-dark-200 rounded-xl bg-white dark:bg-dark-500 flex flex-wrap gap-0.5 children:align-middle children:my-auto">
          <ToolButton aria-label="Undo" title="Undo" :disabled="disableUndo" @click="undo()">
            <UnoIcon i-bx:bx-undo />
          </ToolButton>
          <ToolButton aria-label="Redo" title="Redo" :disabled="disableRedo" @click="redo()">
            <UnoIcon i-bx:bx-redo />
          </ToolButton>
          <ToolButton aria-label="Clear" title="Clear" @click="clearAll()">
            <UnoIcon i-bx:bx-trash />
          </ToolButton>
          <div class="mx-4 opacity-25">
            /
          </div>
          <!-- <ToolButton :class="{ active: mode === 'stylus' }" aria-label="Stylus" title="Stylus" @click="mode = 'stylus'">
            ✍️
            </ToolButton>
            <ToolButton :class="{ active: mode === 'draw' }" aria-label="Draw" title="Draw" @click="mode = 'draw'">
            ✏️
            </ToolButton>
            <div class="mx-4 opacity-25">
            /
            </div> -->
          <ToolButton title="Download" @click="download()">
            <UnoIcon i-bx:bxs-download />
          </ToolButton>
        </div>
        <div ref="box">
          <canvas
            ref="canvas"
            border-light-600
            w-full
            h-180
            bg-white
            rounded-xl
            style="touch-action: none"
          />
        </div>
      </div>
      <DemoResultModel v-model:open="isModelOpen" :text="modelText" />
    </div>
  </div>
</template>
