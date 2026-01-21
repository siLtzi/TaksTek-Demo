import ValuePropositionContent from './Content'

interface ValuePropositionSectionProps {
  section?: {
    heading?: string
    subheading?: string
    values?: {
      icon?: string
      title: string
      description?: string
    }[]
  }
}

export default function ValueProposition({ section }: ValuePropositionSectionProps) {
  return (
    <ValuePropositionContent
      heading={section?.heading}
      subheading={section?.subheading}
      values={section?.values}
    />
  )
}
