<template>
  <button class="bg-white border border-gray-300 dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-800 font-bold py-1.5 px-3.5 rounded-lg inline-flex shadow-sm items-center focus:outline-none" :disabled="isDisabled" :class="{ 'opacity-50 cursor-not-allowed': isDisabled }" @click="emit('click')">
    <div class="h-7 w-7 inline-flex justify-center items-center mr-2 -ml-1">
      <mdi-loading v-if="loading" class="text-xl sm:animate-spin" />
      <bx-bx-cloud-upload v-else class="text-2xl" />
    </div>
    {{ t('upload.text') }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  loading: Boolean,
  isDisabled: Boolean,
})
const emit = defineEmit(['click'])
</script>

<style>

</style>
