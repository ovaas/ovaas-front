<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <DemoImageUpload
    :title="t('demos.hide-distant-person.title')"
    :description="t('demos.hide-distant-person.content')"
    upload-path="/hide-distant-person"
  />
</template>
