<template>
  <MainContant
    :title="t('demos.human-pose.title')"
    :back-btn="true"
  >
    <div class="flex items-stretch flex-auto w-full">
      <div class="flex flex-col w-2/3">
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
import { useApi, useFromData } from '/~/logics/axios'
import { AxiosRequestConfig } from 'axios'
import { flash, EmitTypes } from '/~/logics/emitter'
import { inBrowser } from '/~/utils'
import { generateHeadMeta } from '/~/logics/meta'
import { reduce } from '/~/logics/resize'

const { t } = useI18n()

const siteData = reactive({
  title: `OVaaS - ${t('demos.human-pose.title')}`,
  description: t('demos.human-pose.content'),
})

useHead(generateHeadMeta(siteData))

const image = ref<File | null>(null)
const resultImage = ref<string>('')

const url = import.meta.env.VITE_FUNCTIONS_ENDPOINT
const humanPoseUrl = `${url}/humanpose`
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

const { data, loading, error, post, cancel } = useApi<Blob>(humanPoseUrl, config)

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
  const blob = await reduce.toBlob(file, { max: 1000 })
  const formData = useFromData('image', blob)
  post(formData)
})
onUnmounted(() => {
  cancel()
})
</script>
