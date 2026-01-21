import { Metadata } from 'next'
import HeroContent from '@/components/sections/Hero/Content'
import ValuePropositionContent from '@/components/sections/ValueProposition/Content'
import TrustElementsContent from '@/components/sections/TrustElements/Content'
import PricingCardsContent from '@/components/sections/PricingCards/Content'
import FAQContent from '@/components/sections/FAQ/Content'
import ContactContent from '@/components/sections/Contact/Content'
import CTAContent from '@/components/sections/CTA/Content'

export const metadata: Metadata = {
  title: 'Demo - Conversion-Focused Design',
  description: 'Demo sivu näyttää kaikki uudet konversioon keskittyvät komponentit.',
}

// Demo FAQ data
const demoFaqs = [
  {
    question: 'Mitä ilmalämpöpumpun asennus maksaa?',
    answer: [
      {
        _type: 'block',
        _key: '1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Ilmalämpöpumpun asennus asennettuna alkaa 1 890 eurosta. Lopullinen hinta riippuu valitusta laitteesta, asennuskohteen vaativuudesta ja mahdollisista lisätöistä. Annamme aina tarkan hinnan etukäteen ilmaisessa kartoituksessa.',
          },
        ],
      },
    ],
  },
  {
    question: 'Kuinka nopeasti voitte asentaa ilmalämpöpumpun?',
    answer: [
      {
        _type: 'block',
        _key: '2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Normaalisti asennus tapahtuu 1–3 päivän sisällä tilauksesta. Kiireellisissä tapauksissa voimme usein järjestää asennuksen jo seuraavalle päivälle. Ota yhteyttä, niin kerromme tarkan aikataulun!',
          },
        ],
      },
    ],
  },
  {
    question: 'Onko asennuksella takuu?',
    answer: [
      {
        _type: 'block',
        _key: '3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Kyllä! Annamme kaikille asennustöillemme 2 vuoden takuun. Lisäksi laitteiden valmistajatakuu on tyypillisesti 5–7 vuotta. Käytämme vain laadukkaita merkkituotteita, joten voit luottaa pitkäikäiseen toimintaan.',
          },
        ],
      },
    ],
  },
  {
    question: 'Palveletteko myös Oulun ulkopuolella?',
    answer: [
      {
        _type: 'block',
        _key: '4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Kyllä, palvelemme koko Pohjois-Pohjanmaan aluetta. Palvelualueeseemme kuuluvat mm. Oulu, Kempele, Haukipudas, Kiiminki, Oulunsalo, Liminka, Muhos, Tyrnävä ja Ii. Kysy myös muista kohteista!',
          },
        ],
      },
    ],
  },
  {
    question: 'Miten tarjouspyyntö etenee?',
    answer: [
      {
        _type: 'block',
        _key: '5',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: '1) Lähetät tarjouspyynnön lomakkeella tai soitat meille. 2) Otamme yhteyttä 24h sisällä ja sovimme ilmaisen kartoituskäynnin. 3) Kartoituksen jälkeen saat tarkan, sitovan tarjouksen. 4) Hyväksyttyäsi tarjouksen sovimme asennusajan. Koko prosessi on sinulle riskitön ja ilmainen tarjoukseen asti!',
          },
        ],
      },
    ],
  },
]

// Demo contact info
const demoContactInfo = {
  companyName: 'TaksTek Oy',
  phone: '040 123 4567',
  email: 'info@takstek.fi',
  address: 'Teollisuuskatu 15\n90100 Oulu',
  vatNumber: '1234567-8',
}

export default function DemoPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroContent
        heading="Ilmalämpöpumput ja LVI-asennukset Oulussa"
        subheading="Huollot, asennukset ja urakointi – nopeasti ja luotettavasti. Säästä jopa 40% lämmityskuluissa ammattimaisesti asennetulla ilmalämpöpumpulla."
        alignment="left"
        backgroundOverlay={true}
        trustBadges={['10+ vuotta kokemusta', 'Nopea toimitus 1-3 pv', 'Tyytyväisyystakuu']}
      />

      {/* Value Proposition Section */}
      <ValuePropositionContent />

      {/* Trust Elements Section */}
      <TrustElementsContent />

      {/* Pricing Cards Section */}
      <PricingCardsContent />

      {/* FAQ Section */}
      <section id="faq">
        <FAQContent
          heading="Usein kysytyt kysymykset"
          subheading="Vastauksia yleisimpiin kysymyksiin palveluistamme"
          faqs={demoFaqs}
          backgroundColor="gray"
        />
      </section>

      {/* CTA Section */}
      <CTAContent
        heading="Valmis säästämään lämmityskuluissa?"
        text="Pyydä ilmainen kartoitus ja tarjous – vastaamme 24h sisällä!"
        primaryButton={{ text: 'Pyydä ilmainen tarjous' }}
        secondaryButton={{ text: 'Soita: 040 123 4567' }}
        backgroundColor="primary"
      />

      {/* Contact Section */}
      <section id="contact">
        <ContactContent
          heading="Ota yhteyttä"
          text="Pyydä ilmainen tarjous tai kysy lisätietoja palveluistamme. Vastaamme arkisin 24h sisällä."
          showContactInfo={true}
          showContactForm={true}
          contactInfo={demoContactInfo}
          backgroundColor="gray"
        />
      </section>
    </>
  )
}
