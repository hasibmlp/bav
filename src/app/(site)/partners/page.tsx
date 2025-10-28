import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { PageHero } from '@/components/sections/PageHero'
import { PartnersShowcase } from '@/components/sections/PartnersShowcase'
import { CTA } from '@/components/sections/CTA'

export default async function Page() {
  const page = await getPageBySlug('partners')
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <PageHero key={i} data={section} />
      case 'partners_showcase':
        return <PartnersShowcase key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
