// src/app/(site)/contact/page.tsx
import { getPageBySlug } from '@/lib/data'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/sections/PageHero'
import type { SectionView } from '@/types/view'

export default async function Page() {
  const page = await getPageBySlug('contact')
  if (!page) return null

  return (
    <>
      {page.sections.map((s, i) => {
        if (s.type === 'hero') return <PageHero key={i} data={s} />
        if (s.type === 'contact') {
          return (
            <section key={i} className="py-20 md:py-28">
              <div className="mx-auto max-w-2xl px-4">
                <ContactForm />
              </div>
            </section>
          )
        }
        return null
      })}
    </>
  )
}
