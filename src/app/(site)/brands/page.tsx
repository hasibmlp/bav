// src/app/(site)/brands/page.tsx
import { getPageBySlug } from '@/lib/data'
import { BrandsGrid } from '@/components/sections/BrandsGrid'
import type { SectionView } from '@/types/view'

export default async function Page() {
  const page = await getPageBySlug('brands')
  if (!page) return null
  return <>{page.sections.map((s, i) => (s.type === 'brands' ? <BrandsGrid key={i} data={s} /> : null))}</>
}
