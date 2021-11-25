<script setup lang="ts">
import { useHead } from '@/logics/head'

const { t } = useI18n()

useHead(computed(() => ({
  title: 'OVAAS - Not Found',
  description: 'The page does not exist.',
})))
</script>

<template>
  <PageTitle :title="t('page-not-found')" />
</template>
