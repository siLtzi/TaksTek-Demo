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

// Typed fetch helper with draft mode support and graceful error handling
export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
}: {
  query: string
  params?: Record<string, unknown>
  preview?: boolean
}): Promise<T | null> {
  try {
    const clientToUse = getClient(preview)
    return await clientToUse.fetch<T>(query, params)
  } catch (error) {
    // Log error in development but don't crash the app
    if (process.env.NODE_ENV === 'development') {
      console.warn('Sanity fetch error (this is normal if Sanity is not configured):', 
        error instanceof Error ? error.message : 'Unknown error')
    }
    return null as T
  }
}

