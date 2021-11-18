<script setup lang="ts">
import { useHead } from '@/logics/head'
import { useUploadImage } from '@/logics/upload'

const props = defineProps<{
  title: string
  description: string
  uploadPath: string
}>()

useHead(computed(() => ({
  title: props.title,
  description: props.description,
})))

const {
  handleInput,
  loading,
  resultImage,
} = useUploadImage(props.uploadPath)
</script>

<template>
  <div class="">
    <PageTitle :title="title" />
    <div class="flex flex-col flex-auto w-full space-y-4 md:(space-y-0 space-x-6 flex-row) h-200">
      <div class="flex flex-1 md:w-2/3">
        <ImagePreview :image="resultImage" />
      </div>
      <ImageInput
        :uploading="loading"
        @change="handleInput"
      />
    </div>
  </div>
</template>
