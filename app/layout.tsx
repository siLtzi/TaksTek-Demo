import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CookieNotice } from '@/components/ui/CookieNotice'
import { DraftModeIndicator } from '@/components/ui/DraftModeIndicator'
import { getSiteSettings } from '@/sanity/lib/fetchers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  return {
    title: {
      default: settings?.siteName || 'TaksTek - LVI ja Ilmalämpöpumput Oulussa',
      template: `%s | ${settings?.siteName || 'TaksTek'}`,
    },
    description: settings?.siteDescription || 'Ilmalämpöpumppujen asennukset, LVI-palvelut ja huollot Oulussa ja lähialueilla. Nopea ja luotettava palvelu yli 10 vuoden kokemuksella.',
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      siteName: settings?.siteName || 'TaksTek',
      locale: 'fi_FI',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  
  return (
    <html lang="fi" className={inter.variable}>
      <head>
        {/* Local Business Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HVACBusiness",
              "name": settings?.siteName || "TaksTek Oy",
              "description": settings?.siteDescription || "Ilmalämpöpumppujen asennukset ja LVI-palvelut Oulussa",
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "telephone": settings?.contactInfo?.phone,
              "email": settings?.contactInfo?.email,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Oulu",
                "addressRegion": "Pohjois-Pohjanmaa",
                "addressCountry": "FI"
              },
              "areaServed": [
                "Oulu", "Kempele", "Haukipudas", "Kiiminki", 
                "Oulunsalo", "Liminka", "Muhos", "Tyrnävä", "Ii"
              ],
              "priceRange": "€€",
              "openingHours": "Mo-Fr 08:00-17:00"
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white font-sans antialiased">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieNotice 
          enabled={settings?.cookieNotice?.enabled}
          text={settings?.cookieNotice?.text}
          linkText={settings?.cookieNotice?.linkText}
        />
        <DraftModeIndicator />
      </body>
    </html>
  )
}
