<template>
  <MainContant title="Demos">
    <div class="flex-auto flex w-full items-stretch">
      <div class="w-2/3 bg-white"></div>
      <div class="w-1/3">
        <FormulateInput
          type="file"
          name="file"
          label="Select your documents to upload"
          help="Select one or more PDFs to upload"
          validation="mime:application/pdf"
          multiple
        />
      </div>
    </div>
  </MainContant>
</template>

<script>
export default {

}
</script>

<style>

</style>