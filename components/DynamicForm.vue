<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'

import type { FormSchema } from '@/lib/types'

defineProps<{
  schema: FormSchema
  isLoading?: boolean
}>()

defineEmits<{(e: 'submit', value: any): void}>()
</script>

<template>
  <Form v-slot="{ meta }" :validation-schema="schema.validation" :initial-values="schema.values" @submit="$emit('submit', $event)">
    <div class="mb-8">
      <div v-for="{ name, as, label, sublabel, ...attrs } in schema.fields" :key="name" class="mb-4">
        <label class="block mb-1" :for="name">
          {{ $t(label) }}
          <span v-if="schema.validation[name]?.includes('required')">*</span>
          <span v-if="sublabel" class="text-xs ml-4 text-black">{{ sublabel }}</span>
        </label>
        <Field
          :id="name"
          class="w-full px-3 py-2 bg-dark-200 rounded outline-none focus:ring"
          :as="as"
          :name="name"
          v-bind="attrs"
        />
        <ErrorMessage :name="name" class="text-red-500 text-sm mt-2" />
      </div>
    </div>
    <div class="flex justify-center">
      <button
        class="py-2 px-4 bg-dark-100 rounded
    text-center font-medium uppercase text-white
    focus:(outline-none ring)
    disabled:(opacity-60 cursor-not-allowed);"
        :disabled="!meta.valid"
      >
        <UnoIcon v-if="isLoading" i-eos-icons:three-dots-loading />
        <span v-else>{{ $t(schema.submitText) }}</span>
      </button>
    </div>
  </Form>
</template>
