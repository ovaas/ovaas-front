<template>
  <MainContant :title="t('demos.human-pose.title')" :back-btn="true">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 flex flex-col">
        <div class="flex-1 bg-gray-600 bg-opacity-25 rounded-lg relative overflow-hidden">
          <img v-if="uploadedImage !== ''" :src="uploadedImage" alt="" class="absolute object-cover h-full w-full">
          <button v-if="uploadedImage !== ''" class="absolute bottom-8 right-10 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md outline-none">
            Upload
          </button>
        </div>
        <div class="h-14 mx-auto mt-4 px-6 border-2 border-gray-400 rounded-full">
          <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform">
            <Icon class="iconify" icon="bx:bx-download" />
            <span class="pl-2">
              Download
            </span>
          </div>
          <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform">
            <Icon class="iconify" icon="bx:bx-share" />
            <span class="pl-2">
              Share
            </span>
          </div>
        </div>
      </div>
      <div class="w-1/3 group border-2 border-dashed border-gray-400 rounded-lg relative ml-6 text-gray-300 hover:text-white hover:border-gray-300 basic-transition">
        <input ref="file" type="file" accept="image/*" class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" @change="upload">
        <div class="flex flex-col h-full items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto">
          <p class="mt-2 text-md">
            {{ t('upload.image.drop') }}
          </p>
          <p class="mt-2 text-base">
            {{ t('upload.image.or') }}
          </p>
          <div class="mt-2 group-hover:animate-bounce">
            <Icon class="iconify" icon="bx:bxs-cloud-upload" :size="2" />
          </div>
          <span class="mt-2 text-base">{{ t('upload.image.select') }}</span>
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

const { t } = useI18n()
export { t }

export const file = ref(null)
export const preview = ref(null)
export const uploadedImage = ref('')
export const showAlern = ref(false)

const allowFileTypes = ['image/jpeg', 'image/png']

export const upload = (event) => {
  const imageFile = event.target.files[0]
  if (allowFileTypes.indexOf(imageFile.type) !== -1) {
    showAlern.value = false
    const reader = new FileReader()
    reader.onload = event => {
      uploadedImage.value = event.target.result
    }
    reader.readAsDataURL(imageFile)
  } else {
    file.value.value = ''
    showAlern.value = true
    setTimeout(() => {
      showAlern.value = false
    }, 10000)
  }
  
}
</script>

<style>

</style>