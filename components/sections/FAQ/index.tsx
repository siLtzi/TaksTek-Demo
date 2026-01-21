import { FAQSection as FAQSectionType } from '@/types/sanity'
import FAQContent from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface FAQProps {
  section: FAQSectionType
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function FAQ({ section }: FAQProps) {
  const { heading, subheading, faqs, backgroundColor = 'white' } = section

  return (
    <FAQContent
      heading={heading}
      subheading={subheading}
      faqs={faqs}
      backgroundColor={backgroundColor}
    />
  )
}
