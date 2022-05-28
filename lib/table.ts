import { AzureNamedKeyCredential, TableClient } from '@azure/data-tables'

export function createTableClient(): TableClient {
  const {
    azureTableName,
    azureStorageAccountName: account,
    azureStorageAccountKey: accountKey,
  } = useRuntimeConfig()
  const sharedKeyCredential = new AzureNamedKeyCredential(account, accountKey)

  const client = new TableClient(
    `https://${account}.table.core.windows.net`,
    `${azureTableName}`,
    sharedKeyCredential,
  )
  return client
}

export const demoPartitionKey = 'demos'
