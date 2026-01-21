import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, getNavigation } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/client'
import { NavItem } from '@/types/sanity'
import { MobileNav } from './MobileNav'

function getHref(item: NavItem): string {
  if (item.linkType === 'external' && item.externalUrl) {
    return item.externalUrl
  }
  if (item.internalLink?.isHomepage) {
    return '/'
  }
  if (item.internalLink?.slug?.current) {
    return `/${item.internalLink.slug.current}`
  }
  return '/'
}

export async function Header() {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation('header'),
  ])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {settings?.logo?.asset ? (
            <Image
              src={urlFor(settings.logo.asset).width(150).height(40).url()}
              alt={settings.logo.alt || settings.siteName || 'Logo'}
              width={150}
              height={40}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <span className="text-xl font-bold text-gray-900">
              {settings?.siteName || 'Your Brand'}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation?.items?.map((item, index) => (
            <Link
              key={index}
              href={getHref(item)}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <MobileNav items={navigation?.items || []} />
      </div>
    </header>
  )
}
