<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.face-age.title')"
    :description="t('demos.face-age.content')"
    upload-path="/faceage"
  />
</template>
