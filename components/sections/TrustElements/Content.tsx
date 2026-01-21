'use client'

import React from 'react'
import { Star, MapPin, CheckCircle } from 'lucide-react'

// ============================================================================
// TYPES
// ============================================================================
export interface Review {
  name: string
  text: string
  rating: number
  location?: string
}

export interface TrustElementsContentProps {
  heading?: string
  showBrands?: boolean
  showReviews?: boolean
  showServiceAreas?: boolean
}

// ============================================================================
// DEFAULT DATA
// ============================================================================
const defaultBrands = [
  { name: 'Toshiba', logo: '/icon/toshiba.svg' },
  { name: 'Panasonic', logo: '/icon/panasonic.svg' },
  { name: 'Mitsubishi Electric', logo: '/icon/mitsubishi.svg' },
  { name: 'Daikin', logo: '/icon/daikin.svg' },
  { name: 'Vallox', logo: '/icon/vallox.svg' },
  { name: 'Oras', logo: '/icon/oras.svg' },
]

const defaultReviews: Review[] = [
  {
    name: 'Matti K.',
    text: 'Erittäin ammattitaitoinen ja nopea palvelu. Ilmalämpöpumppu asennettiin sovitussa aikataulussa ja asentaja selitti kaiken selkeästi.',
    rating: 5,
    location: 'Oulu',
  },
  {
    name: 'Liisa M.',
    text: 'Kilpailukykyinen hinta ja laadukas työ. Suosittelen lämpimästi kaikille, jotka etsivät luotettavaa LVI-firmaa.',
    rating: 5,
    location: 'Kempele',
  },
  {
    name: 'Pekka H.',
    text: 'Huoltopalvelu toimi moitteettomasti. Tulivat nopeasti ja korjasivat ongelman tehokkaasti. Hyvä asiakaspalvelu!',
    rating: 5,
    location: 'Haukipudas',
  },
]

const serviceAreas = [
  'Oulu',
  'Kempele', 
  'Haukipudas',
  'Kiiminki',
  'Oulunsalo',
  'Liminka',
  'Muhos',
  'Tyrnävä',
  'Ii',
  'Ylikiiminki',
]

// ============================================================================
// SUB-COMPONENTS
// ============================================================================
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <StarRating rating={review.rating} />
      <p className="mt-4 text-gray-600 italic">&quot;{review.text}&quot;</p>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-gray-900">{review.name}</span>
        {review.location && (
          <>
            <span>•</span>
            <span>{review.location}</span>
          </>
        )}
      </div>
    </div>
  )
}

function BrandLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div 
      className="flex-shrink-0 flex items-center justify-center h-14 w-20 sm:h-16 sm:w-24 md:h-20 md:w-32 lg:w-36 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-125 hover:rotate-[-3deg] hover:-translate-y-1 cursor-pointer group"
    >
      <img 
        src={logo} 
        alt={name} 
        className="max-h-10 sm:max-h-12 md:max-h-16 max-w-full object-contain transition-transform duration-500 group-hover:animate-[wave_0.5s_ease-in-out]"
      />
    </div>
  )
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function TrustElementsContent({
  heading = 'Asiakkaidemme suosittelema',
  showBrands = true,
  showReviews = true,
  showServiceAreas = true,
}: TrustElementsContentProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Google Reviews Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-500">Google-arvosteluissa</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {heading}
          </h2>
        </div>

        {/* Reviews Grid */}
        {showReviews && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {defaultReviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        )}

        {/* Brand Logos */}
        {showBrands && (
          <div className="mb-16">
            <p className="text-center text-sm text-gray-500 uppercase tracking-wider mb-6">
              Asennamme luotettavat merkkituotteet
            </p>
            <div className="flex flex-nowrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar px-4">
              {defaultBrands.map((brand, index) => (
                <BrandLogo key={index} name={brand.name} logo={brand.logo} />
              ))}
            </div>
          </div>
        )}

        {/* Service Areas */}
        {showServiceAreas && (
          <div className="bg-gray-50 rounded-2xl p-6 md:p-12">
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary-600" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Palvelualueemme
              </h3>
            </div>
            
            {/* Mobile: Horizontal scrolling carousel */}
            <div className="md:hidden relative">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
              
              {/* Scrollable container */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar px-2 py-1 -mx-2">
                {serviceAreas.map((area, index) => (
                  <span 
                    key={index}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-primary-500" />
                    {area}
                  </span>
                ))}
              </div>
              
              {/* Scroll hint */}
              <p className="text-center text-xs text-gray-400 mt-2">
                ← Pyyhkäise nähdäksesi lisää →
              </p>
            </div>
            
            {/* Desktop: Wrapped layout */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  {area}
                </span>
              ))}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4 md:mt-6">
              Palvelemme myös muita Pohjois-Pohjanmaan kuntia – kysy lisää!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
