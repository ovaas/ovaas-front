<template>
  <MainContant :title="t('demos.draw-colors.title')" :back-btn="true">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 flex flex-col">
        <div class="flex-1 bg-white dark:bg-gray-400 rounded-lg relative overflow-hidden">
          <img v-if="uploadedImage !== ''" :src="uploadedImage" alt="" class="absolute object-contain h-full w-full">
        </div>
        <ImageActions :image="uploadedImage" @download="downloadImage()" />
      </div>
      <ImageInput :uploading="uploading" :show-alern="showAlern" @change="upload" />
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
