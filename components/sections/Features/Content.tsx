'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================
export type BackgroundColor = 'white' | 'gray' | 'primary'
export type ColumnCount = 2 | 3 | 4

export interface FeatureLink {
  linkType?: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}

export interface FeatureItem {
  title: string
  description?: string
  icon?: string
  imageUrl?: string
  link?: FeatureLink
}

export interface FeaturesContentProps {
  heading?: string
  subheading?: string
  features?: FeatureItem[]
  columns?: ColumnCount
  backgroundColor?: BackgroundColor
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function getHref(link?: FeatureLink): string | null {
  if (!link) return null
  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl
  }
  if (link.internalLink?.isHomepage) {
    return '/'
  }
  if (link.internalLink?.slug?.current) {
    return `/${link.internalLink.slug.current}`
  }
  return null
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function DynamicIcon({ name, className }: { name?: string; className?: string }) {
  if (!name) return null
  
  // Convert to PascalCase for Lucide icon lookup
  const iconName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName]
  
  if (!Icon) return null
  return <Icon className={className} />
}

function FeatureCard({ feature }: { feature: FeatureItem }) {
  const { title, description, icon, imageUrl, link } = feature
  const href = getHref(link)

  const content = (
    <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-lg">
      {/* Icon or Image */}
      {imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="h-48 w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      ) : icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
          <DynamicIcon name={icon} className="h-6 w-6" />
        </div>
      ) : null}

      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
      
      {href && (
        <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-700">
          Learn more
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </div>
  )

  if (href) {
    const isExternal = link?.linkType === 'external' || link?.openInNewTab
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
    return <Link href={href}>{content}</Link>
  }

  return content
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function FeaturesContent({
  heading,
  subheading,
  features,
  columns = 3,
  backgroundColor = 'white',
}: FeaturesContentProps) {
  
  const bgClasses: Record<BackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }

  const gridClasses: Record<ColumnCount, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className={cn('py-16 md:py-24', bgClasses[backgroundColor])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <div className="mb-12 text-center max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-4 text-lg text-gray-600">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className={cn('grid gap-6', gridClasses[columns])}>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
