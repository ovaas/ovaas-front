<script setup lang="ts">
import { reactive } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { generateHeadMeta } from '@/logics/meta'
import { useUploadImage } from '@/logics/upload'

const { t } = useI18n()

const siteData = reactive({
  title: `OVaaS - ${t('demos.object-detection.title')}`,
  description: t('demos.object-detection.content'),
})

useHead(generateHeadMeta(siteData))

const {
  handleInput,
  loading,
  resultImage,
} = useUploadImage('/objectdetection')
</script>

<template>
  <MainContent
    :title="t('demos.object-detection.title')"
    :back-btn="true"
  >
    <div class="flex flex-col items-stretch flex-auto w-full h-full space-y-4  md:(space-y-0 space-x-6 flex-row)">
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
