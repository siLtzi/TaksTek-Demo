'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================
export type ContactBackgroundColor = 'white' | 'gray' | 'primary'

export interface ContactInfoData {
  email?: string
  phone?: string
  address?: string
  companyName?: string
  vatNumber?: string
  chamberOfCommerce?: string
}

export interface FormFieldConfig {
  fieldName: string
  fieldType: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
  placeholder?: string
}

export interface ContactContentProps {
  heading?: string
  text?: string
  showContactInfo?: boolean
  showContactForm?: boolean
  contactInfo?: ContactInfoData
  formFields?: FormFieldConfig[]
  formAction?: string
  submitButtonText?: string
  successMessage?: string
  backgroundColor?: ContactBackgroundColor
}

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function ContactInfoDisplay({ contactInfo }: { contactInfo: ContactInfoData }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Get in Touch</h3>
      
      <div className="space-y-4">
        {contactInfo.email && (
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-3 text-gray-600 hover:text-primary-600"
          >
            <Mail className="h-5 w-5 text-primary-600" />
            <span>{contactInfo.email}</span>
          </a>
        )}
        
        {contactInfo.phone && (
          <a
            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 text-gray-600 hover:text-primary-600"
          >
            <Phone className="h-5 w-5 text-primary-600" />
            <span>{contactInfo.phone}</span>
          </a>
        )}
        
        {contactInfo.address && (
          <div className="flex items-start gap-3 text-gray-600">
            <MapPin className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
            <span className="whitespace-pre-line">{contactInfo.address}</span>
          </div>
        )}
      </div>

      {contactInfo.companyName && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="font-medium text-gray-900">{contactInfo.companyName}</p>
          {contactInfo.vatNumber && (
            <p className="text-sm text-gray-500">VAT: {contactInfo.vatNumber}</p>
          )}
          {contactInfo.chamberOfCommerce && (
            <p className="text-sm text-gray-500">CoC: {contactInfo.chamberOfCommerce}</p>
          )}
        </div>
      )}
    </div>
  )
}

function FormField({ field }: { field: FormFieldConfig }) {
  const fieldId = field.fieldName.toLowerCase().replace(/\s/g, '-')

  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {field.fieldName}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {field.fieldType === 'textarea' ? (
        <textarea
          id={fieldId}
          name={fieldId}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      ) : (
        <input
          type={field.fieldType}
          id={fieldId}
          name={fieldId}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      )}
    </div>
  )
}

function DefaultFormFields() {
  return (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
      </div>
    </>
  )
}

function SuccessState({ message }: { message: string }) {
  return (
    <div className="text-center py-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-lg font-medium text-gray-900">{message}</p>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ContactContent({
  heading,
  text,
  showContactInfo = true,
  showContactForm = true,
  contactInfo,
  formFields,
  formAction,
  submitButtonText = 'Send Message',
  successMessage = 'Thank you for your message!',
  backgroundColor = 'gray',
}: ContactContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const bgClasses: Record<ContactBackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (formAction) {
      const form = e.currentTarget
      try {
        await fetch(formAction, {
          method: 'POST',
          body: new FormData(form),
        })
        setIsSubmitted(true)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    } else {
      // Simulate form submission for demo
      setTimeout(() => {
        setIsSubmitted(true)
      }, 1000)
    }
    
    setIsSubmitting(false)
  }

  return (
    <section className={cn('py-16 md:py-24', bgClasses[backgroundColor])}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || text) && (
          <div className="mb-12 text-center max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {heading}
              </h2>
            )}
            {text && (
              <p className="mt-4 text-lg text-gray-600">
                {text}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          'grid gap-12', 
          showContactInfo && showContactForm ? 'lg:grid-cols-2' : ''
        )}>
          {/* Contact Info */}
          {showContactInfo && contactInfo && (
            <ContactInfoDisplay contactInfo={contactInfo} />
          )}

          {/* Contact Form */}
          {showContactForm && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
              {isSubmitted ? (
                <SuccessState message={successMessage} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formFields && formFields.length > 0 ? (
                    formFields.map((field, index) => (
                      <FormField key={index} field={field} />
                    ))
                  ) : (
                    <DefaultFormFields />
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : submitButtonText}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
