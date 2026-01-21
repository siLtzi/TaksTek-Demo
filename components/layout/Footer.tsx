import Link from 'next/link'
import Image from 'next/image'
import { getSiteSettings, getNavigation } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/client'
import { NavItem } from '@/types/sanity'
import { SocialIcon } from '@/components/ui/SocialIcon'
import { FooterClient } from './FooterClient'
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle } from 'lucide-react'

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

// Service areas for footer
const serviceAreas = ['Oulu', 'Kempele', 'Haukipudas', 'Kiiminki', 'Oulunsalo', 'Liminka', 'Muhos']

// Brand names
const brands = ['Toshiba', 'Panasonic', 'Mitsubishi', 'Daikin', 'Vallox']

export async function Footer() {
  const [settings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation('footer'),
  ])

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 pb-20 lg:pb-0 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-900/20 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-900/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />
      
      <FooterClient>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Company Info */}
          <div className="footer-column lg:col-span-1 opacity-0">
            <Link href="/" className="inline-block mb-6">
              {settings?.logo?.asset ? (
                <Image
                  src={urlFor(settings.logo.asset).width(150).height(40).url()}
                  alt={settings.logo.alt || settings.siteName || 'Logo'}
                  width={150}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-2xl font-bold text-white">
                  {settings?.siteName || 'TaksTek'}
                </span>
              )}
            </Link>
            {settings?.siteDescription && (
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {settings.siteDescription}
              </p>
            )}
            
            {/* Social Links */}
            {settings?.socialLinks && settings.socialLinks.length > 0 && (
              <div className="flex gap-3">
                {settings.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-primary-600 hover:text-white hover:scale-110 transition-all opacity-0"
                    aria-label={social.platform}
                  >
                    <SocialIcon platform={social.platform} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="footer-column opacity-0">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Yhteystiedot
            </h3>
            <ul className="space-y-4 text-sm">
              {settings?.contactInfo?.companyName && (
                <li className="font-medium text-white">
                  {settings.contactInfo.companyName}
                </li>
              )}
              {settings?.contactInfo?.phone && (
                <li>
                  <a
                    href={`tel:${settings.contactInfo.phone.replace(/\s/g, '')}`}
                    className="footer-link flex items-center gap-3 hover:text-primary-400 transition-colors opacity-0"
                  >
                    <Phone className="h-4 w-4 text-primary-500" />
                    {settings.contactInfo.phone}
                  </a>
                </li>
              )}
              {settings?.contactInfo?.email && (
                <li>
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="footer-link flex items-center gap-3 hover:text-primary-400 transition-colors opacity-0"
                  >
                    <Mail className="h-4 w-4 text-primary-500" />
                    {settings.contactInfo.email}
                  </a>
                </li>
              )}
              {settings?.contactInfo?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary-500 mt-0.5" />
                  <span className="whitespace-pre-line">{settings.contactInfo.address}</span>
                </li>
              )}
              <li className="flex items-center gap-3 text-gray-400">
                <Clock className="h-4 w-4 text-primary-500" />
                <span>Ma-Pe 8:00–17:00</span>
              </li>
            </ul>
            
            {/* Legal Info */}
            <div className="mt-6 pt-4 border-t border-gray-800 text-xs text-gray-500">
              {settings?.contactInfo?.vatNumber && (
                <p className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  Y-tunnus: {settings.contactInfo.vatNumber}
                </p>
              )}
            </div>
          </div>

          {/* Service Areas */}
          <div className="footer-column opacity-0">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Palvelualueet
            </h3>
            <ul className="space-y-2 text-sm">
              {serviceAreas.map((area, index) => (
                <li key={index} className="footer-link flex items-center gap-2 opacity-0">
                  <CheckCircle className="h-3.5 w-3.5 text-primary-500" />
                  {area}
                </li>
              ))}
              <li className="text-gray-500 italic mt-4">
                + muut Pohjois-Pohjanmaan kunnat
              </li>
            </ul>
          </div>

          {/* Brands & Navigation */}
          <div className="footer-column opacity-0">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Asennettavat merkit
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {brands.map((brand, index) => (
                <span 
                  key={index}
                  className="footer-link text-xs bg-gray-800 hover:bg-primary-600 px-3 py-1.5 rounded-full transition-colors cursor-default opacity-0"
                >
                  {brand}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigointi
            </h3>
            <ul className="space-y-2">
              {navigation?.items?.map((item, index) => (
                <li key={index}>
                  <Link
                    href={getHref(item)}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="footer-link text-sm hover:text-primary-400 transition-colors opacity-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom border-t border-gray-800 opacity-0">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} {settings?.siteName || 'TaksTek Oy'}. Kaikki oikeudet pidätetään.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Tietosuojaseloste
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Ehdot
              </Link>
            </div>
          </div>
        </div>
      </div>
      </FooterClient>
    </footer>
  )
}
