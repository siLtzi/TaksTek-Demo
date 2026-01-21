'use client'

import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================
export type TextBackgroundColor = 'white' | 'gray' | 'primary'
export type TextMaxWidth = 'narrow' | 'medium' | 'wide'

export interface TextContentProps {
  heading?: string
  content?: PortableTextBlock[]
  backgroundColor?: TextBackgroundColor
  maxWidth?: TextMaxWidth
}

interface ImageValue {
  url: string
  alt?: string
  caption?: string
}

interface LinkValue {
  href: string
  openInNewTab?: boolean
}

// ============================================================================
// PORTABLE TEXT COMPONENTS
// ============================================================================
const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value?.url) return null
      return (
        <figure className="my-8">
          <Image
            src={value.url}
            alt={value.alt || ''}
            width={800}
            height={450}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value?: LinkValue }) => {
      const rel = value?.openInNewTab ? 'noopener noreferrer' : undefined
      const target = value?.openInNewTab ? '_blank' : undefined
      return (
        <a href={value?.href} rel={rel} target={target} className="text-primary-600 underline hover:text-primary-700">
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mt-10 mb-4 text-3xl font-bold text-gray-900">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-8 mb-3 text-2xl font-semibold text-gray-900">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold text-gray-900">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-4 border-primary-500 pl-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function TextContent({
  heading,
  content,
  backgroundColor = 'white',
  maxWidth = 'medium',
}: TextContentProps) {
  
  const bgClasses: Record<TextBackgroundColor, string> = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    primary: 'bg-primary-50',
  }

  const maxWidthClasses: Record<TextMaxWidth, string> = {
    narrow: 'max-w-2xl',
    medium: 'max-w-4xl',
    wide: 'max-w-6xl',
  }

  return (
    <section className={cn('py-16 md:py-24', bgClasses[backgroundColor])}>
      <div className={cn('container mx-auto px-4', maxWidthClasses[maxWidth])}>
        {heading && (
          <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
            {heading}
          </h2>
        )}
        
        {content && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={content} components={portableTextComponents} />
          </div>
        )}
      </div>
    </section>
  )
}
