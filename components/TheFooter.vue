<script setup lang="ts">
import dayjs from 'dayjs'
</script>

<template>
  <footer>
    <div class="flex items-center justify-center mx-auto max-w-screen-xl px-2 lg:px-6 py-12">
      <small class="text-true-gray-500">
        &copy; {{ dayjs().get('year') }} OVAAS
      </small>
    </div>
  </footer>
</template>
