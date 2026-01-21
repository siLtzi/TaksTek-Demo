'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { NavItem } from '@/types/sanity'

interface MobileNavProps {
  items: NavItem[]
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

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white p-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {items.map((item, index) => (
              <Link
                key={index}
                href={getHref(item)}
                target={item.openInNewTab ? '_blank' : undefined}
                rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-base font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
