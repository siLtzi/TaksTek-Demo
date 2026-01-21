'use client'

import React, { useRef, useEffect } from 'react'
import { Banknote, Zap, Award, Wrench, ShieldCheck, HeartHandshake } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ============================================================================
// TYPES
// ============================================================================
export interface ValueItem {
  icon?: string
  title: string
  description?: string
}

export interface ValuePropositionContentProps {
  heading?: string
  subheading?: string
  values?: ValueItem[]
}

// ============================================================================
// ICON MAPPING
// ============================================================================
const iconMap: Record<string, React.ElementType> = {
  banknote: Banknote,
  price: Banknote,
  zap: Zap,
  speed: Zap,
  award: Award,
  expertise: Award,
  wrench: Wrench,
  service: Wrench,
  shield: ShieldCheck,
  trust: ShieldCheck,
  heart: HeartHandshake,
  care: HeartHandshake,
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================
const defaultValues: ValueItem[] = [
  {
    icon: 'banknote',
    title: 'Kilpailukykyinen',
    description: 'Kilpailukykyiset hinnat ilman piilokustannuksia. Saat aina selkeän erittelyn ennen työn alkua.',
  },
  {
    icon: 'zap',
    title: 'Tehokas',
    description: 'Asennus yleensä 1–3 päivässä. Kiireellisissä tapauksissa jopa saman päivän palvelu.',
  },
  {
    icon: 'award',
    title: 'Asiantunteva',
    description: 'Yli 10 vuoden kokemus LVI-alalta. Sertifioidut asentajat ja laadukkaat merkkituotteet.',
  },
]

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function ValueCard({ 
  value, 
  index 
}: { 
  value: ValueItem
  index: number 
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const IconComponent = iconMap[value.icon?.toLowerCase() || ''] || Award

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(cardRef.current,
        { 
          opacity: 0, 
          y: 80,
          rotateX: 15,
        },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Icon animation on scroll
      if (iconRef.current) {
        gsap.fromTo(iconRef.current,
          { scale: 0, rotation: -180 },
          { 
            scale: 1, 
            rotation: 0,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: 'back.out(1.7)',
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

  // Hover animation handlers
  const handleMouseEnter = () => {
    if (!cardRef.current || !iconRef.current) return
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(iconRef.current, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || !iconRef.current) return
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: 'power2.out',
    })
    gsap.to(iconRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative text-center p-8 md:p-10 bg-white rounded-3xl shadow-sm border border-gray-100 cursor-pointer group overflow-hidden opacity-0"
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon */}
      <div 
        ref={iconRef}
        className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 text-white mb-6 shadow-lg shadow-primary-500/30"
      >
        <IconComponent className="h-10 w-10" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="relative text-2xl font-bold text-gray-900 mb-4">
        {value.title}
      </h3>
      
      {/* Description */}
      {value.description && (
        <p className="relative text-gray-600 leading-relaxed">
          {value.description}
        </p>
      )}

      {/* Bottom line accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 group-hover:w-1/2 transition-all duration-500 rounded-full" />
    </div>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function ValuePropositionContent({
  heading = 'Miksi Takstek Oy?',
  subheading = 'Löydämme aina parhaat LVI-alan ratkaisut teille, asiakaslähtöisesti. Palveluihimme voit luottaa sillä teemme työt aina sovitun aikataulun mukaan - tehokkaasti, edullisesti ja asiantuntemuksella.',
  values = defaultValues,
}: ValuePropositionContentProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Heading animation
      if (headingRef.current) {
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
      }

      // Subheading animation
      if (subheadingRef.current) {
        gsap.fromTo(subheadingRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: subheadingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-100/30 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 opacity-0"
          >
            {heading}
          </h2>
          {subheading && (
            <p 
              ref={subheadingRef}
              className="text-lg md:text-xl text-gray-600 leading-relaxed opacity-0"
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Value Pillars */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
