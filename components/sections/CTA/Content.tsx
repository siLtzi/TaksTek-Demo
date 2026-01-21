'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

// ============================================================================
// TYPES
// ============================================================================
export type CTABackgroundColor = 'primary' | 'dark' | 'light'

export interface CTAButtonLink {
  linkType?: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}

export interface CTAButton {
  text: string
  link?: CTAButtonLink
}

export interface CTAContentProps {
  heading: string
  text?: string
  primaryButton?: CTAButton
  secondaryButton?: Partial<CTAButton>
  backgroundImageUrl?: string
  backgroundColor?: CTABackgroundColor
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function CTAContent({
  heading,
  text,
  primaryButton,
  secondaryButton,
  backgroundImageUrl,
  backgroundColor = 'primary',
}: CTAContentProps) {
  
  const bgClasses: Record<CTABackgroundColor, string> = {
    primary: 'bg-primary-600',
    dark: 'bg-gray-900',
    light: 'bg-gray-100',
  }

  const textColorClasses: Record<CTABackgroundColor, string> = {
    primary: 'text-white',
    dark: 'text-white',
    light: 'text-gray-900',
  }

  const subtextColorClasses: Record<CTABackgroundColor, string> = {
    primary: 'text-primary-100',
    dark: 'text-gray-300',
    light: 'text-gray-600',
  }

  return (
    <section className={cn('relative py-16 md:py-24 overflow-hidden', bgClasses[backgroundColor])}>
      {/* Background Image */}
      {backgroundImageUrl && (
        <>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className={cn(
            'text-3xl font-bold md:text-4xl', 
            backgroundImageUrl ? 'text-white' : textColorClasses[backgroundColor]
          )}>
            {heading}
          </h2>
          
          {text && (
            <p className={cn(
              'mt-4 text-lg', 
              backgroundImageUrl ? 'text-gray-200' : subtextColorClasses[backgroundColor]
            )}>
              {text}
            </p>
          )}

          {/* Buttons */}
          {(primaryButton?.text || secondaryButton?.text) && (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {primaryButton?.text && (
                <Button 
                  link={primaryButton.link} 
                  variant={backgroundColor === 'light' ? 'primary' : 'secondary'}
                  size="lg"
                >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton?.text && (
                <Button 
                  link={secondaryButton.link} 
                  variant="outline"
                  size="lg"
                  className={cn(
                    (backgroundImageUrl || backgroundColor !== 'light') && 
                    'text-white border-white hover:bg-white/10'
                  )}
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
