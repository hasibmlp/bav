import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { PageHero } from '@/components/sections/PageHero'
import { Content } from '@/components/sections/Content'
import { SolutionsShowcase } from '@/components/sections/SolutionsShowcase'
import { SectorsGrid } from '@/components/sections/SectorsGrid'
import { PartnersShowcase } from '@/components/sections/PartnersShowcase'
import { Snapshot } from '@/components/sections/Snapshot'
import { ValuesGrid } from '@/components/sections/ValuesGrid'
import { CTA } from '@/components/sections/CTA'
import { ServicesGridPage } from '@/components/sections/ServicesGridPage'

export default async function Page({
  params: { slug, locale },
}: {
  params: { slug: string; locale: string }
}) {
  const page = await getPageBySlug(slug, locale)
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <PageHero key={i} data={section} />
      case 'content':
        return <Content key={i} data={section} />
      case 'solutions_showcase':
        return <SolutionsShowcase key={i} data={section} />
      case 'sectors_grid':
        return <SectorsGrid key={i} data={section} />
      case 'partners_showcase':
        return <PartnersShowcase key={i} data={section} />
      case 'snapshot':
        return <Snapshot key={i} data={section} />
      case 'values':
        return <ValuesGrid key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      case 'services_grid_page':
        return <ServicesGridPage key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
