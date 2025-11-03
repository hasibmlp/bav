require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')
const sectorsData = require('../src/lib/content/mocks/sectors.json')
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

  const findSection = (type) => sectorsData.sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero')
  if (heroData) {
    console.log('Creating Hero section for Sectors page...')
    const heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { 'en-US': heroData.headline },
        subheadline: { 'en-US': heroData.subheadline },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Sectors Grid Section
  const gridData = findSection('sectors_grid')
  if (gridData) {
    console.log('Creating Sector items...')
    const gridItems = await Promise.all(
      gridData.items.map(async (item) => {
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('sectorItem', {
          fields: {
            title: { 'en-US': item.title },
            description: { 'en-US': item.description },
            image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: imageAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )

    console.log('Creating Sectors Grid section...')
    const gridSection = await environment.createEntry('sectorsGrid', {
      fields: {
        items: {
          'en-US': gridItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })),
        },
      },
    })
    await gridSection.publish()
    sectionEntries.push(gridSection)
    console.log('Published Sectors Grid section.')
  }
  
    // 3. CTA Section
    const ctaData = findSection('cta')
    if (ctaData) {
      console.log('Creating CTA section for Sectors page...')
      const ctaSection = await environment.createEntry('cta', {
        fields: {
          headline: { 'en-US': ctaData.headline },
          ctaLabel: { 'en-US': ctaData.ctaLabel },
          ctaHref: { 'en-US': ctaData.ctaHref },
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
      title: { 'en-US': sectorsData.title },
      slug: { 'en-US': sectorsData.slug },
      sections: {
        'en-US': sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Sectors page!')
}

run(importSectors)
