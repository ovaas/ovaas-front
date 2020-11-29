<template>
  <div class="h-14 mx-auto mt-4 px-6 border-2 border-gray-700 dark:border-gray-400 rounded-full">
    <button class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform" @click="emit('download')">
      <Icon class="text-xl" icon="bx:bx-download" />
      <span class="pl-2">
        {{ t('share.download') }}
      </span>
    </button>
    <div class="inline-flex cursor-pointer px-3 h-full items-center hover:text-indigo-600 hover-transform">
      <Icon class="text-xl" icon="bx:bx-share" @click="emit('share')" />
      <span class="pl-2">
        {{ t('share.share') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmit(['download', 'share'])
</script>

<style>

</style>
