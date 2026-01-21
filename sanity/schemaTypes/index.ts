import { type SchemaTypeDefinition } from 'sanity'

// Documents
import { siteSettings } from './documents/siteSettings'
import { page } from './documents/page'
import { navigation } from './documents/navigation'

// Objects
import { seo } from './objects/seo'
import { link } from './objects/link'
import { socialLink } from './objects/socialLink'
import { contactInfo } from './objects/contactInfo'

// Sections
import { heroSection } from './sections/heroSection'
import { textSection } from './sections/textSection'
import { featuresSection } from './sections/featuresSection'
import { ctaSection } from './sections/ctaSection'
import { contactSection } from './sections/contactSection'
import { faqSection } from './sections/faqSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    siteSettings,
    page,
    navigation,
    
    // Objects
    seo,
    link,
    socialLink,
    contactInfo,
    
    // Sections
    heroSection,
    textSection,
    featuresSection,
    ctaSection,
    contactSection,
    faqSection,
  ],
}
