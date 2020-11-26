<template>
  <MainContant :title="t('demos.human-pose.title')" :back-btn="true">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 flex flex-col">
        <div class="flex-1 border bg-gray-600 bg-opacity-25 rounded-lg relative overflow-hidden">
          <img v-if="uploadedImage !== ''" :src="uploadedImage" alt="" class="absolute object-contain h-full w-full">
        </div>
        <div class="h-14 mx-auto mt-4 px-6 border-2 border-gray-400 rounded-full">
          <button class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform" @click="downloadImage()">
            <Icon class="iconify" icon="bx:bx-download" />
            <span class="pl-2">
              {{ t('share.download') }}
            </span>
          </button>
          <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform">
            <Icon class="iconify" icon="bx:bx-share" />
            <span class="pl-2">
              {{ t('share.share') }}
            </span>
          </div>
        </div>
      </div>
      <div class="w-1/3 group border-2 border-dashed border-gray-400 rounded-lg relative ml-6 text-gray-300 hover:text-white hover:border-gray-300 basic-transition">
        <input ref="file" type="file" accept="image/*" class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" @change="upload">
        <div class="flex flex-col h-full items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto">
          <h3 class="text-2xl font-semibold inline-flex items-center">
            <Icon v-if="uploading" class="iconify mr-2 animate-spin" icon="mdi:loading" />
            <Icon v-else class="iconify mr-2" icon="bx:bxs-cloud-upload" />
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

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()
export { t }

export const file = ref(null)
export const preview = ref(null)
export const uploadedImage = ref('')
export const showAlern = ref(false)
export const uploading = ref(false)
const isProd = process.env.NODE_ENV === 'production' ? true : false

const allowFileTypes = ['image/jpeg', 'image/png']

export const upload = async (event) => {
  const imageFile = event.target.files[0]
  if (!imageFile) return
  if (allowFileTypes.indexOf(imageFile.type) !== -1) {
    showAlern.value = false
    const reader = new FileReader()
    reader.onload = event => {
      uploadedImage.value = event.target.result
    }
    let formData = new FormData();
    formData.append('image', imageFile);
    if (!isProd) {
      for(let pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
      }
    }

    const url = process.env.HUMAN_POSE_API || 'https://ovaashumanpose-test.azurewebsites.net/api/humanpose'

    uploading.value = true
    await axios.post(url, formData, { 
      responseType:"blob",
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        if (!isProd) console.log(response);
        reader.readAsDataURL(response.data)
      })
      .catch(error => {
        if(error.response.status === 408) {
          alert('Server Timeout')
        }
        if(error.response.status === 500) {
          alert('Server Error')
        }
        console.log(error)
      })
    uploading.value = false
  } else {
    file.value.value = ''
    showAlern.value = true
    setTimeout(() => {
      showAlern.value = false
    }, 5000)
  }
}

export const downloadImage = () => {
  if (!uploadedImage.value) return
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = 'human-pose.jpg';
  a.href = uploadedImage.value;
  a.click();
  a.remove();
}
</script>

<style>

</style>