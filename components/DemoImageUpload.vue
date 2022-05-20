<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  uploadPath: string
}>()

useCustomHead({
  title: props.title,
  description: props.description,
})

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
        <DemoImagePreview :image="resultImage" />
      </div>
      <DemoImageInput
        :uploading="loading"
        @change="handleInput"
      />
    </div>
  </div>
</template>
