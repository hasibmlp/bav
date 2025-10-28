import { getPageBySlug } from '@/lib/data'
import type { SectionView } from '@/types/view'
import { Hero } from '@/components/sections/Hero'
import { WhoWeAre } from '@/components/sections/WhoWeAre'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { Solutions } from '@/components/sections/Solutions'
import { BrandsWall } from '@/components/sections/BrandsWall'
import { WhyUs } from '@/components/sections/WhyUs'
import { Coverage } from '@/components/sections/Coverage'
import { CTA } from '@/components/sections/CTA'

export default async function Page() {
  const page = await getPageBySlug('home')
  if (!page) return null

  const renderSection = (section: SectionView, i: number) => {
    switch (section.type) {
      case 'hero':
        return <Hero key={i} data={section} />
      case 'who_we_are':
        return <WhoWeAre key={i} data={section} />
      case 'services':
        return <ServicesGrid key={i} data={section} />
      case 'solutions':
        return <Solutions key={i} data={section} />
      case 'brands':
        return <BrandsWall key={i} data={section} />
      case 'whyus':
        return <WhyUs key={i} data={section} />
      case 'coverage':
        return <Coverage key={i} data={section} />
      case 'cta':
        return <CTA key={i} data={section} />
      default:
        return null
    }
  }

  return <>{page.sections.map(renderSection)}</>
}
