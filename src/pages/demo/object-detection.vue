<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.object-detection.title')"
    :description="t('demos.object-detection.content')"
    upload-path="/objectdetection"
  />
</template>
