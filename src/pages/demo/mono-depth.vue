<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.mono-depth.title')"
    :description="t('demos.mono-depth.content')"
    upload-path="/monodepth"
  />
</template>
