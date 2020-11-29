<template>
  <MainContant :title="t('demos.draw-colors.title')" :back-btn="true">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 flex flex-col">
        <div class="flex-1 bg-white dark:bg-gray-400 rounded-lg relative overflow-hidden">
          <img v-if="uploadedImage !== ''" :src="uploadedImage" alt="" class="absolute object-contain h-full w-full">
        </div>
        <div class="h-14 mx-auto mt-4 px-6 border-2 border-gray-700 dark:border-gray-400 rounded-full">
          <button class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform" @click="downloadImage()">
            <Icon class="text-xl" icon="bx:bx-download" />
            <span class="pl-2">
              {{ t('share.download') }}
            </span>
          </button>
          <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform">
            <Icon class="text-xl" icon="bx:bx-share" />
            <span class="pl-2">
              {{ t('share.share') }}
            </span>
          </div>
        </div>
      </div>
      <div class="w-1/3 group border-2 border-dashed border-gray-800 dark:border-gray-400 rounded-lg relative ml-6 basic-transition">
        <input ref="file" type="file" accept="image/*" class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" @change="upload">
        <div class="flex flex-col h-full items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto">
          <h3 class="text-2xl font-semibold inline-flex items-center">
            <div class="text-2xl mr-2">
              <Icon v-if="uploading" class="animate-spin" icon="mdi:loading" />
              <Icon v-else icon="bx:bxs-cloud-upload" />
            </div>
            {{ t('upload.image.title') }}
          </h3>
          <p class="mt-2 text-base w-2/3">
            {{ t('upload.image.content') }}
          </p>
          <span v-show="showAlern" class="mt-2 text-base text-red-700">
            {{ t('errors.not-image') }}
          </span>
        </div>
      </div>
    </div>
  </MainContant>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const file = ref(null)
const preview = ref(null)
const uploadedImage = ref('')
const showAlern = ref(false)
const uploading = ref(false)
const isProd = process.env.NODE_ENV === 'production'

const allowFileTypes = ['image/jpeg', 'image/png']

const upload = async(event) => {
  const imageFile = event.target.files[0]
  if (!imageFile) return
  if (allowFileTypes.includes(imageFile.type)) {
    showAlern.value = false
    const reader = new FileReader()
    reader.onload = (event) => {
      uploadedImage.value = event.target.result
    }
    const formData = new FormData()
    formData.append('image', imageFile)
    if (!isProd) {
      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)
    }

    const url = process.env.DRAW_COLORS_API || 'https://ovaashumanpose-test.azurewebsites.net/api/humanpose'

    uploading.value = true
    await axios.post(url, formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (!isProd) console.log(response)
        reader.readAsDataURL(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    uploading.value = false
  }
  else {
    file.value.value = ''
    showAlern.value = true
    setTimeout(() => {
      showAlern.value = false
    }, 5000)
  }
}

const downloadImage = () => {
  if (!uploadedImage.value) return
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = 'draw-colors.jpg'
  a.href = uploadedImage.value
  a.click()
  a.remove()
}
</script>

<style>

</style>
