// src/components/sections/ServicesGridAsync.tsx
import { getPageBySlug } from '@/lib/data'
import { ServicesGrid } from './ServicesGrid'

export const revalidate = 60

export default async function ServicesGridAsync() {
  const page = await getPageBySlug('services')
  const section = page?.sections.find(s => s.type === 'services')
  if (!section || section.type !== 'services') return null
  return <ServicesGrid data={section} />
}
