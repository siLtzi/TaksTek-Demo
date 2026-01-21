'use client'

import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

// ============================================================================
// TYPES
// ============================================================================
export interface PricingCard {
  title: string
  price: string
  priceLabel?: string
  features?: string[]
  ctaText?: string
  featured?: boolean
}

export interface PricingCardsContentProps {
  heading?: string
  subheading?: string
  cards?: PricingCard[]
}

// ============================================================================
// DEFAULT DATA
// ============================================================================
const defaultCards: PricingCard[] = [
  {
    title: 'Ilmalämpöpumppu',
    price: 'alk. 1 890 €',
    priceLabel: 'asennettuna',
    features: [
      'Laadukas merkkituote',
      'Ammattiasennus',
      '5 vuoden takuu',
      'Käyttöönotto-opastus',
    ],
    ctaText: 'Pyydä tarjous',
    featured: true,
  },
  {
    title: 'LVI-huolto',
    price: 'alk. 89 €',
    priceLabel: 'käyntimaksu',
    features: [
      'Nopea palvelu',
      'Kokeneet asentajat',
      'Selkeä hinnoittelu',
      'Takuu työlle',
    ],
    ctaText: 'Varaa huolto',
    featured: false,
  },
  {
    title: 'Ilmanvaihto',
    price: 'alk. 2 490 €',
    priceLabel: 'asennettuna',
    features: [
      'Vallox-laitteet',
      'Suunnittelu mukana',
      'Säädöt ja tasapainotus',
      '2 vuoden takuu',
    ],
    ctaText: 'Pyydä tarjous',
    featured: false,
  },
]

// ============================================================================
// COMPONENT
// ============================================================================
export default function PricingCardsContent({
  heading = 'Palvelut ja hinnat',
  subheading = 'Selkeät pakettihinnat – ei piilokustannuksia',
  cards = defaultCards,
}: PricingCardsContentProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {heading}
          </h2>
          {subheading && (
            <p className="text-lg text-gray-600">
              {subheading}
            </p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className={cn(
                'relative rounded-2xl p-8 transition-all',
                card.featured 
                  ? 'bg-primary-600 text-white shadow-2xl scale-105 lg:scale-110 z-10' 
                  : 'bg-gray-50 text-gray-900 hover:shadow-lg'
              )}
            >
              {/* Featured Badge */}
              {card.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                    Suosituin
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="text-center">
                <h3 className={cn(
                  'text-xl font-semibold mb-4',
                  card.featured ? 'text-white' : 'text-gray-900'
                )}>
                  {card.title}
                </h3>
                
                <div className="mb-6">
                  <span className={cn(
                    'text-4xl md:text-5xl font-bold',
                    card.featured ? 'text-white' : 'text-gray-900'
                  )}>
                    {card.price}
                  </span>
                  {card.priceLabel && (
                    <p className={cn(
                      'text-sm mt-1',
                      card.featured ? 'text-primary-100' : 'text-gray-500'
                    )}>
                      {card.priceLabel}
                    </p>
                  )}
                </div>

                {/* Features List */}
                {card.features && card.features.length > 0 && (
                  <ul className="space-y-3 mb-8 text-left">
                    {card.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className={cn(
                          'flex items-center gap-3 text-sm',
                          card.featured ? 'text-primary-100' : 'text-gray-600'
                        )}
                      >
                        <Check className={cn(
                          'h-5 w-5 flex-shrink-0',
                          card.featured ? 'text-primary-200' : 'text-primary-500'
                        )} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA Button */}
                <Button
                  href="#contact"
                  variant={card.featured ? 'secondary' : 'accent'}
                  size="lg"
                  pill
                  className={cn(
                    'w-full justify-center',
                    card.featured && 'bg-white text-primary-600 hover:bg-gray-100'
                  )}
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  {card.ctaText || 'Pyydä tarjous'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto">
          Kaikki hinnat sisältävät ALV 25,5%. Lopullinen hinta määräytyy kohteen mukaan. 
          Pyydä ilmainen kartoitus ja tarjous!
        </p>
      </div>
    </section>
  )
}
