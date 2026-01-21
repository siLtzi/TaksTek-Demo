'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText, ScrollSmoother, DrawSVGPlugin)
}

export { gsap, ScrollTrigger, TextPlugin, SplitText, ScrollSmoother, DrawSVGPlugin }

// Common animation presets
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  duration: 0.8,
  ease: 'power3.out',
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
}

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  duration: 0.8,
  ease: 'power3.out',
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  duration: 0.6,
  ease: 'back.out(1.7)',
}

export const staggerChildren = {
  stagger: 0.15,
  ease: 'power2.out',
}
