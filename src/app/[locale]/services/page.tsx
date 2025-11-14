import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { PageHero } from '@/components/sections/PageHero'
import { ServicesGridPage } from '@/components/sections/ServicesGridPage'
import { CTA } from '@/components/sections/CTA'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const page = await getPageBySlug('services', locale)
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <PageHero key={i} data={section} />
      case 'services_grid_page':
        return <ServicesGridPage key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
