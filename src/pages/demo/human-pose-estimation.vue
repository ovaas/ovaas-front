<template>
  <MainContant :title="t('demos.human-pose.title')" :back-btn="true">
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

const uploadedImage = ref<string>('')
const showAlern = ref<boolean>(false)
const uploading = ref<boolean>(false)
const isProd = process.env.NODE_ENV === 'production'

const allowFileTypes = ['image/jpeg']

const upload = async(event: Event) => {
  const target = event.target as HTMLInputElement
  const files: FileList = target.files as FileList
  const imageFile = files[0]

  if (!imageFile) return

  if (allowFileTypes.includes(imageFile.type)) {
    showAlern.value = false
    const reader = new FileReader()
    reader.onload = (event) => {
      uploadedImage.value = event.target?.result as string
    }
    const formData = new FormData()
    formData.append('image', imageFile)
    if (!isProd) {
      for (const pair of formData.entries())
        console.log(`${pair[0]}, ${pair[1]}`)
    }

    const url: string = process.env.HUMAN_POSE_API || 'https://ovaashumanpose-test.azurewebsites.net/api/humanpose'

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
        if (error.response.status === 408)
          alert('Server Timeout')

        if (error.response.status === 500)
          alert('Server Error')

        console.log(error)
      })
    uploading.value = false
  }
  else {
    target.value = ''
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
  a.download = 'human-pose.jpg'
  a.href = uploadedImage.value
  a.click()
  a.remove()
}
</script>
