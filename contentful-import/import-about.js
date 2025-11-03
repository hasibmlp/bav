require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')
const aboutData = require('../src/lib/content/mocks/about.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importAbout() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing About Page data...')
  const sectionEntries = []

  const findSection = (type) => aboutData.sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero')
  if (heroData) {
    console.log('Creating Hero section...')
    const heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'A professional team collaborating in a modern office environment.' })
    const heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { 'en-US': heroData.headline },
        subheadline: { 'en-US': heroData.subheadline },
        image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } } },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Snapshot Section
  const snapshotData = findSection('snapshot')
  if (snapshotData) {
    console.log('Creating Metric items...')
    const metricItems = await Promise.all(
      snapshotData.metrics.map(async (metric) => {
        const entry = await environment.createEntry('metricItem', {
          fields: {
            value: { 'en-US': metric.value },
            label: { 'en-US': metric.label },
          },
        })
        await entry.publish()
        return entry
      })
    )
    console.log('Creating Snapshot section...')
    const snapshotSection = await environment.createEntry('snapshot', {
      fields: {
        title: { 'en-US': snapshotData.title },
        metrics: { 'en-US': metricItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await snapshotSection.publish()
    sectionEntries.push(snapshotSection)
    console.log('Published Snapshot section.')
  }

  // 3. Values Section
  const valuesData = findSection('values')
  if (valuesData) {
    console.log('Creating Value items...')
    const valueItems = await Promise.all(
      valuesData.items.map(async (item) => {
        const entry = await environment.createEntry('valueItem', {
          fields: {
            title: { 'en-US': item.title },
            description: { 'en-US': item.description },
            icon: { 'en-US': item.icon },
          },
        })
        await entry.publish()
        return entry
      })
    )
    console.log('Creating Values section...')
    const valuesSection = await environment.createEntry('valuesGrid', {
      fields: {
        title: { 'en-US': valuesData.title },
        items: { 'en-US': valueItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await valuesSection.publish()
    sectionEntries.push(valuesSection)
    console.log('Published Values section.')
  }
  
  // 4. CTA Section
  const ctaData = findSection('cta')
  if (ctaData) {
    console.log('Creating CTA section...')
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
  console.log('Creating About page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { 'en-US': aboutData.title },
      slug: { 'en-US': aboutData.slug },
      sections: {
        'en-US': sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the About page!')
}

run(importAbout)
