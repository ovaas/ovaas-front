<template>
  <MainContant title="Demos">
    <div class="grid grid-cols-4 gap-4">
      <DemoCard v-for="n in 10" :key="n" />
    </div>
  </MainContant>
</template>

<script>
export default {

}
</script>

<style>

</style>