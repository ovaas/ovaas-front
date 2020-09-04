<template>
  <main class="flex flex-col items-start w-5/6 min-h-full mx-auto px-4 py-10 text-white">
    <h1 class="text-4xl font-bold pb-6">
      {{ title }}
    </h1>
    <slot></slot>
  </main>
</template>

<script setup="props">
export default {
  props: {
    title: {
      type: String,
      require: true
    }
  }
}
</script>

<style>

</style>