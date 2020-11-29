<template>
  <MainContant :title="t('pages-title.settings')" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
