<script setup lang="ts">
defineProps<{
  uploading: boolean
}>()

const emit = defineEmits<{(e: 'change', value: File): void}>()

const handleImage = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return
  emit('change', target.files[0])
}
</script>

<template>
  <div class="relative border-2 border-gray-300 border-dashed md:w-1/3 group dark:border-cool-gray-600 rounded-xl basic-transition">
    <input type="file" accept="image/*" aria-label="Upload Image" class="absolute inset-0 z-40 block w-full h-full opacity-0 cursor-pointer" @change="handleImage">
    <div class="flex flex-col items-center justify-center h-full p-6 m-auto text-center md:p-10">
      <div class="mb-3 text-5xl">
        <UnoIcon v-if="uploading" i-mdi-loading class="animate-spin" />
        <UnoIcon v-else i-bx-bxs-cloud-upload class="transition-transform ease-in-out transform group-hover:-translate-y-0.5" />
      </div>
      <div class="inline-flex items-center mb-4 text-xl font-semibold md:text-2xl">
        {{ $t('upload.image.title') }}
      </div>
      <p class="mb-4 md:w-2/3">
        {{ $t('upload.image.content') }}
      </p>
      <span class="text-xs text-red-500">
        {{ $t('upload.image.support') }}
      </span>
    </div>
  </div>
</template>
