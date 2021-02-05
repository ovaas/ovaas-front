<template>
  <MainContant
    :title="t('demos.draw-colors.title')"
    :back-btn="true"
  >
    <div class="flex flex-col items-stretch flex-auto w-full h-full space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
      <div class="flex flex-1 md:w-2/3">
        <ImagePreview :image="resultImage" />
      </div>
      <ImageInput
        v-model="image"
        :uploading="loading"
      />
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onUnmounted } from 'vue'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { AxiosRequestConfig } from 'axios'
import { useApi, useFromData } from '~/logics/axios'
import { flash, EmitTypes } from '~/logics/emitter'
import { inBrowser, resizeImage } from '~/utils'
import { generateHeadMeta } from '~/logics/meta'

const { t } = useI18n()

const siteData = reactive({
  title: `OVaaS - ${t('demos.draw-colors.title')}`,
  description: t('demos.draw-colors.content'),
})

useHead(generateHeadMeta(siteData))

const image = ref<File | null>(null)
const resultImage = ref<string>('')

const url = import.meta.env.VITE_FUNCTIONS_ENDPOINT
const drawColorUrl = `${url}/colorization`
const allowFileTypes = ['image/jpeg', 'image/png']

let reader: FileReader

if (inBrowser) {
  reader = new FileReader()
  reader.onload = (event) => {
    resultImage.value = event.target?.result as string
  }
}

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  responseType: 'blob',
}

const { data, loading, error, post, cancel } = useApi<Blob>(
  drawColorUrl,
  config,
)

const checkFileExt = (file: File) => {
  if (allowFileTypes.includes(file.type))
    return true
  flash(EmitTypes.Warning, t('errors.not-valid-image'))
  return false
}

watch(data, (v) => {
  if (v) reader.readAsDataURL(v as Blob)
})
watch(error, (e) => {
  console.log(e)
})
watch(image, async(file) => {
  if (!file || !checkFileExt(file)) return
  loading.value = true
  const blob = await resizeImage(file)
  const formData = useFromData('image', blob, 'humanpose.jpg')
  post(formData)
})
onUnmounted(() => {
  cancel()
})
</script>
