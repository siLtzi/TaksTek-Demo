import { draftMode } from 'next/headers'
import {
  siteSettingsQuery,
  navigationQuery,
  allPagesQuery,
  pageBySlugQuery,
  homepageQuery,
  allPageSlugsQuery,
} from './queries'
import { sanityFetch } from './live'
import type {
  SiteSettings,
  Navigation,
  Page,
  PageSummary,
} from '@/types/sanity'

async function isPreviewMode() {
  try {
    const draft = await draftMode()
    return draft.isEnabled
  } catch {
    return false
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const preview = await isPreviewMode()
  return sanityFetch<SiteSettings | null>({ query: siteSettingsQuery, preview })
}

export async function getNavigation(identifier: 'header' | 'footer'): Promise<Navigation | null> {
  const preview = await isPreviewMode()
  return sanityFetch<Navigation | null>({ 
    query: navigationQuery, 
    params: { identifier },
    preview,
  })
}

export async function getAllPages(): Promise<PageSummary[]> {
  const preview = await isPreviewMode()
  const data = await sanityFetch<PageSummary[] | null>({ query: allPagesQuery, preview })
  return data || []
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const preview = await isPreviewMode()
  return sanityFetch<Page | null>({ 
    query: pageBySlugQuery, 
    params: { slug },
    preview,
  })
}

export async function getHomepage(): Promise<Page | null> {
  const preview = await isPreviewMode()
  return sanityFetch<Page | null>({ query: homepageQuery, preview })
}

export async function getAllPageSlugs(): Promise<{ slug: string }[]> {
  const preview = await isPreviewMode()
  const data = await sanityFetch<{ slug: string }[] | null>({ query: allPageSlugsQuery, preview })
  return data || []
}
