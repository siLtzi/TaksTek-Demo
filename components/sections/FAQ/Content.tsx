'use client'

import { useState, useRef, useEffect } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { cn } from '@/lib/utils'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// ============================================================================
// TYPES
// ============================================================================
export type FAQBackgroundColor = 'white' | 'gray'

export interface FAQItem {
  question: string
  answer?: PortableTextBlock[]
}

export interface FAQContentProps {
  heading?: string
  subheading?: string
  faqs?: FAQItem[]
  backgroundColor?: FAQBackgroundColor
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  },
}

function FAQAccordionItem({ 
  faq, 
  isOpen, 
  onToggle,
  index,
}: { 
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemRef.current) return

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(itemRef.current,
        { 
          opacity: 0, 
          x: index % 2 === 0 ? -40 : 40,
        },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, itemRef)

    return () => ctx.revert()
  }, [index])

  // Animate content open/close
  useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(contentRef.current,
        { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }
      )
    }
  }, [isOpen])

  // Animate icon rotation
  useEffect(() => {
    if (!iconRef.current) return

    gsap.to(iconRef.current, {
      rotation: isOpen ? 180 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [isOpen])

  return (
    <div 
      ref={itemRef}
      className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group opacity-0"
    >
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between p-6 text-left transition-colors',
          isOpen ? 'bg-primary-50' : 'hover:bg-gray-50'
        )}
        aria-expanded={isOpen}
      >
        <span className={cn(
          'font-semibold pr-4 transition-colors',
          isOpen ? 'text-primary-700' : 'text-gray-900'
        )}>
          {faq.question}
        </span>
        <div 
          ref={iconRef}
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
            isOpen ? 'bg-primary-500 shadow-lg shadow-primary-500/30' : 'bg-gray-100 group-hover:bg-primary-100'
          )}
        >
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-colors',
              isOpen ? 'text-white' : 'text-gray-500 group-hover:text-primary-600'
            )}
          />
        </div>
      </button>
      
      <div 
        ref={contentRef}
        className="overflow-hidden h-0 opacity-0"
      >
        {faq.answer && (
          <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            <PortableText value={faq.answer} components={portableTextComponents} />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function FAQContent({
  heading,
  subheading,
  faqs,
  backgroundColor = 'gray',
}: FAQContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const bgClasses: Record<FAQBackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
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
      <div className="absolute top-20 left-0 w-96 h-96 bg-primary-100/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-primary-100/30 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        {(heading || subheading) && (
          <div ref={headerRef} className="mb-16 text-center opacity-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-6">
              <HelpCircle className="w-8 h-8" />
            </div>
            {heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-gray-600">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* FAQ Items */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Etkö löytänyt vastausta kysymykseesi?</p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 transform duration-300"
          >
            Ota yhteyttä
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
