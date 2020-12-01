<template>
  <div v-if="open" class="absolute object-cover h-full w-full bg-gray-800 bg-opacity-50">
    <div class="text-white flex h-full items-center justify-center text-5xl font-semibold relative">
      {{ text || t('demos.hand-write-ocr.text-not-found') }}
      <div class="absolute top-0 right-0 p-6 text-lg">
        <div class="h-10 w-10 inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-opacity-75 text-gray-800 dark:text-white border border-gray-500 " @click="emit('update:open', false)">
          <Icon icon="ion:close-round" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  open: {
    type: Boolean,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
})

const emit = defineEmit(['update:open'])
</script>

<style>

</style>
