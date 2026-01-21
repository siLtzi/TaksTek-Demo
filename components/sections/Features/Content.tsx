'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
  
  const iconName = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[iconName]
  
  if (!Icon) return null
  return <Icon className={className} />
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const { title, description, icon, imageUrl, link } = feature
  const href = getHref(link)
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Staggered entrance animation
      gsap.fromTo(cardRef.current,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95,
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Icon pop animation
      if (iconRef.current) {
        gsap.fromTo(iconRef.current,
          { scale: 0, rotation: -90 },
          { 
            scale: 1, 
            rotation: 0,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    }, cardRef)

    return () => ctx.revert()
  }, [index])

  // Hover animations
  const handleMouseEnter = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      duration: 0.3,
      ease: 'power2.out',
    })
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1.1,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    })
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const content = (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group rounded-3xl border border-gray-100 bg-white p-8 transition-colors hover:border-primary-200 shadow-sm opacity-0 relative overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon or Image */}
      {imageUrl ? (
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ) : icon ? (
        <div 
          ref={iconRef}
          className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
        >
          <DynamicIcon name={icon} className="h-8 w-8" />
        </div>
      ) : null}

      <h3 className="relative mb-3 text-xl font-bold text-gray-900">{title}</h3>
      
      {description && (
        <p className="relative text-gray-600 leading-relaxed">{description}</p>
      )}
      
      {href && (
        <span className="relative mt-6 inline-flex items-center text-sm font-semibold text-primary-600 group-hover:text-primary-700">
          Lue lisää
          <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 group-hover:w-full transition-all duration-500" />
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
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  
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

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={cn('py-20 md:py-32 relative overflow-hidden', bgClasses[backgroundColor])}>
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {(heading || subheading) && (
          <div ref={headingRef} className="mb-16 text-center max-w-3xl mx-auto opacity-0">
            {heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-6">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        {features && features.length > 0 && (
          <div className={cn('grid gap-8', gridClasses[columns])}>
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
