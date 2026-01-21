import { defineType, defineField } from 'sanity'
import { Settings } from 'lucide-react'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: 'The name of your website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      description: 'A brief description of your website (used for SEO)',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Your site logo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'The small icon shown in browser tabs',
    }),
    defineField({
      name: 'ogImage',
      title: 'Default Social Share Image',
      type: 'image',
      description: 'Default image for social media sharing (1200x630 recommended)',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'contactInfo',
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      description: 'Text displayed in the footer (e.g., copyright notice)',
      rows: 2,
    }),
    defineField({
      name: 'cookieNotice',
      title: 'Cookie Notice',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Cookie Notice',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'text',
          title: 'Cookie Notice Text',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'linkText',
          title: 'Privacy Policy Link Text',
          type: 'string',
          initialValue: 'Learn more',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
  },
})
