import Link from 'next/link'
import { LinkObject } from '@/types/sanity'
import { cn } from '@/lib/utils'

interface ButtonProps {
  link?: LinkObject
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getHref(link?: LinkObject): string {
  if (!link) return '#'
  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl
  }
  if (link.internalLink?.isHomepage) {
    return '/'
  }
  if (link.internalLink?.slug?.current) {
    return `/${link.internalLink.slug.current}`
  }
  return '#'
}

export function Button({ link, children, variant = 'primary', size = 'md', className }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    outline: 'border-2 border-current text-primary-600 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const href = getHref(link)
  const isExternal = link?.linkType === 'external' || link?.openInNewTab

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  )
}
