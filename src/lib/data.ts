// src/lib/data.ts
import home from '@/lib/content/mocks/home.json'
import about from '@/lib/content/mocks/about.json'
import services from '@/lib/content/mocks/services.json'
import contact from '@/lib/content/mocks/contact.json'
import solutions from '@/lib/content/mocks/solutions.json'
import sectors from '@/lib/content/mocks/sectors.json'
import partners from '@/lib/content/mocks/partners.json'
import type { PageView, SectionView } from '@/types/view'

const pages: Record<string, PageView> = {
  home: home as PageView,
  about: about as PageView,
  services: services as PageView,
  contact: contact as PageView,
  solutions: solutions as PageView,
  sectors: sectors as PageView,
  partners: partners as PageView,
}

export async function getPageBySlug(slug: string): Promise<PageView | null> {
  return pages[slug] || null
}

export async function getAllPages(): Promise<PageView[]> {
  return Object.values(pages)
}
