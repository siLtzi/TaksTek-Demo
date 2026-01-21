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
      default: settings?.siteName || 'Your Website',
      template: `%s | ${settings?.siteName || 'Your Website'}`,
    },
    description: settings?.siteDescription || '',
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: 'website',
      siteName: settings?.siteName || 'Your Website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
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
    <html lang="en" className={inter.variable}>
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
