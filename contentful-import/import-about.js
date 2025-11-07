require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const aboutData = require('../src/lib/content/mocks/about.json')
const aboutDataAr = require('../src/lib/content/mocks/about.ar.json')
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
  let heroImage; // Define heroImage in the outer scope

  const findSection = (type, locale) =>
    (locale === 'ar' ? aboutDataAr : aboutData).sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  if (heroData) {
    console.log('Creating Hero section for About page...')
    heroImage = await asset.create(environment, { src: '/images/bav-hero.jpg', alt: 'A professional team collaborating in a modern office environment.' })
    const heroSection = await environment.createEntry('hero', {
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

  // 2. Snapshot Section
  const snapshotData = findSection('snapshot', 'en')
  const snapshotDataAr = findSection('snapshot', 'ar')
  if (snapshotData) {
    console.log('Creating Snapshot section...')
    const metricItems = await Promise.all(
      snapshotData.metrics.map(async (metric, i) => {
        const metricAr = snapshotDataAr.metrics[i]
        const entry = await environment.createEntry('metricItem', {
          fields: {
            value: { en: metric.value, ar: metricAr.value },
            label: { en: metric.label, ar: metricAr.label },
          },
        })
        await entry.publish()
        return entry
      })
    )
    const snapshotSection = await environment.createEntry('snapshot', {
      fields: {
        title: { en: snapshotData.title, ar: snapshotDataAr.title },
        metrics: { en: metricItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await snapshotSection.publish()
    sectionEntries.push(snapshotSection)
    console.log('Published Snapshot section.')
  }

  // 3. Values Grid Section
  const valuesData = findSection('values', 'en')
  const valuesDataAr = findSection('values', 'ar')
  if (valuesData) {
    console.log('Creating Values Grid section...')
    const valueItems = await Promise.all(
      valuesData.items.map(async (item, i) => {
        const itemAr = valuesDataAr.items[i]
        const entry = await environment.createEntry('valueItem', {
          fields: {
            title: { en: item.title, ar: itemAr.title },
            description: { en: item.description, ar: itemAr.description },
            icon: { en: item.icon },
          },
        })
        await entry.publish()
        return entry
      })
    )
    const valuesSection = await environment.createEntry('valuesGrid', {
      fields: {
        title: { en: valuesData.title, ar: valuesDataAr.title },
        items: { en: valueItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await valuesSection.publish()
    sectionEntries.push(valuesSection)
    console.log('Published Values Grid section.')
  }

  // 4. CTA Section
  const ctaData = findSection('cta', 'en')
  const ctaDataAr = findSection('cta', 'ar')
  if (ctaData) {
    console.log('Creating CTA section for About page...')
    const ctaSection = await environment.createEntry('cta', {
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
  console.log('Creating About page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { en: aboutData.title, ar: aboutDataAr.title },
      slug: { en: aboutData.slug, ar: aboutDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the About page!')
}

run(importAbout)
