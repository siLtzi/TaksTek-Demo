import { defineType, defineField, defineArrayMember } from 'sanity'
import { FileText } from 'lucide-react'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page (leave empty for homepage)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'isHomepage',
      title: 'Is Homepage',
      type: 'boolean',
      description: 'Set this page as the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add and arrange content sections for this page',
      of: [
        defineArrayMember({ type: 'heroSection' }),
        defineArrayMember({ type: 'textSection' }),
        defineArrayMember({ type: 'featuresSection' }),
        defineArrayMember({ type: 'ctaSection' }),
        defineArrayMember({ type: 'contactSection' }),
        defineArrayMember({ type: 'faqSection' }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isHomepage: 'isHomepage',
    },
    prepare({ title, slug, isHomepage }) {
      return {
        title: title,
        subtitle: isHomepage ? '/ (Homepage)' : `/${slug || ''}`,
      }
    },
  },
})
