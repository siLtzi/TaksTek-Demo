'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Phone, Shield, Clock, Star, ChevronDown } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
  videoUrl?: string
  backgroundOverlay?: boolean
  primaryCta?: HeroCTA
  secondaryCta?: HeroCTA
  alignment?: HeroAlignment
  phone?: string
  trustBadges?: string[]
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function TrustBadge({ icon: Icon, text, delay }: { icon: React.ElementType; text: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current, 
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 1.2 + delay, ease: 'power2.out' }
    )
  }, [delay])

  return (
    <div 
      ref={ref}
      className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 opacity-0"
    >
      <Icon className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary-400 flex-shrink-0" />
      <span className="text-xs md:text-sm whitespace-nowrap">{text}</span>
    </div>
  )
}

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    const words = text.split(' ')
    ref.current.innerHTML = words.map(word => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`).join(' ')
    
    const spans = ref.current.querySelectorAll('span > span')
    gsap.to(spans, {
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      delay: delay,
      ease: 'power3.out',
    })
  }, [text, delay])

  return <span ref={ref} className={className}>{text}</span>
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function HeroContent({
  heading,
  subheading,
  videoUrl = '/video/TaksTekHero.mp4',
  backgroundOverlay = true,
  primaryCta,
  secondaryCta,
  alignment = 'left',
  phone = '040 123 4567',
  trustBadges = ['10+ vuotta kokemusta', 'Nopeat toimitukset', 'Tyytyväisyystakuu'],
}: HeroContentProps) {
  
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const microRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial video scale animation
      if (videoRef.current) {
        gsap.fromTo(videoRef.current,
          { scale: 1.2 },
          { scale: 1, duration: 2, ease: 'power2.out' }
        )
      }

      // Overlay reveal
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: 'power2.out' }
        )
      }

      // Subheading fade in
      if (subheadingRef.current) {
        gsap.fromTo(subheadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
        )
      }

      // Location badge
      if (locationRef.current) {
        gsap.fromTo(locationRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, delay: 1.6, ease: 'power2.out' }
        )
      }

      // CTA buttons stagger
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button')
        gsap.fromTo(buttons,
          { opacity: 0, y: 40, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, delay: 1.8, ease: 'back.out(1.4)' }
        )
      }

      // Micro text
      if (microRef.current) {
        gsap.fromTo(microRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, delay: 2.2, ease: 'power2.out' }
        )
      }

      // Scroll indicator bounce
      if (scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, delay: 2.5, ease: 'power2.out' }
        )
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 3,
        })
      }

      // Parallax on scroll
      if (sectionRef.current && videoRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            if (videoRef.current) {
              gsap.set(videoRef.current, { y: self.progress * 150 })
            }
            if (contentRef.current) {
              gsap.set(contentRef.current, { y: self.progress * -50, opacity: 1 - self.progress * 0.5 })
            }
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const alignmentClasses: Record<HeroAlignment, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden bg-gray-900">
      {/* Video Background with Gradient Mask */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110"
          src={videoUrl}
        />
      </div>
      
      {/* Animated Gradient Overlay */}
      {backgroundOverlay && (
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/70 to-primary-900/40 opacity-0"
        />
      )}

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glowing orb effect */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div ref={contentRef} className="container relative z-10 mx-auto px-4 pt-32 md:pt-36 pb-16 md:pb-24">
        <div className={cn(
          'flex flex-col gap-6 max-w-3xl',
          alignmentClasses[alignment],
          alignment === 'center' && 'mx-auto',
          alignment === 'right' && 'ml-auto',
        )}>
          {/* Trust Badges - Column on mobile, row on desktop */}
          <div className={cn(
            'flex flex-col md:flex-row gap-2 md:gap-3 mb-4',
            alignment === 'center' && 'md:justify-center items-center md:items-start',
            alignment === 'right' && 'md:justify-end items-end md:items-start',
            alignment === 'left' && 'items-start',
          )}>
            <TrustBadge 
              icon={Star} 
              text="10+ vuotta kokemusta"
              delay={0}
            />
            <TrustBadge 
              icon={Clock} 
              text="Nopeat toimitukset"
              delay={0.1}
            />
            <TrustBadge 
              icon={Shield} 
              text="Tyytyväisyystakuu"
              delay={0.2}
            />
          </div>

          {/* Headline with animated text reveal */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1]">
            <AnimatedText text={heading} delay={0.3} />
          </h1>
          
          {/* Subheadline */}
          {subheading && (
            <p 
              ref={subheadingRef}
              className="text-lg text-gray-300 sm:text-xl lg:text-2xl leading-relaxed max-w-2xl opacity-0"
            >
              {subheading}
            </p>
          )}

          {/* Local Trust Proof */}
          <div 
            ref={locationRef}
            className="flex items-center gap-2 text-primary-400 font-medium opacity-0"
          >
            <div className="relative">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="absolute inset-0 animate-ping opacity-75">
                <svg className="h-5 w-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            <span>Palvelemme Oulussa ja lähialueilla</span>
          </div>

          {/* CTA Block with hover effects */}
          <div 
            ref={ctaRef}
            className={cn(
              'flex flex-col sm:flex-row flex-wrap gap-4 mt-8',
              alignment === 'center' && 'justify-center',
              alignment === 'right' && 'justify-end',
            )}
          >
            {/* Primary CTA */}
            <Button 
              href="#contact"
              variant="accent"
              size="lg"
              pill
              className="text-lg px-10 py-6 shadow-xl shadow-accent-500/30 hover:shadow-2xl hover:shadow-accent-500/40 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10">{primaryCta?.text || 'Pyydä ilmainen tarjous'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            {/* Secondary CTA - Phone */}
            <Button
              href={`tel:${phone.replace(/\s/g, '')}`}
              variant="outline"
              size="lg"
              pill
              icon={<Phone className="h-8 w-8" />}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              {secondaryCta?.text || 'Soita suoraan'}
            </Button>

            {/* Tertiary CTA - WhatsApp */}
            <Button
              href="https://wa.me/358401234567"
              variant="whatsapp"
              size="md"
              pill
              icon={<img src="/icon/whatsapp.svg" alt="" className="h-8 w-8" />}
              className="sm:ml-auto hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/20"
            >
              WhatsApp
            </Button>
          </div>

          {/* Micro-conversion hint */}
          <p ref={microRef} className="text-sm text-gray-400 mt-2 opacity-0 flex items-center gap-2">
            <span className="inline-flex w-5 h-5 rounded-full bg-primary-500/20 items-center justify-center">
              <span className="text-primary-400 text-xs">✓</span>
            </span>
            Vastaamme tarjouspyyntöihin 24h sisällä
          </p>
        </div>
      </div>

      {/* Scroll Indicator - Corner on mobile, center on desktop */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-4 md:bottom-8 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 opacity-0 cursor-pointer hover:text-white hover:bg-white/20 transition-all"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <ChevronDown className="h-6 w-6 md:h-7 md:w-7" />
      </div>
    </section>
  )
}
