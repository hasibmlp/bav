// src/types/view.ts
export type ImageView = {
  src: string
  alt?: string
}

export type HeroSection = {
  type: 'hero'
  eyebrow?: string
  headline: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  image?: ImageView
}

export type WhoWeAreSection = {
  type: 'who_we_are'
  eyebrow?: string
  headline?: string
  subheadline?: string
  ctaLabel?: string
  ctaHref?: string
  image?: ImageView
}

export type ServicesSection = {
  type: 'services' | 'services_grid_page'
  title: string
  items: { title: string; description?: string; icon?: string; image?: ImageView }[]
}

export type BrandsSection = {
  type: 'brands'
  title?: string
  items: {
    id: string
    name: string
    logo: ImageView
    url?: string
  }[]
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

export type ContactSection = {
  type: 'contact'
}

export type ContentSection = {
  type: 'content'
  body: string
}

export type SnapshotSection = {
  type: 'snapshot'
  title: string
  metrics: {
    value: string
    label: string
  }[]
}

export type SectorsGridSection = {
  type: 'sectors_grid'
  items: {
    title: string
    description: string
    image: ImageView
  }[]
}

export type PartnersShowcaseSection = {
  type: 'partners_showcase'
  items: {
    name: string
    logo: ImageView
    description: string
    features: string[]
    fit: string
  }[]
}

export type SolutionsShowcaseSection = {
  type: 'solutions_showcase'
  items: {
    title: string
    description: string
    extended_description?: string
    image: ImageView
    features?: string[]
  }[]
}

export type SolutionsSection = {
  type: 'solutions'
  title: string
  description?: string
  items: {
    title: string
    description: string
    audience?: string
    image: ImageView
  }[]
}

export type SectionView =
  | HeroSection
  | WhoWeAreSection
  | ContentSection
  | SnapshotSection
  | ServicesSection
  | SectorsGridSection
  | PartnersShowcaseSection
  | SolutionsSection
  | SolutionsShowcaseSection
  | BrandsSection
  | ValuesSection
  | CoverageSection
  | WhyUsSection
  | CTASection
  | ContactSection

export type PageView = {
  slug: string
  title: string
  sections: SectionView[]
  meta?: { description?: string }
}
