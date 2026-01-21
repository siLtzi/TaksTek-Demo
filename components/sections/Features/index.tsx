import { FeaturesSection as FeaturesSectionType } from '@/types/sanity'
import { urlFor } from '@/sanity/lib/client'
import FeaturesContent, { FeatureItem } from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface FeaturesProps {
  section: FeaturesSectionType
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function Features({ section }: FeaturesProps) {
  const { 
    heading, 
    subheading, 
    features, 
    columns = 3, 
    backgroundColor = 'white' 
  } = section

  // Transform Sanity features to content props
  const transformedFeatures: FeatureItem[] | undefined = features?.map((feature) => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon,
    imageUrl: feature.image?.asset 
      ? urlFor(feature.image.asset).width(400).height(300).url()
      : undefined,
    link: feature.link,
  }))

  return (
    <FeaturesContent
      heading={heading}
      subheading={subheading}
      features={transformedFeatures}
      columns={columns}
      backgroundColor={backgroundColor}
    />
  )
}
