import TrustElementsContent from './Content'

interface TrustElementsSectionProps {
  section?: {
    heading?: string
    showBrands?: boolean
    showReviews?: boolean
    showServiceAreas?: boolean
  }
}

export default function TrustElements({ section }: TrustElementsSectionProps) {
  return (
    <TrustElementsContent
      heading={section?.heading}
      showBrands={section?.showBrands}
      showReviews={section?.showReviews}
      showServiceAreas={section?.showServiceAreas}
    />
  )
}
