// src/app/(site)/about/page.tsx
import { getPageBySlug } from '@/lib/data'
import { PageHero } from '@/components/sections/PageHero'
import { ValuesGrid } from '@/components/sections/ValuesGrid'
import { Coverage } from '@/components/sections/Coverage'
import type { SectionView } from '@/types/view'

export default async function Page() {
  const page = await getPageBySlug('about')
  if (!page) return null

  const render = (s: SectionView, i: number) => {
    if (s.type === 'hero') return <PageHero key={i} data={s} />
    if (s.type === 'values') return <ValuesGrid key={i} data={s} />
    if (s.type === 'coverage') return <Coverage key={i} data={s} />
    return null
  }

  return <>{page.sections.map(render)}</>
}
