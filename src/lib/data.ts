import { contentfulClient } from './contentful'
import type {
  PageView,
  SectionView,
  HeroSection,
  WhoWeAreSection,
  SolutionsSection,
  BrandsSection,
  ServicesSection,
  CoverageSection,
  WhyUsSection,
  SnapshotSection,
  ValuesSection,
  CTASection,
  SolutionsShowcaseSection,
  SectorsGridSection,
  PartnersShowcaseSection,
  ImageView,
  NavigationLink,
  NavigationMenu,
  ThemeSettings,
  PartnerItem,
} from '@/types/view'
import type { Entry, Asset } from 'contentful'

const transformImage = (imageField?: Asset): ImageView | undefined => {
  if (!imageField?.fields?.file) return undefined
  return {
    src: 'https:' + imageField.fields.file.url,
    alt: (imageField.fields.description as string) || '',
    contentType: imageField.fields.file.contentType as string,
  }
}

const sectionTransformers: Record<string, (entry: Entry<any>) => SectionView | null> = {
  hero: (entry): HeroSection => ({
    type: 'hero',
    headline: entry.fields.headline as string,
    subheadline: entry.fields.subheadline as string | undefined,
    eyebrow: entry.fields.eyebrow as string | undefined,
    image: transformImage(entry.fields.image as Asset | undefined),
    ctaLabel: entry.fields.ctaLabel as string | undefined,
    ctaHref: entry.fields.ctaHref as string | undefined,
    secondaryCtaLabel: entry.fields.secondaryCtaLabel as string | undefined,
    secondaryCtaHref: entry.fields.secondaryCtaHref as string | undefined,
  }),
  whoWeAre: (entry): WhoWeAreSection => ({
    type: 'who_we_are',
    headline: entry.fields.headline as string,
    subheadline: entry.fields.subheadline as string,
    image: transformImage(entry.fields.image as Asset | undefined),
  }),
  solutions: (entry): SolutionsSection => ({
    type: 'solutions',
    title: entry.fields.title as string,
    description: entry.fields.description as string | undefined,
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        image: transformImage(item.fields.image as Asset)!,
      })) || [],
  }),
  brandsWall: (entry): BrandsSection => ({
    type: 'brands',
    title: entry.fields.title as string | undefined,
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        id: item.sys.id,
        name: item.fields.name as string,
        logo: transformImage(item.fields.logo as Asset)!,
      })) || [],
  }),
  servicesGrid: (entry): ServicesSection => ({
    type: 'services',
    title: entry.fields.title as string,
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        image: transformImage(item.fields.image as Asset)!,
      })) || [],
  }),
  coverage: (entry): CoverageSection => ({
    type: 'coverage',
    title: entry.fields.title as string | undefined,
    subtitle: entry.fields.subtitle as string | undefined,
    regions: (entry.fields.regions as string[]) || [],
  }),
  whyUs: (entry): WhyUsSection => ({
    type: 'whyus',
    title: entry.fields.title as string | undefined,
    description: entry.fields.description as string | undefined,
    bullets: (entry.fields.bullets as string[]) || [],
  }),
  snapshot: (entry): SnapshotSection => ({
    type: 'snapshot',
    title: entry.fields.title as string,
    metrics:
      (entry.fields.metrics as Entry<any>[] | undefined)?.map((item) => ({
        value: item.fields.value as string,
        label: item.fields.label as string,
      })) || [],
  }),
  valuesGrid: (entry): ValuesSection => ({
    type: 'values',
    title: entry.fields.title as string | undefined,
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        icon: item.fields.icon as string,
      })) || [],
  }),
  cta: (entry): CTASection => ({
    type: 'cta',
    headline: entry.fields.headline as string,
    subheadline: entry.fields.subheadline as string | undefined,
    ctaLabel: entry.fields.ctaLabel as string | undefined,
    ctaHref: entry.fields.ctaHref as string | undefined,
  }),
  contactForm: () => ({
    type: 'contact',
  }),
  solutionsShowcase: (entry): SolutionsShowcaseSection => ({
    type: 'solutions_showcase',
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        extended_description: item.fields.extended_description as string,
        image: transformImage(item.fields.image as Asset)!,
        features: (item.fields.features as string[]) || [],
      })) || [],
  }),
  sectorsGrid: (entry): SectorsGridSection => ({
    type: 'sectors_grid',
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        image: transformImage(item.fields.image as Asset)!,
      })) || [],
  }),
  partnersShowcase: (entry): PartnersShowcaseSection => ({
    type: 'partners_showcase',
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map(transformPartnerItem) ||
      [],
  }),
  servicesGridPage: (entry): ServicesSection => ({
    type: 'services_grid_page',
    title: entry.fields.title as string,
    items:
      (entry.fields.items as Entry<any>[] | undefined)?.map((item) => ({
        title: item.fields.title as string,
        description: item.fields.description as string,
        image: transformImage(item.fields.image as Asset)!,
      })) || [],
  }),
}

const transformPartnerItem = (entry: Entry<any>): PartnerItem => ({
  name: entry.fields.name as string,
  logo: transformImage(entry.fields.logo as Asset)!,
  description: entry.fields.description as string,
  features: (entry.fields.features as string[]) || [],
  fit: entry.fields.fit as string,
  url: entry.fields.url as string | undefined,
  ctaLabel: entry.fields.ctaLabel as string | undefined,
})

const transformPage = (entry: Entry<any>): PageView | null => {
  if (!entry?.fields) return null

  const sections = (entry.fields.sections as Entry<any>[] | undefined)
    ?.map((section) => {
      const contentTypeId = section.sys.contentType.sys.id
      const transformer = sectionTransformers[contentTypeId]
      return transformer ? transformer(section) : null
    })
    .filter((s): s is SectionView => s !== null)

  return {
    slug: entry.fields.slug as string,
    title: entry.fields.title as string,
    heroImage: transformImage(entry.fields.heroImage as Asset | undefined),
    sections: sections || [],
  }
}

export async function getThemeSettings(locale: string): Promise<ThemeSettings | null> {
  const response = await contentfulClient.getEntries({
    content_type: 'themeSettings',
    'fields.internalTitle': 'Default Theme',
    locale: locale,
    include: 2,
  })

  if (!response.items || response.items.length === 0) {
    return null
  }

  const settings = response.items[0]

  return {
    navigation: (settings.fields.navigation as NavigationMenu) || { items: [] },
    primaryColor: settings.fields.primaryColor as string | undefined,
    primaryColorRgb: settings.fields.primaryColorRgb as string | undefined,
    primaryColorTint: settings.fields.primaryColorTint as string | undefined,
    secondaryColor: settings.fields.secondaryColor as string | undefined,
    darkColor: settings.fields.darkColor as string | undefined,
    lightBgColor: settings.fields.lightBgColor as string | undefined,
    footerBackgroundColor: settings.fields.footerBackgroundColor as string | undefined,
  }
}

export async function getPageBySlug(
  slug: string,
  locale: string
): Promise<PageView | null> {
  // This is a simpler, more direct query.
  // It asks for a 'page' where the 'fields.slug' for the GIVEN LOCALE matches.
  // Because our content model is now correct, this single query will work.
  const response = await contentfulClient.getEntries({
    content_type: 'page',
    'fields.slug': slug,
    locale: locale,
    include: 10,
  })

  if (!response.items || response.items.length === 0) {
    return null
  }

  return transformPage(response.items[0])
}

export async function getAllPages(locale: string): Promise<PageView[]> {
  const response = await contentfulClient.getEntries({
    content_type: 'page',
    locale: locale,
    include: 10,
  })

  if (!response.items) {
    return []
  }

  return response.items.map((item) => transformPage(item)).filter((p): p is PageView => p !== null)
}

