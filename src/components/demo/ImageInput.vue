<template>
  <div class="w-1/3 group border-2 border-dashed border-gray-800 dark:border-gray-400 rounded-xl relative ml-6 basic-transition">
    <input type="file" accept="image/*" class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" @change="emit('change', $event)">
    <div class="flex flex-col h-full items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto space-y-3">
      <div class="text-5xl">
        <Icon v-if="props.uploading" class="animate-spin" icon="mdi:loading" />
        <Icon v-else icon="bx:bxs-cloud-upload" />
      </div>
      <h3 class="text-2xl font-semibold inline-flex items-center">
        {{ t('upload.image.title') }}
      </h3>
      <p class="text-base w-2/3">
        {{ t('upload.image.content') }}
      </p>
      <span v-show="showAlern" class="text-base text-red-700">
        {{ t('errors.not-image') }}
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
  showAlern: Boolean,
})
const emit = defineEmit(['change'])
</script>

<style>

</style>
