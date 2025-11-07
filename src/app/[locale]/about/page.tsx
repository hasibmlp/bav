import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { PageHero } from '@/components/sections/PageHero'
import { Snapshot } from '@/components/sections/Snapshot'
import { ValuesGrid } from '@/components/sections/ValuesGrid'
import { CTA } from '@/components/sections/CTA'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getPageBySlug('about', locale)
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <PageHero key={i} data={section} heroImage={page.heroImage} />
      case 'snapshot':
        return <Snapshot key={i} data={section} />
      case 'values':
        return <ValuesGrid key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
