import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN

// Create a client for fetching data with optional draft mode support
export const previewClient = client.withConfig({
  token,
  useCdn: false,
  perspective: 'previewDrafts',
})

// Helper to get the appropriate client based on draft mode
export function getClient(preview = false) {
  return preview ? previewClient : client
}

// Typed fetch helper with draft mode support
export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
}: {
  query: string
  params?: Record<string, unknown>
  preview?: boolean
}): Promise<T> {
  const clientToUse = getClient(preview)
  return clientToUse.fetch<T>(query, params)
}

