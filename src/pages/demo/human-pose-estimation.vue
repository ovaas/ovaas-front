<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.human-pose.title')"
    :description="t('demos.human-pose.content')"
    upload-path="/humanpose"
  />
</template>
