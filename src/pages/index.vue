<script setup lang="ts">
import { useHead } from '@/logics/head'

useHead(computed(() => ({
  title: 'OVAAS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})))
</script>

<template>
  <DemoList />
</template>
