require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const partnersData = require('../src/lib/content/mocks/partners.json')
const partnersDataAr = require('../src/lib/content/mocks/partners.ar.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importPartners() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({
    accessToken: MANAGEMENT_TOKEN,
  })

  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing partners...')

  const findSection = (type, locale) =>
    (locale === 'ar' ? partnersDataAr : partnersData).sections.find((s) => s.type === type)

  // 1. Create Partner Items (reusable entries)
  const showcaseData = findSection('partners_showcase', 'en')
  const showcaseDataAr = findSection('partners_showcase', 'ar')

  const partnerItemPromises = showcaseData.items.map(async (partner, i) => {
    const partnerAr = showcaseDataAr.items[i]
    console.log(`Creating entry for ${partner.name}...`)

    // First, we need to create or get the asset for the logo
    const logoAsset = await asset.create(environment, {
      src: partner.logo.src,
      alt: partner.logo.alt,
    })

    const entry = await environment.createEntry('partnerItem', {
      fields: {
        name: { en: partner.name, ar: partnerAr.name },
        description: { en: partner.description, ar: partnerAr.description },
        logo: {
          en: {
            sys: { type: 'Link', linkType: 'Asset', id: logoAsset.sys.id },
          },
        },
        features: { en: partner.features, ar: partnerAr.features },
        fit: { en: partner.fit, ar: partnerAr.fit },
        url: { en: partner.url },
        ctaLabel: { en: partner.ctaLabel, ar: partnerAr.ctaLabel },
      },
    })
    await entry.publish()
    console.log(`Published entry for ${partner.name}.`)
    return entry
  })

  const partnerItems = await Promise.all(partnerItemPromises)
  console.log('All partner items created and published.')

  // 2. Create the Partners Showcase Section
  console.log('Creating Partners Showcase section...')
  const showcaseSection = await environment.createEntry('partnersShowcase', {
    fields: {
      internalTitle: { en: 'Partners Showcase Section' },
      items: {
        en: partnerItems.map((item) => ({
          sys: { type: 'Link', linkType: 'Entry', id: item.sys.id },
        })),
      },
    },
  })
  await showcaseSection.publish()
  console.log('Published Partners Showcase section.')

  // 3. Create the Hero Section for the Partners Page
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  console.log('Creating Hero section for Partners page...')
  const heroSection = await environment.createEntry('hero', {
    fields: {
      headline: { en: heroData.headline, ar: heroDataAr.headline },
      subheadline: { en: heroData.subheadline, ar: heroDataAr.subheadline },
    },
  })
  await heroSection.publish()
  console.log('Published Hero section.')
  
  // 4. Create the CTA Section
  const ctaData = findSection('cta', 'en')
  const ctaDataAr = findSection('cta', 'ar')
  console.log('Creating CTA section for Partners page...')
  const ctaSection = await environment.createEntry('cta', {
    fields: {
      headline: { en: ctaData.headline, ar: ctaDataAr.headline },
      subheadline: { en: ctaData.subheadline, ar: ctaDataAr.subheadline },
      ctaLabel: { en: ctaData.ctaLabel, ar: ctaDataAr.ctaLabel },
      ctaHref: { en: ctaData.ctaHref },
    },
  })
  await ctaSection.publish()
  console.log('Published CTA section.')

  // 5. Create the "Partners" Page
  console.log('Creating Partners page entry...')
  const heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'Partners page hero image' })
  const page = await environment.createEntry('page', {
    fields: {
      title: { en: partnersData.title, ar: partnersDataAr.title },
      slug: { en: partnersData.slug, ar: partnersDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: [
          { sys: { type: 'Link', linkType: 'Entry', id: heroSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: showcaseSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: ctaSection.sys.id } },
        ],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Partners page!')
}

run(importPartners)
