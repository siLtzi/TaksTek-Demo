'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface FooterClientProps {
  children: ReactNode
}

export function FooterClient({ children }: FooterClientProps) {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Animate footer sections on scroll into view
      const columns = footerRef.current!.querySelectorAll('.footer-column')
      gsap.fromTo(columns,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Animate footer links
      const links = footerRef.current!.querySelectorAll('.footer-link')
      gsap.fromTo(links,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.4,
          stagger: 0.03,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Animate social icons
      const socialIcons = footerRef.current!.querySelectorAll('.social-icon')
      gsap.fromTo(socialIcons,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        }
      )

      // Bottom bar slide up
      const bottomBar = footerRef.current!.querySelector('.footer-bottom')
      if (bottomBar) {
        gsap.fromTo(bottomBar,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            }
          }
        )
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={footerRef}>
      {children}
    </div>
  )
}
