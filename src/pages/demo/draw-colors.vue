<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.draw-colors.title')"
    :description="t('demos.draw-colors.content')"
    upload-path="/colorization"
  />
</template>
