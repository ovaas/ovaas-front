<script setup lang="ts">
import { Demo } from '@/lib/schema'

useCustomHead({
  title: 'OVAAS - OpenVINO as a service',
  description: 'No setup! No command! No code! Easy to use OpenVINO™ demo website.',
})

const { data: demos } = await useFetch<Demo[]>('/api/demos')
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <DemoCard
      v-for="demo in demos"
      :key="demo.slug"
      :demo="demo"
    />
  </div>
</template>
