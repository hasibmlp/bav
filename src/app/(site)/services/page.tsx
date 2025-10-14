// src/app/(site)/services/page.tsx
import { getPageBySlug } from '@/lib/data'
import { ServicesGridPage } from '@/components/sections/ServicesGridPage'
import { PageHero } from '@/components/sections/PageHero'
import type { SectionView } from '@/types/view'

export default async function Page() {
  const page = await getPageBySlug('services')
  if (!page) return null
  return (
    <>
      {page.sections.map((s, i) => {
        if (s.type === 'hero') return <PageHero key={i} data={s} />
        if (s.type === 'services') return <ServicesGridPage key={i} data={s} />
        return null
      })}
    </>
  )
}
