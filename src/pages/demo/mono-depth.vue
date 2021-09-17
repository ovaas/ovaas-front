<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.mono-depth.title')"
    :description="t('demos.mono-depth.content')"
    upload-path="/monodepth"
  />
</template>
