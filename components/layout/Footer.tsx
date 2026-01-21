import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, getNavigation } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/client'
import { NavItem } from '@/types/sanity'
import { SocialIcon } from '@/components/ui/SocialIcon'

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

export async function Footer() {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation('footer'),
  ])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              {settings?.logo?.asset ? (
                <Image
                  src={urlFor(settings.logo.asset).width(150).height(40).url()}
                  alt={settings.logo.alt || settings.siteName || 'Logo'}
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {settings?.siteName || 'Your Brand'}
                </span>
              )}
            </Link>
            {settings?.siteDescription && (
              <p className="mt-4 max-w-md text-sm text-gray-600">
                {settings.siteDescription}
              </p>
            )}
            
            {/* Social Links */}
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="mt-6 flex gap-4">
                {settings.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={social.platform}
                  >
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {navigation?.items?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={getHref(item)}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {settings?.contactInfo?.companyName && (
                <li>{settings.contactInfo.companyName}</li>
              )}
              {settings?.contactInfo?.email && (
                <li>
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="hover:text-gray-900"
                  >
                    {settings.contactInfo.email}
                  </a>
                </li>
              )}
              {settings?.contactInfo?.phone && (
                <li>
                  <a
                    href={`tel:${settings.contactInfo.phone.replace(/\s/g, '')}`}
                    className="hover:text-gray-900"
                  >
                    {settings.contactInfo.phone}
                  </a>
                </li>
              )}
              {settings?.contactInfo?.address && (
                <li className="whitespace-pre-line">
                  {settings.contactInfo.address}
                </li>
              )}
            </ul>
            
            {/* Legal Info (EU Compliance) */}
            {(settings?.contactInfo?.vatNumber || settings?.contactInfo?.chamberOfCommerce) && (
              <div className="mt-4 text-xs text-gray-500">
                {settings.contactInfo.vatNumber && (
                  <p>VAT: {settings.contactInfo.vatNumber}</p>
                )}
                {settings.contactInfo.chamberOfCommerce && (
                  <p>CoC: {settings.contactInfo.chamberOfCommerce}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            {settings?.footerText || `© ${currentYear} ${settings?.siteName || 'Your Company'}. All rights reserved.`}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
