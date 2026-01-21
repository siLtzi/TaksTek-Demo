import { MetadataRoute } from 'next'
import { getAllPages } from '@/sanity/lib/fetchers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  const pages = await getAllPages()
  
  const pageUrls: MetadataRoute.Sitemap = pages
    .filter((page) => !page.seo?.noIndex)
    .map((page) => {
      const path = page.isHomepage 
        ? '' 
        : page.slug?.current 
        ? `/${page.slug.current}` 
        : ''
      
      return {
        url: `${siteUrl}${path}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: page.isHomepage ? 'weekly' : 'monthly',
        priority: page.isHomepage ? 1 : 0.8,
      }
    })

  // Add static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return [...pageUrls, ...staticPages]
}
