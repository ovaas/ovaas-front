<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.face-age.title')"
    :description="t('demos.face-age.content')"
    upload-path="/faceage"
  />
</template>
