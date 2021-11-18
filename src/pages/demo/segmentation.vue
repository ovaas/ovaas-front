<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.segmentation.title')"
    :description="t('demos.segmentation.content')"
    upload-path="/humansegmentation"
  />
</template>
