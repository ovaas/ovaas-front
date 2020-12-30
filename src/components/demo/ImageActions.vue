<template>
  <div class="h-14 mx-auto mt-4 px-6 border-2 border-gray-700 dark:border-gray-400 rounded-full">
    <button class="inline-flex cursor-pointer px-3 h-full items-center group hover:text-indigo-500 hover-transform" @click="downloadImage">
      <bx-bx-download class="text-xl" />
      <span class="pl-2">
        {{ t('share.download') }}
      </span>
    </button>
    <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-500 hover-transform">
      <bx-bx-share class="text-xl" @click="emit('share')" />
      <span class="pl-2">
        {{ t('share.share') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  image: String,
})

const downloadImage = () => {
  if (!props.image) return
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.download = 'human-pose.jpg'
  a.href = props.image
  a.click()
  a.remove()
}
</script>

<style>

</style>
