<script setup lang="ts">
// @ts-ignore i18n beta
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
useCustomHead({
  title: t('demos.handwritten-ocr.title'),
  description: t('demos.handwritten-ocr.content'),
})

const svgEl = ref<SVGSVGElement | null>(null)
const {
  drauu,
  mode,
  loading,
  canUndo,
  canRedo,
  modelText,
  isModelOpen,
  uploadImage,
  downloadImage,
} = useHandWritten(svgEl)
</script>

<template>
  <div class="">
    <PageTitle :title="$t('demos.handwritten-ocr.title')">
      <template #actions>
        <DemoSendBtn :loading="loading" :is-disabled="!canUndo && !canRedo" @click="uploadImage" />
      </template>
    </PageTitle>
    <div relative>
      <div class="space-y-4 select-none">
        <div class="px-3 py-2 border border-light-800 dark:border-dark-200 rounded-xl bg-white dark:bg-dark-500 flex flex-wrap gap-0.5 children:align-middle children:my-auto">
          <ToolButton aria-label="Undo" title="Undo" :disabled="!canUndo" @click="drauu.undo()">
            <UnoIcon i-bx:bx-undo />
          </ToolButton>
          <ToolButton aria-label="Redo" title="Redo" :disabled="!canRedo" @click="drauu.redo()">
            <UnoIcon i-bx:bx-redo />
          </ToolButton>
          <ToolButton aria-label="Clear" title="Clear" @click="drauu.clear()">
            <UnoIcon i-bx:bx-trash />
          </ToolButton>
          <div class="mx-4 opacity-25">
            /
          </div>
          <ToolButton :class="{ active: mode === 'stylus' }" aria-label="Stylus" title="Stylus" @click="mode = 'stylus'">
            ✍️
          </ToolButton>
          <ToolButton :class="{ active: mode === 'draw' }" aria-label="Draw" title="Draw" @click="mode = 'draw'">
            ✏️
          </ToolButton>
          <div class="mx-4 opacity-25">
            /
          </div>
          <ToolButton title="Download" @click="downloadImage()">
            <UnoIcon i-bx:bxs-download />
          </ToolButton>
        </div>
        <svg
          ref="svgEl"
          border-light-600
          w-full
          h-180
          bg-white
          rounded-xl
          style="touch-action: none"
        />
      </div>
      <DemoResultModel v-model:open="isModelOpen" :text="modelText" />
    </div>
  </div>
</template>
