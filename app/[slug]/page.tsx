import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageBySlug, getAllPageSlugs, getSiteSettings } from '@/sanity/lib/fetchers'
import { SectionRenderer } from '@/components/sections'
import { urlFor } from '@/sanity/lib/client'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const [page, settings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ])
  
  if (!page) {
    return {}
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  const pageUrl = `${siteUrl}/${slug}`
  
  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || settings?.siteDescription,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || settings?.siteDescription,
      url: pageUrl,
      images: page.seo?.ogImage?.asset 
        ? [{ url: urlFor(page.seo.ogImage.asset).width(1200).height(630).url() }]
        : settings?.ogImage?.asset
        ? [{ url: urlFor(settings.ogImage.asset).width(1200).height(630).url() }]
        : [],
    },
    twitter: {
      title: page.seo?.metaTitle || page.title,
      description: page.seo?.metaDescription || settings?.siteDescription,
      images: page.seo?.ogImage?.asset
        ? [urlFor(page.seo.ogImage.asset).width(1200).height(630).url()]
        : settings?.ogImage?.asset
        ? [urlFor(settings.ogImage.asset).width(1200).height(630).url()]
        : [],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const [page, settings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ])

  if (!page) {
    notFound()
  }

  // Redirect homepage slug to root
  if (page.isHomepage) {
    notFound()
  }

  return (
    <SectionRenderer 
      sections={page.sections} 
      contactInfo={settings?.contactInfo}
    />
  )
}
