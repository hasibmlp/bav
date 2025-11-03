require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')
const partnersData = require('../src/lib/content/mocks/partners.json')
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

  // 1. Create Partner Items (reusable entries)
  const partnerItemPromises = partnersData.sections
    .find((s) => s.type === 'partners_showcase')
    .items.map(async (partner) => {
      console.log(`Creating entry for ${partner.name}...`)

      // First, we need to create or get the asset for the logo
      const logoAsset = await asset.create(environment, {
        src: partner.logo.src,
        alt: partner.logo.alt,
      })

      const entry = await environment.createEntry('partnerItem', {
        fields: {
          name: { 'en-US': partner.name },
          description: { 'en-US': partner.description },
          logo: {
            'en-US': {
              sys: { type: 'Link', linkType: 'Asset', id: logoAsset.sys.id },
            },
          },
          features: { 'en-US': partner.features },
          fit: { 'en-US': partner.fit },
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
      items: {
        'en-US': partnerItems.map((item) => ({
          sys: { type: 'Link', linkType: 'Entry', id: item.sys.id },
        })),
      },
    },
  })
  await showcaseSection.publish()
  console.log('Published Partners Showcase section.')

  // 3. Create the Hero Section for the Partners Page
  const heroData = partnersData.sections.find((s) => s.type === 'hero')
  console.log('Creating Hero section for Partners page...')
  const heroSection = await environment.createEntry('hero', {
    fields: {
      headline: { 'en-US': heroData.headline },
      subheadline: { 'en-US': heroData.subheadline },
    },
  })
  await heroSection.publish()
  console.log('Published Hero section.')

  // 4. Create the "Partners" Page
  console.log('Creating Partners page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { 'en-US': partnersData.title },
      slug: { 'en-US': partnersData.slug },
      sections: {
        'en-US': [
          { sys: { type: 'Link', linkType: 'Entry', id: heroSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: showcaseSection.sys.id } },
        ],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Partners page!')
}

run(importPartners)
