<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.object-detection-yolo.title')"
    :description="t('demos.object-detection-yolo.content')"
    upload-path="/yolov3"
  />
</template>
