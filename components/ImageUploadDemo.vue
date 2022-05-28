<script setup lang="ts">
import { Demo } from '@/lib/schema'
const props = defineProps<{
  demo: Demo
}>()

const { title, description } = useDemoLocale(props.demo)

useCustomHead({
  title: title.value,
  description: description.value,
})

const {
  handleInput,
  loading,
  resultImage,
} = useUploadImage(props.demo.apiUrl)
</script>

<template>
  <div class="">
    <PageTitle :title="title" />
    <div class="flex flex-col flex-auto w-full space-y-4 md:(space-y-0 space-x-6 flex-row) h-200">
      <div class="flex flex-1 md:w-2/3">
        <DemoImagePreview :image="resultImage" />
      </div>
      <DemoImageInput
        :uploading="loading"
        @change="handleInput"
      />
    </div>
  </div>
</template>
