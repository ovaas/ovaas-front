<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  uploading: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: File): void
}>()

const handleImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  emit('change', target.files[0])
}
</script>

<template>
  <div class="relative border-2 border-gray-500 border-dashed md:w-1/3 group dark:border-gray-400 rounded-xl basic-transition">
    <input type="file" accept="image/*" aria-label="Upload Image" class="absolute inset-0 z-40 block w-full h-full opacity-0 cursor-pointer" @change="handleImage">
    <div class="flex flex-col items-center justify-center h-full p-6 m-auto text-center md:p-10">
      <div class="mb-3 text-5xl">
        <mdi-loading v-if="uploading" class="animate-spin" />
        <bx-bxs-cloud-upload v-else class="transition-transform ease-in-out transform group-hover:-translate-y-0.5" />
      </div>
      <div class="inline-flex items-center mb-4 text-xl font-semibold md:text-2xl">
        {{ t('upload.image.title') }}
      </div>
      <p class="mb-4 md:w-2/3">
        {{ t('upload.image.content') }}
      </p>
      <span class="text-xs text-red-500 dark:text-red-300">
        {{ t('upload.image.support') }}
      </span>
    </div>
  </div>
</template>
