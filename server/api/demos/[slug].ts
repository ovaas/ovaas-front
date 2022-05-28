import { createTableClient, demoPartitionKey } from '~~/lib/table'
import type { Demo } from '~~/lib/schema'

export default defineEventHandler(async(event) => {
  assertMethod(event, 'GET')

  const table = createTableClient()
  const slug = event.context.params.slug

  const result = await table.getEntity(demoPartitionKey, slug)

  return result as unknown as Demo[]
})
