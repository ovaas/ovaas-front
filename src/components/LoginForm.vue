<script setup lang="ts">
import type { FormSchema } from '@/types'
import { useApi } from '../logics/axios'

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

interface LoginRes {
  access_token: string
}

const { loading, post } = useApi<LoginRes>('api/v1/auth')

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
  post({ password: values.password })
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
