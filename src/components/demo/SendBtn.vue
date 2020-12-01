<template>
  <button class="bg-white border border-gray-300 dark:bg-gray-100 hover:bg-gray-50 dark:hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg inline-flex shadow-sm items-center focus:outline-none" :disabled="isDisabled" :class="{ 'opacity-50 cursor-not-allowed': isDisabled }" @click="emit('click')">
    <Icon v-if="loading" class="text-xl mr-2 -ml-1 animate-spin" icon="mdi:loading" />
    <Icon v-else icon="bx:bx-cloud-upload" class="text-2xl mr-2 -ml-1" />
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
