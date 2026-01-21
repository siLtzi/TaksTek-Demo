import { CTASection as CTASectionType } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import CTAContent from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface CTAProps {
  section: CTASectionType
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function CTA({ section }: CTAProps) {
  const {
    heading,
    text,
    primaryButton,
    secondaryButton,
    backgroundImage,
    backgroundColor = 'primary',
  } = section

  // Transform Sanity image to URL
  const backgroundImageUrl = backgroundImage?.asset
    ? urlFor(backgroundImage.asset).width(1920).height(600).url()
    : undefined

  return (
    <CTAContent
      heading={heading}
      text={text}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      backgroundImageUrl={backgroundImageUrl}
      backgroundColor={backgroundColor}
    />
  )
}
