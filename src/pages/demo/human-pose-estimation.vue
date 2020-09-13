<template>
  <MainContant title="Human Pose Estimation" back-btn="true">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 bg-gray-600 bg-opacity-25 rounded-lg relative overflow-hidden">
        <img v-if="uploadedImage !== ''" :src="uploadedImage" alt="" class="absolute object-cover h-full w-full">
        <button v-if="uploadedImage !== ''" class="absolute bottom-8 right-10 py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md outline-none">
          Upload
        </button>
      </div>
      <div class="w-1/3 border-2 border-dashed border-gray-500 rounded-lg relative ml-6 hover:text-gray-400">
        <input ref="file" type="file" accept="image/*" class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" @change="upload">
        <div class="flex flex-col h-full items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto">
          <p class="mt-2 text-md">
            Drop files anywhere to upload
          </p>
          <p class="mt-2 text-base">
            or
          </p>
          <div class="mt-2">
            <Icon class="iconify mb-1" icon="bx:bxs-cloud-upload" size="2" />
          </div>
          <span class="mt-2 text-base">Select a file</span>
          <span v-show="showAlern" class="mt-2 text-base text-red-700">Please upload a image file !!!</span>
        </div>
      </div>
    </div>
  </MainContant>
</template>

<script setup>
import { ref } from 'vue'
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