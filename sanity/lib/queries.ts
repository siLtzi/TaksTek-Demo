import { groq } from 'next-sanity'

// Site Settings
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo {
      asset->,
      alt
    },
    favicon {
      asset->
    },
    ogImage {
      asset->
    },
    socialLinks[] {
      platform,
      url
    },
    contactInfo {
      email,
      phone,
      address,
      companyName,
      vatNumber,
      chamberOfCommerce
    },
    footerText,
    cookieNotice {
      enabled,
      text,
      linkText
    }
  }
`

// Navigation
export const navigationQuery = groq`
  *[_type == "navigation" && identifier == $identifier][0] {
    title,
    identifier,
    items[] {
      label,
      linkType,
      internalLink-> {
        _type,
        slug,
        isHomepage
      },
      externalUrl,
      openInNewTab
    }
  }
`

// All Pages (for sitemap)
export const allPagesQuery = groq`
  *[_type == "page"] {
    _id,
    _updatedAt,
    title,
    slug,
    isHomepage,
    seo {
      noIndex
    }
  }
`

// Single Page by Slug
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    isHomepage,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->
      },
      noIndex
    },
    sections[] {
      _type,
      _key,
      
      // Hero Section
      _type == "heroSection" => {
        heading,
        subheading,
        backgroundImage {
          asset->,
          hotspot
        },
        backgroundOverlay,
        primaryCta {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        secondaryCta {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        alignment
      },
      
      // Text Section
      _type == "textSection" => {
        heading,
        content[] {
          ...,
          _type == "image" => {
            asset->,
            alt,
            caption
          }
        },
        backgroundColor,
        maxWidth
      },
      
      // Features Section
      _type == "featuresSection" => {
        heading,
        subheading,
        features[] {
          title,
          description,
          icon,
          image {
            asset->,
            hotspot
          },
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        columns,
        backgroundColor
      },
      
      // CTA Section
      _type == "ctaSection" => {
        heading,
        text,
        primaryButton {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        secondaryButton {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        backgroundImage {
          asset->,
          hotspot
        },
        backgroundColor
      },
      
      // Contact Section
      _type == "contactSection" => {
        heading,
        text,
        showContactInfo,
        showContactForm,
        formFields[] {
          fieldName,
          fieldType,
          required,
          placeholder
        },
        formAction,
        submitButtonText,
        successMessage,
        backgroundColor
      },
      
      // FAQ Section
      _type == "faqSection" => {
        heading,
        subheading,
        faqs[] {
          question,
          answer
        },
        backgroundColor
      }
    }
  }
`

// Homepage
export const homepageQuery = groq`
  *[_type == "page" && isHomepage == true][0] {
    _id,
    title,
    slug,
    isHomepage,
    seo {
      metaTitle,
      metaDescription,
      ogImage {
        asset->
      },
      noIndex
    },
    sections[] {
      _type,
      _key,
      
      // Hero Section
      _type == "heroSection" => {
        heading,
        subheading,
        backgroundImage {
          asset->,
          hotspot
        },
        backgroundOverlay,
        primaryCta {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        secondaryCta {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        alignment
      },
      
      // Text Section
      _type == "textSection" => {
        heading,
        content[] {
          ...,
          _type == "image" => {
            asset->,
            alt,
            caption
          }
        },
        backgroundColor,
        maxWidth
      },
      
      // Features Section
      _type == "featuresSection" => {
        heading,
        subheading,
        features[] {
          title,
          description,
          icon,
          image {
            asset->,
            hotspot
          },
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        columns,
        backgroundColor
      },
      
      // CTA Section
      _type == "ctaSection" => {
        heading,
        text,
        primaryButton {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        secondaryButton {
          text,
          link {
            label,
            linkType,
            internalLink-> {
              slug,
              isHomepage
            },
            externalUrl,
            openInNewTab
          }
        },
        backgroundImage {
          asset->,
          hotspot
        },
        backgroundColor
      },
      
      // Contact Section
      _type == "contactSection" => {
        heading,
        text,
        showContactInfo,
        showContactForm,
        formFields[] {
          fieldName,
          fieldType,
          required,
          placeholder
        },
        formAction,
        submitButtonText,
        successMessage,
        backgroundColor
      },
      
      // FAQ Section
      _type == "faqSection" => {
        heading,
        subheading,
        faqs[] {
          question,
          answer
        },
        backgroundColor
      }
    }
  }
`

// All Page Slugs (for static generation)
export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current) && isHomepage != true] {
    "slug": slug.current
  }
`
