'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Phone, ArrowRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const decorRef = useRef<HTMLDivElement>(null)
  
  const bgClasses: Record<CTABackgroundColor, string> = {
    primary: 'bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700',
    dark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    light: 'bg-gradient-to-br from-gray-100 to-gray-50',
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

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Content reveal animation
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Heading animation
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Text animation
      if (textRef.current) {
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.7,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Buttons animation
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('a, button')
        gsap.fromTo(buttons,
          { opacity: 0, y: 30, scale: 0.9 },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.6,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Decorative element animation
      if (decorRef.current) {
        gsap.fromTo(decorRef.current,
          { opacity: 0, scale: 0 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        )

        // Floating animation
        gsap.to(decorRef.current, {
          y: 20,
          rotation: 5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className={cn('relative py-20 md:py-32 overflow-hidden', bgClasses[backgroundColor])}
    >
      {/* Background Image */}
      {backgroundImageUrl && (
        <>
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-primary-900/90" />
        </>
      )}

      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={decorRef} className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div 
          ref={contentRef}
          className="max-w-4xl mx-auto text-center opacity-0"
        >
          {/* Separator line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-current opacity-30" />
            <span className={cn(
              'text-sm uppercase tracking-widest font-medium',
              backgroundImageUrl ? 'text-white/70' : subtextColorClasses[backgroundColor]
            )}>
              TAI
            </span>
            <div className="h-px w-12 bg-current opacity-30" />
          </div>

          <h2 
            ref={headingRef}
            className={cn(
              'text-3xl font-bold md:text-5xl lg:text-6xl leading-tight opacity-0', 
              backgroundImageUrl ? 'text-white' : textColorClasses[backgroundColor]
            )}
          >
            {heading}
          </h2>
          
          {text && (
            <p 
              ref={textRef}
              className={cn(
                'mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto opacity-0', 
                backgroundImageUrl ? 'text-gray-200' : subtextColorClasses[backgroundColor]
              )}
            >
              {text}
            </p>
          )}

          {/* Buttons */}
          {(primaryButton?.text || secondaryButton?.text) && (
            <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              {primaryButton?.text && (
                <Button 
                  link={primaryButton.link} 
                  variant="accent"
                  size="lg"
                  pill
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="text-lg px-10 py-6 shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300 group"
                >
                  {primaryButton.text}
                </Button>
              )}
              {secondaryButton?.text && (
                <Button 
                  link={secondaryButton.link} 
                  variant="outline"
                  size="lg"
                  pill
                  icon={<Phone className="w-5 h-5" />}
                  className={cn(
                    'hover:scale-105 transition-all duration-300',
                    (backgroundImageUrl || backgroundColor !== 'light') && 
                    'border-white/30 text-white hover:bg-white/10 hover:border-white/50'
                  )}
                >
                  {secondaryButton.text}
                </Button>
              )}
            </div>
          )}

          {/* Trust indicator */}
          <p className={cn(
            'mt-8 text-sm flex items-center justify-center gap-2',
            backgroundImageUrl ? 'text-white/60' : subtextColorClasses[backgroundColor]
          )}>
            <span className="inline-flex w-5 h-5 rounded-full bg-white/20 items-center justify-center">
              <span className="text-xs">✓</span>
            </span>
            Ilmainen arvio ja tarjous 24h sisällä
          </p>
        </div>
      </div>
    </section>
  )
}
