'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

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
  const cardRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(cardRef.current,
        { opacity: 0, x: -60 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Stagger contact items
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.contact-item')
        gsap.fromTo(items,
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={cardRef}
      className="bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-3xl p-8 md:p-10 shadow-xl text-white relative overflow-hidden opacity-0"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
          <MessageSquare className="w-7 h-7" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Ota yhteyttä</h3>
        <p className="text-primary-100 mb-8">Vastaamme yhteydenottoihin arkisin 24h sisällä</p>
        
        <div ref={itemsRef} className="space-y-4">
          {contactInfo.phone && (
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="contact-item flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Phone className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-primary-200">Soita meille</p>
                <p className="text-lg font-bold">{contactInfo.phone}</p>
              </div>
            </a>
          )}
          
          {contactInfo.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="contact-item flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all group opacity-0"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-primary-200">Sähköposti</p>
                <p className="font-semibold">{contactInfo.email}</p>
              </div>
            </a>
          )}
          
          {contactInfo.address && (
            <div className="contact-item flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm opacity-0">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-primary-200">Osoite</p>
                <p className="font-semibold whitespace-pre-line">{contactInfo.address}</p>
              </div>
            </div>
          )}
        </div>

        {contactInfo.companyName && (
          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="font-bold">{contactInfo.companyName}</p>
            {contactInfo.vatNumber && (
              <p className="text-sm text-primary-200 mt-1">Y-tunnus: {contactInfo.vatNumber}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function FormField({ field, index }: { field: FormFieldConfig; index: number }) {
  const fieldId = field.fieldName.toLowerCase().replace(/\s/g, '-')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          delay: 0.1 * index,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, ref)

    return () => ctx.revert()
  }, [index])

  return (
    <div ref={ref} className="opacity-0">
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {field.fieldName}
        {field.required && <span className="text-accent-500 ml-1">*</span>}
      </label>
      
      {field.fieldType === 'textarea' ? (
        <textarea
          id={fieldId}
          name={fieldId}
          rows={4}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all resize-none"
        />
      ) : (
        <input
          type={field.fieldType}
          id={fieldId}
          name={fieldId}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
        />
      )}
    </div>
  )
}

function DefaultFormFields() {
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!formRef.current) return

    const ctx = gsap.context(() => {
      const fields = formRef.current!.querySelectorAll('.form-field')
      gsap.fromTo(fields,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      )
    }, formRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={formRef} className="space-y-5">
      <div className="form-field opacity-0">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nimi <span className="text-accent-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Matti Meikäläinen"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="form-field opacity-0">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Sähköposti <span className="text-accent-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="matti@esimerkki.fi"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
          />
        </div>
        <div className="form-field opacity-0">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Puhelin
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="040 123 4567"
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
          />
        </div>
      </div>
      <div className="form-field opacity-0">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
          Palvelu
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all"
        >
          <option value="">Valitse palvelu...</option>
          <option value="ilmalampopumppu">Ilmalämpöpumpun asennus</option>
          <option value="huolto">Huoltopalvelu</option>
          <option value="lvi">LVI-asennus</option>
          <option value="muu">Muu palvelu</option>
        </select>
      </div>
      <div className="form-field opacity-0">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Viesti <span className="text-accent-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Kerro projektistasi tai tarpeestasi..."
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all resize-none"
        />
      </div>
    </div>
  )
}

function SuccessState({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      )

      const icon = ref.current!.querySelector('.success-icon')
      if (icon) {
        gsap.fromTo(icon,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 0.8, delay: 0.2, ease: 'back.out(2)' }
        )
      }
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="text-center py-12 opacity-0">
      <div className="success-icon mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30">
        <CheckCircle className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">Kiitos viestistäsi!</h3>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ContactContent({
  heading = 'Ota yhteyttä',
  text = 'Pyydä ilmainen tarjous tai kysy lisätietoja palveluistamme.',
  showContactInfo = true,
  showContactForm = true,
  contactInfo,
  formFields,
  formAction,
  submitButtonText = 'Lähetä viesti',
  successMessage = 'Olemme vastaanottaneet viestisi ja otamme sinuun yhteyttä pian!',
  backgroundColor = 'gray',
}: ContactContentProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const bgClasses: Record<ContactBackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Form card animation
      if (formCardRef.current) {
        gsap.fromTo(formCardRef.current,
          { opacity: 0, x: 60 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }

      // Button animation
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.5,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Button loading animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
      })
    }
    
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
      setTimeout(() => {
        setIsSubmitted(true)
      }, 1000)
    }
    
    setIsSubmitting(false)
  }

  return (
    <section 
      ref={sectionRef} 
      id="contact"
      className={cn('py-20 md:py-32 relative overflow-hidden', bgClasses[backgroundColor])}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-100/30 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        {(heading || text) && (
          <div ref={headerRef} className="mb-16 text-center max-w-3xl mx-auto opacity-0">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 text-primary-600 mb-6">
              <Send className="w-8 h-8" />
            </div>
            {heading && (
              <h2 className="text-3xl font-bold text-gray-900 md:text-5xl mb-4">
                {heading}
              </h2>
            )}
            {text && (
              <p className="text-lg md:text-xl text-gray-600">
                {text}
              </p>
            )}
          </div>
        )}

        <div className={cn(
          'grid gap-8 lg:gap-12 max-w-6xl mx-auto', 
          showContactInfo && showContactForm ? 'lg:grid-cols-2' : ''
        )}>
          {/* Contact Info */}
          {showContactInfo && contactInfo && (
            <ContactInfoDisplay contactInfo={contactInfo} />
          )}

          {/* Contact Form */}
          {showContactForm && (
            <div 
              ref={formCardRef}
              className="rounded-3xl border-2 border-gray-100 bg-white p-8 md:p-10 shadow-xl opacity-0"
            >
              {isSubmitted ? (
                <SuccessState message={successMessage} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {formFields && formFields.length > 0 ? (
                    formFields.map((field, index) => (
                      <FormField key={index} field={field} index={index} />
                    ))
                  ) : (
                    <DefaultFormFields />
                  )}
                  
                  <button
                    ref={buttonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-4 font-bold text-white text-lg transition-all hover:from-accent-600 hover:to-accent-700 hover:shadow-xl hover:shadow-accent-500/30 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-accent-400/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 opacity-0"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Lähetetään...
                      </>
                    ) : (
                      <>
                        {submitButtonText}
                        <Send className="w-5 h-5" />
                      </>
                    )}
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
