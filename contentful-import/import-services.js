require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const servicesData = require('../src/lib/content/mocks/services.json')
const servicesDataAr = require('../src/lib/content/mocks/services.ar.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importServices() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing Services Page data...')
  const sectionEntries = []
  let heroSection;
  let gridSection;

  const findSection = (type, locale) =>
    (locale === 'ar' ? servicesDataAr : servicesData).sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  if (heroData) {
    console.log('Creating Hero section for Services page...')
    heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { en: heroData.headline, ar: heroDataAr.headline },
        subheadline: { en: heroData.subheadline, ar: heroDataAr.subheadline },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Services Grid Section
  const gridData = findSection('services_grid_page', 'en')
  const gridDataAr = findSection('services_grid_page', 'ar')
  if (gridData) {
    console.log('Creating Service items...')
    const gridItems = await Promise.all(
      gridData.items.map(async (item, i) => {
        const itemAr = gridDataAr.items[i]
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('serviceItem', {
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

    console.log('Creating Services Grid (Page) section...')
    gridSection = await environment.createEntry('servicesGridPage', {
      fields: {
        internalTitle: { en: 'Services Grid Section' },
        items: {
          en: gridItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })),
        },
      },
    })
    await gridSection.publish()
    sectionEntries.push(gridSection)
    console.log('Published Services Grid (Page) section.')
  }
  
  // Final Step: Create the Page
  console.log('Creating Services page entry...')
  const heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'Services page hero image' })
  const page = await environment.createEntry('page', {
    fields: {
      title: { en: servicesData.title, ar: servicesDataAr.title },
      slug: { en: servicesData.slug, ar: servicesDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: [
          { sys: { type: 'Link', linkType: 'Entry', id: heroSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: gridSection.sys.id } },
        ],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Services page!')
}

run(importServices)
