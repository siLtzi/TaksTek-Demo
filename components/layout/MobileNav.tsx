'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { NavItem } from '@/types/sanity'
import { Button } from '@/components/ui/Button'

interface MobileNavProps {
  items: NavItem[]
  phone?: string
  isScrolled?: boolean
}

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

export function MobileNav({ items, phone, isScrolled = false }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mount check for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Use CMS items or default items
  const navItems = items?.length > 0 ? items : null

  // Menu content to be portaled
  const menuContent = (
    <>
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Slide-in Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900 z-[9999] shadow-2xl transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Sulje valikko"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Nav Links */}
          <div className="flex-1 flex flex-col gap-1">
            {navItems ? (
              navItems.map((item, index) => (
                <Link
                  key={index}
                  href={getHref(item)}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-lg font-medium text-white/80 transition-colors hover:text-white py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            ) : (
              defaultNavItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-medium text-white/80 transition-colors hover:text-white py-3 px-4 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>
          
          {/* Mobile Menu CTAs */}
          <div className="mt-auto pt-6 border-t border-white/20 flex flex-col gap-3">
            {phone && (
              <Button
                href={`tel:${phone.replace(/\s/g, '')}`}
                variant="outline"
                size="lg"
                icon={<Phone className="h-5 w-5" />}
                className="w-full justify-center border-white/30 text-white hover:bg-white/10"
              >
                {phone}
              </Button>
            )}
            <Button
              href="https://wa.me/358401234567"
              variant="whatsapp"
              size="lg"
              icon={<img src="/icon/whatsapp.svg" alt="" className="h-5 w-5" />}
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </Button>
            <Button
              href="#contact"
              variant="accent"
              size="lg"
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              Pyydä tarjous
            </Button>
          </div>
        </nav>
      </div>
    </>
  )

  return (
    <>
      <div className="lg:hidden flex items-center gap-3">
        {/* Animated Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
            isScrolled 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          }`}
          aria-label={isOpen ? 'Sulje valikko' : 'Avaa valikko'}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isOpen ? 'opacity-0 scale-0' : ''}`}
            />
            <span 
              className={`block h-0.5 rounded-full transition-all duration-300 ${
                isScrolled ? 'bg-gray-700' : 'bg-white'
              } ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* Portal the menu to document body to escape stacking context */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  )
}
