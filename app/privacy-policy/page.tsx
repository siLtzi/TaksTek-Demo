import { Metadata } from 'next'
import { getSiteSettings } from '@/sanity/lib/fetchers'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
}

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings()
  
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        
        <div className="mt-8 space-y-8 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="mt-4">
              {settings?.contactInfo?.companyName || 'We'} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">2. Information We Collect</h2>
            <p className="mt-4">We may collect the following types of information:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number when you fill out contact forms.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and time spent.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">3. How We Use Your Information</h2>
            <p className="mt-4">We use your information to:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send you relevant communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">4. Cookies</h2>
            <p className="mt-4">
              Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. 
              You can control cookies through your browser settings. By using our website, you consent to our use of cookies 
              in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">5. Data Sharing</h2>
            <p className="mt-4">
              We do not sell your personal data. We may share your information with trusted third-party service providers 
              who assist us in operating our website, conducting our business, or serving you, as long as they agree to 
              keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">6. Your Rights (GDPR)</h2>
            <p className="mt-4">If you are in the European Union, you have the right to:</p>
            <ul className="mt-2 list-disc list-inside space-y-2">
              <li>Access your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">7. Data Security</h2>
            <p className="mt-4">
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">8. Contact Us</h2>
            <p className="mt-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            {settings?.contactInfo && (
              <div className="mt-4 space-y-1">
                {settings.contactInfo.companyName && <p><strong>{settings.contactInfo.companyName}</strong></p>}
                {settings.contactInfo.email && (
                  <p>Email: <a href={`mailto:${settings.contactInfo.email}`} className="text-primary-600 hover:underline">{settings.contactInfo.email}</a></p>
                )}
                {settings.contactInfo.phone && (
                  <p>Phone: <a href={`tel:${settings.contactInfo.phone.replace(/\s/g, '')}`} className="text-primary-600 hover:underline">{settings.contactInfo.phone}</a></p>
                )}
                {settings.contactInfo.address && <p className="whitespace-pre-line">{settings.contactInfo.address}</p>}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
