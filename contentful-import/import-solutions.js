require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')
const solutionsData = require('../src/lib/content/mocks/solutions.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importSolutions() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing Solutions Page data...')
  const sectionEntries = []

  const findSection = (type) => solutionsData.sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero')
  if (heroData) {
    console.log('Creating Hero section for Solutions page...')
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

  // 2. Solutions Showcase Section
  const showcaseData = findSection('solutions_showcase')
  if (showcaseData) {
    console.log('Creating Solution Showcase items...')
    const showcaseItems = await Promise.all(
      showcaseData.items.map(async (item) => {
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('solutionShowcaseItem', {
          fields: {
            title: { 'en-US': item.title },
            description: { 'en-US': item.description },
            extended_description: { 'en-US': item.extended_description || '' },
            features: { 'en-US': item.features || [] },
            image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: imageAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )

    console.log('Creating Solutions Showcase section...')
    const showcaseSection = await environment.createEntry('solutionsShowcase', {
      fields: {
        items: {
          'en-US': showcaseItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })),
        },
      },
    })
    await showcaseSection.publish()
    sectionEntries.push(showcaseSection)
    console.log('Published Solutions Showcase section.')
  }

  // Final Step: Create the Solutions Page
  console.log('Creating Solutions page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { 'en-US': solutionsData.title },
      slug: { 'en-US': solutionsData.slug },
      sections: {
        'en-US': sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Solutions page!')
}

run(importSolutions)
