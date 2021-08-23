<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.super-resolution.title')"
    :description="t('demos.super-resolution.content')"
    upload-path="/superresolution"
  />
</template>
