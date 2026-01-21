import { defineType, defineField } from 'sanity'
import { Menu } from 'lucide-react'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: Menu,
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Name',
      type: 'string',
      description: 'Internal name for this navigation (e.g., "Header Navigation")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
      description: 'Unique identifier (header or footer)',
      options: {
        list: [
          { title: 'Header Navigation', value: 'header' },
          { title: 'Footer Navigation', value: 'footer' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      identifier: 'identifier',
    },
    prepare({ title, identifier }) {
      return {
        title: title,
        subtitle: identifier,
      }
    },
  },
})
