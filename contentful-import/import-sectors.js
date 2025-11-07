require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const sectorsData = require('../src/lib/content/mocks/sectors.json')
const sectorsDataAr = require('../src/lib/content/mocks/sectors.ar.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importSectors() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing Sectors Page data...')
  const sectionEntries = []
  let heroImage; // Define heroImage in the outer scope
  let heroSection;
  let gridSection;
  let ctaSection;

  const findSection = (type, locale) =>
    (locale === 'ar' ? sectorsDataAr : sectorsData).sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  if (heroData) {
    console.log('Creating Hero section for Sectors page...')
    heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'Sectors Hero Image' })
    heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { en: heroData.headline, ar: heroDataAr.headline },
        subheadline: { en: heroData.subheadline, ar: heroDataAr.subheadline },
        image: { en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } } },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Sectors Grid Section
  const gridData = findSection('sectors_grid', 'en')
  const gridDataAr = findSection('sectors_grid', 'ar')
  if (gridData) {
    console.log('Creating Sector items...')
    const gridItems = await Promise.all(
      gridData.items.map(async (item, i) => {
        const itemAr = gridDataAr.items[i]
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('sectorItem', {
          fields: {
            title: { en: item.title, ar: itemAr.title },
            description: { en: item.description, ar: itemAr.description },
            image: { en: { sys: { type: 'Link', linkType: 'Asset', id: imageAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )

    console.log('Creating Sectors Grid section...')
    gridSection = await environment.createEntry('sectorsGrid', {
      fields: {
        internalTitle: { en: 'Sectors Grid Section' },
        items: {
          en: gridItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })),
        },
      },
    })
    await gridSection.publish()
    sectionEntries.push(gridSection)
    console.log('Published Sectors Grid section.')
  }
  
    // 3. CTA Section
    const ctaData = findSection('cta', 'en')
    const ctaDataAr = findSection('cta', 'ar')
    if (ctaData) {
      console.log('Creating CTA section for Sectors page...')
      ctaSection = await environment.createEntry('cta', {
        fields: {
          headline: { en: ctaData.headline, ar: ctaDataAr.headline },
          ctaLabel: { en: ctaData.ctaLabel, ar: ctaDataAr.ctaLabel },
          ctaHref: { en: ctaData.ctaHref },
        },
      })
      await ctaSection.publish()
      sectionEntries.push(ctaSection)
      console.log('Published CTA section.')
    }

  // Final Step: Create the Page
  console.log('Creating Sectors page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { en: sectorsData.title, ar: sectorsDataAr.title },
      slug: { en: sectorsData.slug, ar: sectorsDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: [
          { sys: { type: 'Link', linkType: 'Entry', id: heroSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: gridSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: ctaSection.sys.id } },
        ],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Sectors page!')
}

run(importSectors)
