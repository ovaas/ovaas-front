<template>
  <MainContant
    :title="t('demos.human-pose.title')"
    :back-btn="true"
  >
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 flex flex-col">
        <ImagePreview :image="resultImage" />
        <ImageActions :image="resultImage" />
      </div>
      <ImageInput
        v-model="image"
        :uploading="loading"
        :show-alern="showAlern"
      />
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useApi, useFromData } from '/~/plugins/axios'
import { AxiosRequestConfig } from 'axios'
import { flash, EmitTypes } from '/~/plugins/emitter'

const { t } = useI18n()
const isProd = import.meta.env.MODE === 'production'
const isClient = typeof window !== 'undefined'

const image = ref<File | null>(null)
const resultImage = ref<string>('')
const showAlern = ref<boolean>(false)
watch(showAlern, (v) => {
  if (v === true)
    setTimeout(() => v = false, 5000)
})

const url = import.meta.env.VITE_FUNCTIONS_ENDPOINT
const humanPoseUrl = `${url}/humanpose`
const allowFileTypes = ['image/jpeg']

let reader: FileReader

if (isClient) {
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
  flash(EmitTypes.Warning, t('errors.not-image'))
  return false
}

watch(data, (v) => {
  if (v) reader.readAsDataURL(v as Blob)
})
watch(error, (e) => {
  console.log(e)
})
watch(image, (file) => {
  if (!file || !checkFileExt(file)) return
  const formData = useFromData('image', file)
  post(formData)
})
onUnmounted(() => {
  cancel()
})
</script>
