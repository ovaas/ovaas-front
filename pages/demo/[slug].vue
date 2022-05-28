<script setup lang="ts">
import { Demo } from '@/lib/schema'
const route = useRoute()
const { slug } = route.params
const { data } = useFetch(`/api/demos/${slug}`)

const demo = computed(() => data.value as unknown as Demo)
</script>

<template>
  <div>
    <ImageUploadDemo v-if="demo.type === 'imageUpload'" :demo="demo" />
    <CanvasDemo v-else-if="demo.type === 'canvas'" :demo="demo" />
    <div v-else>
      Demo component not found!
    </div>
  </div>
</template>
