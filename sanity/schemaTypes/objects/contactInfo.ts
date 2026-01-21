import { defineType, defineField } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'vatNumber',
      title: 'VAT Number',
      type: 'string',
      description: 'Company VAT/Tax ID (for EU compliance)',
    }),
    defineField({
      name: 'chamberOfCommerce',
      title: 'Chamber of Commerce Number',
      type: 'string',
      description: 'Company registration number',
    }),
  ],
})
