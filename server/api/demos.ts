import { odata } from '@azure/data-tables'
import { createTableClient, demoPartitionKey } from '~~/lib/table'

interface Demo {
  id: string
  slug: string
  type: 'imageUpload' | 'canvas'
  thumbnailUrl: string
  locales: {
    ja: {
      title: string
      description: string
    }
    en: {
      title: string
      description: string
    }
  }
}

export default defineEventHandler(async(event) => {
  assertMethod(event, 'GET')

  const table = createTableClient()

  const entities = await table.listEntities({
    queryOptions: { filter: odata`PartitionKey eq ${demoPartitionKey}` },
  })

  const demos: Demo[] = []

  for await (const entity of entities)
    demos.push(entity as unknown as Demo)

  return demos
})
