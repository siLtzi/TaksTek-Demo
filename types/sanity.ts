import { PortableTextBlock } from '@portabletext/types'

// Site Settings
export interface SiteSettings {
  siteName: string
  siteDescription?: string
  logo?: {
    asset: SanityImage
    alt?: string
  }
  favicon?: {
    asset: SanityImage
  }
  ogImage?: {
    asset: SanityImage
  }
  socialLinks?: SocialLink[]
  contactInfo?: ContactInfo
  footerText?: string
  cookieNotice?: {
    enabled: boolean
    text?: string
    linkText?: string
  }
}

export interface SanityImage {
  _id: string
  url: string
  metadata?: {
    dimensions: {
      width: number
      height: number
    }
  }
}

export interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok' | 'github'
  url: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
  companyName?: string
  vatNumber?: string
  chamberOfCommerce?: string
}

// Navigation
export interface Navigation {
  title: string
  identifier: 'header' | 'footer'
  items?: NavItem[]
}

export interface NavItem {
  label: string
  linkType: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}

// SEO
export interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: {
    asset: SanityImage
  }
  noIndex?: boolean
}

// Page
export interface Page {
  _id: string
  title: string
  slug?: { current: string }
  isHomepage?: boolean
  seo?: SEO
  sections?: Section[]
}

export interface PageSummary {
  _id: string
  _updatedAt: string
  title: string
  slug?: { current: string }
  isHomepage?: boolean
  seo?: {
    noIndex?: boolean
  }
}

// Sections
export type Section =
  | HeroSection
  | TextSection
  | FeaturesSection
  | CTASection
  | ContactSection
  | FAQSection

export interface HeroSection {
  _type: 'heroSection'
  _key: string
  heading: string
  subheading?: string
  backgroundImage?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  backgroundOverlay?: boolean
  primaryCta?: {
    text?: string
    link?: LinkObject
  }
  secondaryCta?: {
    text?: string
    link?: LinkObject
  }
  alignment?: 'left' | 'center' | 'right'
}

export interface TextSection {
  _type: 'textSection'
  _key: string
  heading?: string
  content?: PortableTextBlock[]
  backgroundColor?: 'white' | 'gray' | 'primary'
  maxWidth?: 'narrow' | 'medium' | 'wide'
}

export interface FeaturesSection {
  _type: 'featuresSection'
  _key: string
  heading?: string
  subheading?: string
  features?: Feature[]
  columns?: 2 | 3 | 4
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface Feature {
  title: string
  description?: string
  icon?: string
  image?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  link?: LinkObject
}

export interface CTASection {
  _type: 'ctaSection'
  _key: string
  heading: string
  text?: string
  primaryButton?: {
    text: string
    link?: LinkObject
  }
  secondaryButton?: {
    text?: string
    link?: LinkObject
  }
  backgroundImage?: {
    asset: SanityImage
    hotspot?: { x: number; y: number }
  }
  backgroundColor?: 'primary' | 'dark' | 'light'
}

export interface ContactSection {
  _type: 'contactSection'
  _key: string
  heading?: string
  text?: string
  showContactInfo?: boolean
  showContactForm?: boolean
  formFields?: FormField[]
  formAction?: string
  submitButtonText?: string
  successMessage?: string
  backgroundColor?: 'white' | 'gray' | 'primary'
}

export interface FormField {
  fieldName: string
  fieldType: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
  placeholder?: string
}

export interface FAQSection {
  _type: 'faqSection'
  _key: string
  heading?: string
  subheading?: string
  faqs?: FAQ[]
  backgroundColor?: 'white' | 'gray'
}

export interface FAQ {
  question: string
  answer?: PortableTextBlock[]
}

export interface LinkObject {
  label?: string
  linkType?: 'internal' | 'external'
  internalLink?: {
    slug?: { current: string }
    isHomepage?: boolean
  }
  externalUrl?: string
  openInNewTab?: boolean
}
