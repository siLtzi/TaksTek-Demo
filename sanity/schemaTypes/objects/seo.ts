import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters recommended)',
      validation: (Rule) => Rule.max(70).warning('Meta titles should be under 70 characters'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description for search engines (150-160 characters recommended)',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Meta descriptions should be under 160 characters'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630 recommended)',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to prevent this page from being indexed',
      initialValue: false,
    }),
  ],
})
