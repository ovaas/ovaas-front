<template>
  <MainContant :title="t('pages-title.history')" class="w-3/6">
    <div class="flex flex-col w-full">
      <div v-for="n in 10" :key="n" class="h-40 w-full mb-6 rounded-lg bg-white bg-opacity-15"></div>
    </div>
  </MainContant>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }
</script>

<style>

</style>