// src/app/(site)/page.tsx (Home)
import { getPageBySlug } from '@/lib/data'
import { Hero } from '@/components/sections/Hero'
import { BrandsWall } from '@/components/sections/BrandsWall'
import { Coverage } from '@/components/sections/Coverage'
import { WhyUs } from '@/components/sections/WhyUs'
import { CTA } from '@/components/sections/CTA'
import { AboutSnapshot } from '@/components/sections/AboutSnapshot'
import type { SectionView } from '@/types/view'
import { Suspense } from 'react'
import ServicesGridAsync from '@/components/sections/ServicesGridAsync'

export default async function Page() {
  const page = await getPageBySlug('home')
  if (!page) return null

  const render = (s: SectionView, i: number) => {
    switch (s.type) {
      case 'hero':  
        return <Hero key={i} data={s} />
      case 'services':
        return (
          <Suspense key={i} fallback={<div className="py-12 text-neutral-500">Loading services…</div>}>
            <ServicesGridAsync />
          </Suspense>
        )
      case 'brands':
        return <BrandsWall key={i} data={s} />
      case 'coverage':
        return <Coverage key={i} data={s} />
      case 'whyus':
        return <WhyUs key={i} data={s} />
      case 'cta':
        return <CTA key={i} data={s} />
      default:
        return null
    }
  }

  return <>{page.sections.map(render)}</>
}
