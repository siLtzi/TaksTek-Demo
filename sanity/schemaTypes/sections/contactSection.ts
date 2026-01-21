import { defineType, defineField } from 'sanity'
import { Mail } from 'lucide-react'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: Mail,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Supporting Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'showContactInfo',
      title: 'Show Contact Info',
      type: 'boolean',
      description: 'Display email, phone, and address from site settings',
      initialValue: true,
    }),
    defineField({
      name: 'showContactForm',
      title: 'Show Contact Form',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      hidden: ({ parent }) => !parent?.showContactForm,
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'fieldName',
              title: 'Field Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                ],
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'fieldName',
              fieldType: 'fieldType',
              required: 'required',
            },
            prepare({ title, fieldType, required }) {
              return {
                title: title,
                subtitle: `${fieldType}${required ? ' (required)' : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'formAction',
      title: 'Form Action URL',
      type: 'url',
      description: 'URL where form submissions will be sent (e.g., Formspree, Netlify Forms)',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thank you for your message. We\'ll get back to you soon!',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Light Gray', value: 'gray' },
          { title: 'Primary', value: 'primary' },
        ],
      },
      initialValue: 'gray',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact Form',
      }
    },
  },
})
