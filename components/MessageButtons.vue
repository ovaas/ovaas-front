<script setup lang="ts">
const onSuccess = () => {
  flash(EmitTypes.Success, 'Success message')
}
const onDanger = () => {
  flash(EmitTypes.Danger, 'Danger message')
}
const onWarning = () => {
  flash(EmitTypes.Warning, 'Warning message')
}
const onInfo = () => {
  flash(EmitTypes.Info, 'Info message')
}
</script>

<template>
  <div class="flex justify-center p-4">
    <div class="inline-flex space-x-4">
      <button @click="onSuccess">
        onSuccess
      </button>
      <button @click="onDanger">
        onDanger
      </button>
      <button @click="onWarning">
        onWarning
      </button>
      <button @click="onInfo">
        onInfo
      </button>
    </div>
  </div>
</template>
