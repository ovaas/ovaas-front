<template>
  <MainContant :title="t('demos.hand-write-ocr.title')" :back-btn="true">
    <div class="flex-auto h-full w-full bg-gray-100 rounded-lg">
    </div>
  </MainContant>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }
</script>

<style>

</style>