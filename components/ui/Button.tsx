import Link from 'next/link'
import { LinkObject } from '@/types/sanity'
import { cn } from '@/lib/utils'

interface ButtonProps {
  link?: LinkObject
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost' | 'phone' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  icon?: React.ReactNode
  pill?: boolean
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

export function Button({ 
  link, 
  href: directHref,
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  onClick,
  icon,
  pill = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 gap-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-2 focus:ring-accent-400 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-[1.02]',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    phone: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BD5A] focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const pillStyles = pill ? 'rounded-full' : 'rounded-lg'

  const href = directHref || getHref(link)
  const isExternal = link?.linkType === 'external' || link?.openInNewTab || directHref?.startsWith('tel:') || directHref?.startsWith('mailto:') || directHref?.startsWith('https://wa.me')

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if (onClick && !link && !directHref) {
    return (
      <button
        onClick={onClick}
        className={cn(baseStyles, variants[variant], sizes[size], pillStyles, className)}
      >
        {content}
      </button>
    )
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target={directHref?.startsWith('tel:') || directHref?.startsWith('mailto:') ? undefined : '_blank'}
        rel={directHref?.startsWith('tel:') || directHref?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className={cn(baseStyles, variants[variant], sizes[size], pillStyles, className)}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], pillStyles, className)}
    >
      {content}
    </Link>
  )
}
