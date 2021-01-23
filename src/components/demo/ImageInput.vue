<template>
  <div class="relative w-1/3 ml-6 border-2 border-gray-800 border-dashed group dark:border-gray-400 rounded-xl basic-transition">
    <input type="file" accept="image/*" aria-label="Upload Image" class="relative z-40 block w-full h-full p-20 opacity-0 cursor-pointer" @change="emit('update:modelValue', getFile($event))">
    <div class="absolute top-0 left-0 right-0 flex flex-col items-center justify-center h-full p-10 m-auto space-y-3 text-center">
      <div class="text-5xl">
        <mdi-loading v-if="props.uploading" class="animate-spin" />
        <bx-bxs-cloud-upload v-else class="transition-transform ease-in-out transform group-hover:-translate-y-0.5" />
      </div>
      <div class="inline-flex items-center text-2xl font-semibold">
        {{ t('upload.image.title') }}
      </div>
      <p class="w-2/3">
        {{ t('upload.image.content') }}
      </p>
      <span class="text-xs text-red-300">
        {{ t('upload.image.jpg-only') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  uploading: Boolean,
  modelValue: Object,
})
const emit = defineEmit(['update:modelValue'])
const getFile = (e: any) => {
  return e.target.files[0]
}
</script>

<style>

</style>
