'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { urlFor } from '@/sanity/lib/client'
import { NavItem, SiteSettings, Navigation as NavigationType } from '@/types/sanity'
import { MobileNav } from './MobileNav'
import { Button } from '@/components/ui/Button'
import { TakstekLogo } from '@/components/ui/TakstekLogo'
import { gsap } from '@/lib/gsap'

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

// Default navigation items when none provided from CMS
const defaultNavItems = [
  { label: 'Etusivu', href: '/' },
  { label: 'Palvelut', href: '#services' },
  { label: 'Hinnasto', href: '#pricing' },
  { label: 'UKK', href: '#faq' },
  { label: 'Yhteystiedot', href: '#contact' },
]

interface HeaderClientProps {
  settings: SiteSettings | null
  navigation: NavigationType | null
}

export function HeaderClient({ settings, navigation }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate header shape change on scroll
  useEffect(() => {
    if (!headerRef.current || !innerRef.current) return

    if (isScrolled) {
      // Scrolled state - compact, with background
      gsap.to(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(innerRef.current, {
        height: 64,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      // Top of page - transparent, taller
      gsap.to(headerRef.current, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.4,
        ease: 'power2.out',
      })
      gsap.to(innerRef.current, {
        height: 80,
        paddingTop: 8,
        paddingBottom: 8,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [isScrolled])

  // Initial animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation with path drawing effect
      if (logoRef.current) {
        // Fade in the container first
        gsap.fromTo(logoRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, delay: 0.1, ease: 'power2.out' }
        )
        
        // Animate logo paths with stagger
        const logoPaths = logoRef.current.querySelectorAll('.logo-path')
        if (logoPaths.length > 0) {
          // Swooshes first
          const swooshes = logoRef.current.querySelectorAll('.logo-swoosh')
          gsap.fromTo(swooshes,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.2, ease: 'back.out(1.7)' }
          )
          
          // Tools next
          const tools = logoRef.current.querySelectorAll('.logo-tool')
          gsap.fromTo(tools,
            { opacity: 0, y: -10, rotation: -15 },
            { opacity: 1, y: 0, rotation: 0, duration: 0.5, stagger: 0.1, delay: 0.4, ease: 'back.out(1.7)' }
          )
          
          // LVI text
          const lvi = logoRef.current.querySelectorAll('.logo-lvi')
          gsap.fromTo(lvi,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.6, ease: 'power2.out' }
          )
          
          // TAKSTEK text
          const takstek = logoRef.current.querySelectorAll('.logo-takstek')
          gsap.fromTo(takstek,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, delay: 0.7, ease: 'power2.out' }
          )
        }
      }

      // Navigation links stagger
      if (navRef.current) {
        const links = navRef.current.querySelectorAll('a')
        gsap.fromTo(links,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
        )
      }

      // CTA buttons
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, delay: 0.5, ease: 'back.out(1.7)' }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  // Get navigation items from CMS or use defaults
  const navItems = navigation?.items?.length 
    ? navigation.items 
    : null

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    >
      <div 
        ref={innerRef}
        className="container mx-auto flex items-center justify-between px-4"
        style={{ height: 80 }}
      >
        {/* Logo */}
        <Link 
          ref={logoRef} 
          href="/" 
          className="flex items-center gap-2 opacity-0 group relative z-10"
        >
          {settings?.logo?.asset ? (
            <Image
              src={urlFor(settings.logo.asset).width(180).height(50).url()}
              alt={settings.logo.alt || settings.siteName || 'Logo'}
              width={180}
              height={50}
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
              priority
            />
          ) : (
            <TakstekLogo 
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
              color={isScrolled ? '#1a1a1a' : '#ffffff'}
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden lg:flex items-center gap-1">
          {navItems ? (
            // CMS navigation
            navItems.map((item, index) => (
              <Link
                key={index}
                href={getHref(item)}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all opacity-0 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))
          ) : (
            // Default navigation
            defaultNavItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all opacity-0 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))
          )}
        </nav>

        {/* Desktop CTA */}
        <div ref={ctaRef} className="hidden lg:flex items-center gap-3 opacity-0">
          <a 
            href={`tel:${settings?.contactInfo?.phone?.replace(/\s/g, '') || '0401234567'}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isScrolled
                ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }`}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{settings?.contactInfo?.phone || '040 123 4567'}</span>
          </a>
          <Button 
            href="#contact"
            variant="accent"
            size="md"
            pill
            className="shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:scale-105 transition-all duration-300"
          >
            Pyydä tarjous
          </Button>
        </div>

        {/* Mobile Navigation */}
        <MobileNav 
          items={navigation?.items || []} 
          phone={settings?.contactInfo?.phone}
          isScrolled={isScrolled}
        />
      </div>
    </header>
  )
}
