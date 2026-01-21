import { HeroSection as HeroSectionType } from '@/types/sanity'
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
    backgroundOverlay,
    primaryCta,
    secondaryCta,
    alignment = 'center',
  } = section

  return (
    <HeroContent
      heading={heading}
      subheading={subheading}
      backgroundOverlay={backgroundOverlay}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      alignment={alignment}
    />
  )
}
