import dynamic from 'next/dynamic'
import { Section, ContactInfo } from '@/types/sanity'

// ============================================================================
// DYNAMIC IMPORTS
// Using dynamic imports for better code splitting and performance
// ============================================================================
const Hero = dynamic(() => import('./Hero'))
const Text = dynamic(() => import('./Text'))
const Features = dynamic(() => import('./Features'))
const CTA = dynamic(() => import('./CTA'))
const Contact = dynamic(() => import('./Contact'))
const FAQ = dynamic(() => import('./FAQ'))

// ============================================================================
// TYPES
// ============================================================================
interface SectionRendererProps {
  sections?: Section[]
  contactInfo?: ContactInfo
}

// ============================================================================
// COMPONENT
// ============================================================================
export function SectionRenderer({ sections, contactInfo }: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return <Hero key={section._key} section={section} />
          case 'textSection':
            return <Text key={section._key} section={section} />
          case 'featuresSection':
            return <Features key={section._key} section={section} />
          case 'ctaSection':
            return <CTA key={section._key} section={section} />
          case 'contactSection':
            return <Contact key={section._key} section={section} contactInfo={contactInfo} />
          case 'faqSection':
            return <FAQ key={section._key} section={section} />
          default:
            console.warn(`Unknown section type: ${(section as Section)._type}`)
            return null
        }
      })}
    </>
  )
}
