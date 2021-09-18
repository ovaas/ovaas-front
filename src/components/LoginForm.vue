<script setup lang="ts">
import type { FormSchema } from '@/types'

const { t } = useI18n()

const schema: FormSchema = {
  fields: [
    {
      name: 'password',
      type: 'password',
      label: 'form.password',
      placeholder: '●●●●●●●●',
    },
  ],
  validation: {
    password: 'required',
  },
  submitText: 'form.login',
}

const loading = ref(false)

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
}
</script>

<template>
  <div class="bg-dark-400 rounded-xl p-8 max-w-sm w-full">
    <header class="mb-5">
      <h2 class="text-2xl font-bold">
        {{ t('pages-title.login') }}
      </h2>
    </header>
    <DynamicForm :schema="schema" :is-loading="loading" @submit="onSubmit" />
  </div>
</template>
