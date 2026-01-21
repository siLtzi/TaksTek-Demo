'use client'

import { useState } from 'react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

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
  onToggle 
}: { 
  faq: FAQItem
  isOpen: boolean
  onToggle: () => void 
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <span className="font-medium text-gray-900">{faq.question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-gray-500 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      
      {isOpen && faq.answer && (
        <div className="px-6 pb-6 text-gray-600">
          <PortableText value={faq.answer} components={portableTextComponents} />
        </div>
      )}
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
  backgroundColor = 'white',
}: FAQContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const bgClasses: Record<FAQBackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
  }

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={cn('py-16 md:py-24', bgClasses[backgroundColor])}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        {(heading || subheading) && (
          <div className="mb-12 text-center">
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

        {/* FAQ Items */}
        {faqs && faqs.length > 0 && (
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
