// src/types/view.ts
export type ImageView = { src: string; alt?: string; width?: number; height?: number }

export type HeroSection = {
  type: 'hero'
  eyebrow?: string
  headline: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  image?: ImageView
}

export type ServicesSection = {
  type: 'services'
  title?: string
  items: { title: string; description?: string; icon?: string }[]
}

export type BrandsSection = {
  type: 'brands'
  title?: string
  categories?: string[]
  items: { name: string; logo?: ImageView; category?: string; url?: string }[]
}

export type ValuesSection = {
  type: 'values'
  title?: string
  items: { title: string; description?: string; icon?: string }[]
}

export type CoverageSection = {
  type: 'coverage'
  title?: string
  regions: string[]
}

export type WhyUsSection = {
  type: 'whyus'
  title?: string
  bullets: string[]
}

export type CTASection = {
  type: 'cta'
  headline: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
}

export type SectionView =
  | HeroSection
  | ServicesSection
  | BrandsSection
  | ValuesSection
  | CoverageSection
  | WhyUsSection
  | CTASection

export type PageView = {
  slug: string
  title: string
  sections: SectionView[]
  meta?: { description?: string }
}
