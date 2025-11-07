require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const contactData = require('../src/lib/content/mocks/contact.json')
const contactDataAr = require('../src/lib/content/mocks/contact.ar.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importContactPage() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing Contact Page data...')

  // Create Hero Image Asset
  const heroImage = await asset.create(environment, { src: contactData.heroImage, alt: 'Contact page hero image' })

  // Create Contact Form Section
  console.log('Creating Contact Form section...')
  const contactFormSection = await environment.createEntry('contactForm', {
    fields: {
      internalTitle: {
        en: contactData.sections[0].internalTitle,
        ar: contactDataAr.sections[0].internalTitle,
      },
    },
  })
  await contactFormSection.publish()

  // Create the Contact Page
  console.log('Creating Contact page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { en: contactData.title, ar: contactDataAr.title },
      slug: { en: contactData.slug, ar: contactDataAr.slug },
      heroImage: {
        en: { sys: { type: 'Link', linkType: 'Asset', id: heroImage.sys.id } },
      },
      sections: {
        en: [{ sys: { type: 'Link', linkType: 'Entry', id: contactFormSection.sys.id } }],
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Contact page!')
}

run(importContactPage)
