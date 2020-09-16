<template>
  <MainContant :title="t('pages-title.settings')">
  </MainContant>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
export { t }
</script>

<style>

</style>