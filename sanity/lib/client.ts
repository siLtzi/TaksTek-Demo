import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { SanityImage } from '@/types/sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// Token for authenticated requests (live preview)
export const token = process.env.SANITY_API_READ_TOKEN

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Live preview requires useCdn to be false
  useCdn: false,
  // Optionally use the stega for visual editing
  stega: {
    studioUrl: '/studio',
  },
})

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImage | { _ref: string } | string) {
  return builder.image(source)
}
