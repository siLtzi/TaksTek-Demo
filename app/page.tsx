import { Metadata } from 'next'
import Link from 'next/link'
import { getHomepage, getSiteSettings } from '@/sanity/lib/fetchers'
import { SectionRenderer } from '@/components/sections'
import { urlFor } from '@/sanity/lib/client'
import HeroContent from '@/components/sections/Hero/Content'
import ValuePropositionContent from '@/components/sections/ValueProposition/Content'
import TrustElementsContent from '@/components/sections/TrustElements/Content'
import PricingCardsContent from '@/components/sections/PricingCards/Content'
import FAQContent from '@/components/sections/FAQ/Content'
import ContactContent from '@/components/sections/Contact/Content'
import CTAContent from '@/components/sections/CTA/Content'

// Demo FAQ data for default view
const demoFaqs = [
  {
    question: 'Mitä ilmalämpöpumpun asennus maksaa?',
    answer: [{ _type: 'block' as const, _key: '1', style: 'normal' as const, children: [{ _type: 'span' as const, text: 'Ilmalämpöpumpun asennus asennettuna alkaa 1 890 eurosta. Lopullinen hinta riippuu valitusta laitteesta ja kohteesta. Annamme tarkan hinnan ilmaisessa kartoituksessa.' }], markDefs: [] }],
  },
  {
    question: 'Kuinka nopeasti voitte asentaa ilmalämpöpumpun?',
    answer: [{ _type: 'block' as const, _key: '2', style: 'normal' as const, children: [{ _type: 'span' as const, text: 'Normaalisti asennus tapahtuu 1–3 päivän sisällä tilauksesta. Kiireellisissä tapauksissa voimme järjestää asennuksen jo seuraavalle päivälle.' }], markDefs: [] }],
  },
  {
    question: 'Onko asennuksella takuu?',
    answer: [{ _type: 'block' as const, _key: '3', style: 'normal' as const, children: [{ _type: 'span' as const, text: 'Kyllä! Annamme kaikille asennustöillemme 2 vuoden takuun. Lisäksi laitteiden valmistajatakuu on tyypillisesti 5–7 vuotta.' }], markDefs: [] }],
  },
  {
    question: 'Palveletteko myös Oulun ulkopuolella?',
    answer: [{ _type: 'block' as const, _key: '4', style: 'normal' as const, children: [{ _type: 'span' as const, text: 'Kyllä, palvelemme koko Pohjois-Pohjanmaan aluetta: Oulu, Kempele, Haukipudas, Kiiminki, Oulunsalo, Liminka, Muhos, Tyrnävä ja Ii.' }], markDefs: [] }],
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ])
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'
  
  return {
    title: page?.seo?.metaTitle || page?.title || settings?.siteName,
    description: page?.seo?.metaDescription || settings?.siteDescription,
    openGraph: {
      title: page?.seo?.metaTitle || page?.title,
      description: page?.seo?.metaDescription || settings?.siteDescription,
      url: siteUrl,
      images: page?.seo?.ogImage?.asset 
        ? [{ url: urlFor(page.seo.ogImage.asset).width(1200).height(630).url() }]
        : settings?.ogImage?.asset
        ? [{ url: urlFor(settings.ogImage.asset).width(1200).height(630).url() }]
        : [],
    },
    twitter: {
      title: page?.seo?.metaTitle || page?.title,
      description: page?.seo?.metaDescription || settings?.siteDescription,
      images: page?.seo?.ogImage?.asset
        ? [urlFor(page.seo.ogImage.asset).width(1200).height(630).url()]
        : settings?.ogImage?.asset
        ? [urlFor(settings.ogImage.asset).width(1200).height(630).url()]
        : [],
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ])

  if (!page) {
    // Default conversion-focused layout when no CMS content exists
    const defaultContactInfo = {
      companyName: settings?.contactInfo?.companyName || 'TaksTek Oy',
      phone: settings?.contactInfo?.phone || '040 123 4567',
      email: settings?.contactInfo?.email || 'info@takstek.fi',
      address: settings?.contactInfo?.address || 'Teollisuuskatu 15\n90100 Oulu',
      vatNumber: settings?.contactInfo?.vatNumber || '1234567-8',
    }

    return (
      <>
        {/* Hero Section */}
        <HeroContent
          heading="Ilmalämpöpumput ja LVI-asennukset Oulussa"
          subheading="Huollot, asennukset ja urakointi – nopeasti ja luotettavasti. Säästä jopa 40% lämmityskuluissa ammattimaisesti asennetulla ilmalämpöpumpulla."
          alignment="left"
          backgroundOverlay={true}
          phone={defaultContactInfo.phone}
          trustBadges={['10+ vuotta kokemusta', 'Nopea toimitus 1-3 pv', 'Tyytyväisyystakuu']}
        />

        {/* Value Proposition */}
        <ValuePropositionContent />

        {/* Trust Elements */}
        <TrustElementsContent />

        {/* Pricing */}
        <PricingCardsContent />

        {/* FAQ */}
        <section id="faq">
          <FAQContent
            heading="Usein kysytyt kysymykset"
            subheading="Vastauksia yleisimpiin kysymyksiin palveluistamme"
            faqs={demoFaqs}
            backgroundColor="gray"
          />
        </section>

        {/* CTA */}
        <CTAContent
          heading="Valmis säästämään lämmityskuluissa?"
          text="Pyydä ilmainen kartoitus ja tarjous – vastaamme 24h sisällä!"
          primaryButton={{ text: 'Pyydä ilmainen tarjous' }}
          secondaryButton={{ text: `Soita: ${defaultContactInfo.phone}` }}
          backgroundColor="primary"
        />

        {/* Contact */}
        <section id="contact">
          <ContactContent
            heading="Ota yhteyttä"
            text="Pyydä ilmainen tarjous tai kysy lisätietoja palveluistamme."
            showContactInfo={true}
            showContactForm={true}
            contactInfo={defaultContactInfo}
            backgroundColor="gray"
          />
        </section>

        {/* CMS Setup Notice (small) */}
        <div className="bg-gray-100 py-4 text-center text-sm text-gray-500">
          <p>
            Muokkaa sisältöä: <Link href="/studio" className="text-primary-600 underline hover:text-primary-700">CMS Studio</Link>
          </p>
        </div>
      </>
    )
  }

  return (
    <SectionRenderer 
      sections={page.sections} 
      contactInfo={settings?.contactInfo}
    />
  )
}
