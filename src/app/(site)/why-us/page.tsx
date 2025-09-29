// src/app/(site)/why-us/page.tsx
import { getPageBySlug } from '@/lib/data'
import { WhyUs } from '@/components/sections/WhyUs'
import type { SectionView } from '@/types/view'

export default async function Page() {
  const page = await getPageBySlug('why-us')
  if (!page) return null
  return <>{page.sections.map((s, i) => (s.type === 'whyus' ? <WhyUs key={i} data={s} /> : null))}</>
}
