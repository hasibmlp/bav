// src/app/(site)/contact/page.tsx
import { PageHero } from '@/components/sections/PageHero'
import { ContactForm } from '@/components/sections/ContactForm'
import type { HeroSection } from '@/types/view'

const staticHeroData: HeroSection = {
  type: 'hero',
  headline: 'Get in Touch',
  subheadline:
    "We're here to help with any questions you may have about our products, services, or partnerships. Reach out to us, and let's start a conversation.",
}

export default function Page() {
  return (
    <>
      <PageHero data={staticHeroData} />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <ContactForm />
        </div>
      </section>
    </>
  )
}
