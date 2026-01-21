import { TextSection as TextSectionType } from '@/types/sanity'
import TextContent from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface TextProps {
  section: TextSectionType
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function Text({ section }: TextProps) {
  const { heading, content, backgroundColor = 'white', maxWidth = 'medium' } = section

  return (
    <TextContent
      heading={heading}
      content={content}
      backgroundColor={backgroundColor}
      maxWidth={maxWidth}
    />
  )
}
