require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const solutionsData = require('../src/lib/content/mocks/solutions.json')
const solutionsDataAr = require('../src/lib/content/mocks/solutions.ar.json')
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
  let heroImage; // Define heroImage in the outer scope
  let heroSection;
  let showcaseSection;

  const findSection = (type, locale) =>
    (locale === 'ar' ? solutionsDataAr : solutionsData).sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  if (heroData) {
    console.log('Creating Hero section for Solutions page...')
    heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'Solutions Hero Image' })
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

  // 2. Solutions Showcase Section
  const showcaseData = findSection('solutions_showcase', 'en')
  const showcaseDataAr = findSection('solutions_showcase', 'ar')
  if (showcaseData) {
    console.log('Creating Solution Showcase items...')
    const showcaseItems = await Promise.all(
      showcaseData.items.map(async (item, i) => {
        const itemAr = showcaseDataAr.items[i]
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('solutionShowcaseItem', {
          fields: {
            title: { en: item.title, ar: itemAr.title },
            description: { en: item.description, ar: itemAr.description },
            extended_description: { en: item.extended_description || '', ar: itemAr.extended_description || '' },
            features: { en: item.features || [], ar: itemAr.features || [] },
            image: { en: { sys: { type: 'Link', linkType: 'Asset', id: imageAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )

    console.log('Creating Solutions Showcase section...')
    showcaseSection = await environment.createEntry('solutionsShowcase', {
      fields: {
        internalTitle: { en: 'Solutions Showcase Section' },
        items: {
          en: showcaseItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })),
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
      title: { en: solutionsData.title, ar: solutionsDataAr.title },
      slug: { en: solutionsData.slug, ar: solutionsDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: [
          { sys: { type: 'Link', linkType: 'Entry', id: heroSection.sys.id } },
          { sys: { type: 'Link', linkType: 'Entry', id: showcaseSection.sys.id } },
        ],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Solutions page!')
}

run(importSolutions)
