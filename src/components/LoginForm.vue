<script setup lang="ts">
import type { FormSchema } from '@/types'
import { useApi } from "../logics/axios"

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

const { loading, post } = useApi<Blob>(`api/v1/auth`,{
  headers: {
    'Content-Type': 'application/json',
  },
})

function onSubmit(values: any) {
  alert(JSON.stringify(values, null, 2))
  post({'Password': 'pass'}) // TODO: 入力されたpassを入れる
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
