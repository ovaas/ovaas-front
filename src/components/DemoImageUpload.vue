<script setup lang="ts">
import { reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { generateHeadMeta } from '@/logics/meta'
import { useUploadImage } from '@/logics/upload'

const props = defineProps<{
  title: string
  description: string
  uploadPath: string
}>()

const siteData = reactive({
  title: `OVaaS - ${props.title}`,
  description: props.description,
})

useHead(generateHeadMeta(siteData))

const {
  handleInput,
  loading,
  resultImage,
} = useUploadImage(props.uploadPath)
</script>

<template>
  <MainContent
    :title="title"
    :back-btn="true"
  >
    <div class="flex flex-col items-stretch flex-auto w-full h-full space-y-4 md:(space-y-0 space-x-6 flex-row)">
      <div class="flex flex-1 md:w-2/3">
        <ImagePreview :image="resultImage" />
      </div>
      <ImageInput
        :uploading="loading"
        @change="handleInput"
      />
    </div>
  </MainContent>
</template>
