require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')
const homeData = require('../src/lib/content/mocks/home.json')
const { run, asset } = require('./_utlis')

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
const ENVIRONMENT_ID = 'master'

async function importHome() {
  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    throw new Error('Contentful space ID and management token must be provided in .env.local')
  }

  const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
  const space = await client.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(ENVIRONMENT_ID)

  console.log('Importing Home Page data...')
  const sectionEntries = []

  // Helper to find a section by type from the JSON data
  const findSection = (type) => homeData.sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero')
  if (heroData) {
    console.log('Creating Hero section...')
    
    const assetSource = heroData.video || heroData.image
    if (!assetSource) {
      throw new Error('Hero section must have either a video or an image.')
    }

    const heroAsset = await asset.create(environment, { src: assetSource.src, alt: 'Hero background' })
    const heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { 'en-US': heroData.headline },
        subheadline: { 'en-US': heroData.subheadline },
        eyebrow: { 'en-US': heroData.eyebrow },
        image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: heroAsset.sys.id } } },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Who We Are Section
  const whoData = findSection('who_we_are')
  if (whoData) {
    console.log('Creating Who We Are section...')
    // Correct the image path to use an existing decorative image
    const whoImage = await asset.create(environment, { src: '/images/bnc-who-1.jpeg', alt: 'Decorative image for Who We Are section' })
    const whoSection = await environment.createEntry('whoWeAre', {
      fields: {
        headline: { 'en-US': whoData.headline },
        subheadline: { 'en-US': whoData.subheadline },
        image: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: whoImage.sys.id } } },
      },
    })
    await whoSection.publish()
    sectionEntries.push(whoSection)
    console.log('Published Who We Are section.')
  }

  // 3. Solutions Section
  const solutionsData = findSection('solutions')
  if (solutionsData) {
    console.log('Creating Solution items...')
    const solutionItems = await Promise.all(
      solutionsData.items.map(async (item) => {
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('solutionItem', {
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
    console.log('Creating Solutions section...')
    const solutionsSection = await environment.createEntry('solutions', {
      fields: {
        title: { 'en-US': solutionsData.title },
        description: { 'en-US': solutionsData.description },
        items: { 'en-US': solutionItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await solutionsSection.publish()
    sectionEntries.push(solutionsSection)
    console.log('Published Solutions section.')
  }

  // 4. Brands Wall Section
  const brandsData = findSection('brands')
  if (brandsData) {
    console.log('Creating Brand items...')
    const brandItems = await Promise.all(
      brandsData.items.map(async (item) => {
        const logoAsset = await asset.create(environment, item.logo)
        const entry = await environment.createEntry('brandItem', {
          fields: {
            name: { 'en-US': item.name },
            logo: { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id: logoAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )
    console.log('Creating Brands Wall section...')
    const brandsSection = await environment.createEntry('brandsWall', {
      fields: {
        title: { 'en-US': brandsData.title },
        items: { 'en-US': brandItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await brandsSection.publish()
    sectionEntries.push(brandsSection)
    console.log('Published Brands Wall section.')
  }
  
  // 5. Services Grid Section
  const servicesData = findSection('services')
  if (servicesData) {
    console.log('Creating Service items...')
    const serviceItems = await Promise.all(
      servicesData.items.map(async (item) => {
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('serviceItem', {
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
    console.log('Creating Services Grid section...')
    const servicesSection = await environment.createEntry('servicesGrid', {
      fields: {
        title: { 'en-US': servicesData.title },
        items: { 'en-US': serviceItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await servicesSection.publish()
    sectionEntries.push(servicesSection)
    console.log('Published Services Grid section.')
  }
  
  // 6. Coverage Section
  const coverageData = findSection('coverage')
  if (coverageData) {
    console.log('Creating Coverage section...')
    const coverageSection = await environment.createEntry('coverage', {
      fields: {
        title: { 'en-US': coverageData.title },
        regions: { 'en-US': coverageData.regions },
      },
    })
    await coverageSection.publish()
    sectionEntries.push(coverageSection)
    console.log('Published Coverage section.')
  }

  // 7. Why Us Section
  const whyUsData = findSection('whyus')
  if (whyUsData) {
    console.log('Creating Why Us section...')
    const whyUsSection = await environment.createEntry('whyUs', {
      fields: {
        title: { 'en-US': whyUsData.title },
        bullets: { 'en-US': whyUsData.bullets },
      },
    })
    await whyUsSection.publish()
    sectionEntries.push(whyUsSection)
    console.log('Published Why Us section.')
  }


  // Final Step: Create the Home Page
  console.log('Creating Home page entry...')
  const page = await environment.createEntry('page', {
    fields: {
      title: { 'en-US': homeData.title },
      slug: { 'en-US': homeData.slug },
      sections: {
        'en-US': sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Home page!')
}

run(importHome)
