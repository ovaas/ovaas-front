<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n'
import { generateHeadMeta } from '@/logics/meta'

const { t } = useI18n()

const siteData = reactive({
  title: 'OVaaS - Not Found',
  description: 'The page does not exist.',
})

useHead(generateHeadMeta(siteData))
</script>

<template>
  <MainContent :title="t('page-not-found')" />
</template>
