import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { PageHero } from '@/components/sections/PageHero'
import { SectorsGrid } from '@/components/sections/SectorsGrid'
import { CTA } from '@/components/sections/CTA'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getPageBySlug('sectors', locale)
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <PageHero key={i} data={section} />
      case 'sectors_grid':
        return <SectorsGrid key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
