'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// ============================================================================
// TYPES
// ============================================================================
export type HeroAlignment = 'left' | 'center' | 'right'

export interface HeroCTA {
  text?: string
  link?: {
    linkType?: 'internal' | 'external'
    internalLink?: {
      slug?: { current: string }
      isHomepage?: boolean
    }
    externalUrl?: string
    openInNewTab?: boolean
  }
}

export interface HeroContentProps {
  heading: string
  subheading?: string
  backgroundImageUrl?: string
  backgroundOverlay?: boolean
  primaryCta?: HeroCTA
  secondaryCta?: HeroCTA
  alignment?: HeroAlignment
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function HeroContent({
  heading,
  subheading,
  backgroundImageUrl,
  backgroundOverlay = false,
  primaryCta,
  secondaryCta,
  alignment = 'center',
}: HeroContentProps) {
  
  const alignmentClasses: Record<HeroAlignment, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image */}
      {backgroundImageUrl && (
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      
      {/* Overlay */}
      {backgroundOverlay && (
        <div className="absolute inset-0 bg-black/50" />
      )}

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24">
        <div className={cn(
          'flex flex-col gap-6 max-w-3xl',
          alignmentClasses[alignment],
          alignment === 'center' && 'mx-auto',
          alignment === 'right' && 'ml-auto',
        )}>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            {heading}
          </h1>
          
          {subheading && (
            <p className="text-lg text-gray-200 sm:text-xl max-w-2xl">
              {subheading}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryCta?.text || secondaryCta?.text) && (
            <div className={cn(
              'flex flex-wrap gap-4 mt-4',
              alignment === 'center' && 'justify-center',
              alignment === 'right' && 'justify-end',
            )}>
              {primaryCta?.text && (
                <Button link={primaryCta.link} variant="primary" size="lg">
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta?.text && (
                <Button 
                  link={secondaryCta.link} 
                  variant="outline" 
                  size="lg" 
                  className="text-white border-white hover:bg-white/10"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
