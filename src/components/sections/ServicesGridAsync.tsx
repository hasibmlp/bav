// src/components/sections/ServicesGridAsync.tsx
import { getPageBySlug } from '@/lib/data'
import { getLocale } from 'next-intl/server'
import { ServicesGrid } from './ServicesGrid'

export const revalidate = 60

export default async function ServicesGridAsync() {
  const locale = await getLocale()
  const page = await getPageBySlug('home', locale)
  const section = page?.sections.find((s) => s.type === 'services')
  if (!section || section.type !== 'services') return null
  return <ServicesGrid data={section} />
}
