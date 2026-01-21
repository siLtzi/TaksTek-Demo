import { ContactSection as ContactSectionType, ContactInfo } from '@/types/sanity'
import ContactContent from './Content'

// ============================================================================
// TYPES
// ============================================================================
interface ContactProps {
  section: ContactSectionType
  contactInfo?: ContactInfo
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function Contact({ section, contactInfo }: ContactProps) {
  const {
    heading,
    text,
    showContactInfo = true,
    showContactForm = true,
    formFields,
    formAction,
    submitButtonText = 'Send Message',
    successMessage = 'Thank you for your message!',
    backgroundColor = 'gray',
  } = section

  return (
    <ContactContent
      heading={heading}
      text={text}
      showContactInfo={showContactInfo}
      showContactForm={showContactForm}
      contactInfo={contactInfo}
      formFields={formFields}
      formAction={formAction}
      submitButtonText={submitButtonText}
      successMessage={successMessage}
      backgroundColor={backgroundColor}
    />
  )
}
