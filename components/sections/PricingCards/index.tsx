import PricingCardsContent from './Content'

interface PricingCardsSectionProps {
  section?: {
    heading?: string
    subheading?: string
    cards?: {
      title: string
      price: string
      priceLabel?: string
      features?: string[]
      ctaText?: string
      featured?: boolean
    }[]
  }
}

export default function PricingCards({ section }: PricingCardsSectionProps) {
  return (
    <PricingCardsContent
      heading={section?.heading}
      subheading={section?.subheading}
      cards={section?.cards}
    />
  )
}
