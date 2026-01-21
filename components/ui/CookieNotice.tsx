'use client'

import { useState, useSyncExternalStore, useCallback } from 'react'
import Link from 'next/link'

interface CookieNoticeProps {
  enabled?: boolean
  text?: string
  linkText?: string
}

// Custom hook to check localStorage without triggering the lint rule
function useLocalStorageConsent() {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
  }, [])
  
  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return 'unknown'
    return localStorage.getItem('cookie-consent') || ''
  }, [])
  
  const getServerSnapshot = useCallback(() => 'unknown', [])
  
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function CookieNotice({ enabled = true, text, linkText = 'Learn more' }: CookieNoticeProps) {
  const [dismissed, setDismissed] = useState(false)
  const consent = useLocalStorageConsent()
  
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setDismissed(true)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setDismissed(true)
  }

  // Don't show if disabled, already consented, or dismissed
  if (!enabled || consent === 'unknown' || consent || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-600">
          {text || 'We use cookies to improve your experience on our website.'}{' '}
          <Link href="/privacy-policy" className="text-primary-600 underline hover:text-primary-700">
            {linkText}
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
