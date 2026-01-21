import { Metadata } from 'next'
import Link from 'next/link'
import { getHomepage, getSiteSettings } from '@/sanity/lib/fetchers'
import { SectionRenderer } from '@/components/sections'
import { urlFor } from '@/sanity/lib/client'

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ])
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  return {
    title: page?.seo?.metaTitle || page?.title || settings?.siteName,
    description: page?.seo?.metaDescription || settings?.siteDescription,
    openGraph: {
      title: page?.seo?.metaTitle || page?.title,
      description: page?.seo?.metaDescription || settings?.siteDescription,
      url: siteUrl,
      images: page?.seo?.ogImage?.asset 
        ? [{ url: urlFor(page.seo.ogImage.asset).width(1200).height(630).url() }]
        : settings?.ogImage?.asset
        ? [{ url: urlFor(settings.ogImage.asset).width(1200).height(630).url() }]
        : [],
    },
    twitter: {
      title: page?.seo?.metaTitle || page?.title,
      description: page?.seo?.metaDescription || settings?.siteDescription,
      images: page?.seo?.ogImage?.asset
        ? [urlFor(page.seo.ogImage.asset).width(1200).height(630).url()]
        : settings?.ogImage?.asset
        ? [urlFor(settings.ogImage.asset).width(1200).height(630).url()]
        : [],
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ])

  if (!page) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to {settings?.siteName || 'Your Website'}</h1>
        <p className="mt-4 text-lg text-gray-600">
          Set up your homepage in the <Link href="/studio" className="text-primary-600 underline hover:text-primary-700">CMS Studio</Link>
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Create a new Page and mark it as &quot;Homepage&quot;
        </p>
      </div>
    )
  }

  return (
    <SectionRenderer 
      sections={page.sections} 
      contactInfo={settings?.contactInfo}
    />
  )
}
