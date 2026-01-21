import { HeroSection as HeroSectionType } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import HeroContent from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface HeroProps {
  section: HeroSectionType
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function Hero({ section }: HeroProps) {
  const {
    heading,
    subheading,
    backgroundImage,
    backgroundOverlay,
    primaryCta,
    secondaryCta,
    alignment = 'center',
  } = section

  // Transform Sanity image to URL
  const backgroundImageUrl = backgroundImage?.asset 
    ? urlFor(backgroundImage.asset).width(1920).height(1080).url()
    : undefined

  return (
    <HeroContent
      heading={heading}
      subheading={subheading}
      backgroundImageUrl={backgroundImageUrl}
      backgroundOverlay={backgroundOverlay}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      alignment={alignment}
    />
  )
}
