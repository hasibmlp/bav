require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')
const homeData = require('../src/lib/content/mocks/home.json')
const homeDataAr = require('../src/lib/content/mocks/home.ar.json')
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
  const findSection = (type, locale) =>
    (locale === 'ar' ? homeDataAr : homeData).sections.find((s) => s.type === type)

  // 1. Hero Section
  const heroData = findSection('hero', 'en')
  const heroDataAr = findSection('hero', 'ar')
  if (heroData) {
    console.log('Creating Hero section...')
    
    const assetSource = heroData.video || heroData.image
    if (!assetSource) {
      throw new Error('Hero section must have either a video or an image.')
    }

    const heroAsset = await asset.create(environment, { src: assetSource.src, alt: 'Hero background' })
    const heroSection = await environment.createEntry('hero', {
      fields: {
        headline: { en: heroData.headline, ar: heroDataAr.headline },
        subheadline: { en: heroData.subheadline, ar: heroDataAr.subheadline },
        eyebrow: { en: heroData.eyebrow, ar: heroDataAr.eyebrow },
        ctaLabel: { en: heroData.ctaLabel, ar: heroDataAr.ctaLabel },
        ctaHref: { en: heroData.ctaHref },
        secondaryCtaLabel: { en: heroData.secondaryCtaLabel, ar: heroDataAr.secondaryCtaLabel },
        secondaryCtaHref: { en: heroData.secondaryCtaHref },
        image: { en: { sys: { type: 'Link', linkType: 'Asset', id: heroAsset.sys.id } } },
      },
    })
    await heroSection.publish()
    sectionEntries.push(heroSection)
    console.log('Published Hero section.')
  }

  // 2. Who We Are Section
  const whoData = findSection('who_we_are', 'en')
  const whoDataAr = findSection('who_we_are', 'ar')
  if (whoData) {
    console.log('Creating Who We Are section...')
    // Correct the image path to use an existing decorative image
    const whoImage = await asset.create(environment, { src: '/images/bnc-who-1.jpeg', alt: 'Decorative image for Who We Are section' })
    const whoSection = await environment.createEntry('whoWeAre', {
      fields: {
        headline: { en: whoData.headline, ar: whoDataAr.headline },
        subheadline: { en: whoData.subheadline, ar: whoDataAr.subheadline },
        image: { en: { sys: { type: 'Link', linkType: 'Asset', id: whoImage.sys.id } } },
      },
    })
    await whoSection.publish()
    sectionEntries.push(whoSection)
    console.log('Published Who We Are section.')
  }

  // 3. Solutions Section
  const solutionsData = findSection('solutions', 'en')
  const solutionsDataAr = findSection('solutions', 'ar')
  if (solutionsData) {
    console.log('Creating Solution items...')
    const solutionItems = await Promise.all(
      solutionsData.items.map(async (item, i) => {
        const itemAr = solutionsDataAr.items[i]
        const imageAsset = await asset.create(environment, item.image)
        const entry = await environment.createEntry('solutionItem', {
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
    console.log('Creating Solutions section...')
    const solutionsSection = await environment.createEntry('solutions', {
      fields: {
        title: { en: solutionsData.title, ar: solutionsDataAr.title },
        description: { en: solutionsData.description, ar: solutionsDataAr.description },
        items: { en: solutionItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await solutionsSection.publish()
    sectionEntries.push(solutionsSection)
    console.log('Published Solutions section.')
  }

  // 4. Brands Wall Section
  const brandsData = findSection('brands', 'en')
  const brandsDataAr = findSection('brands', 'ar')
  if (brandsData) {
    console.log('Creating Brand items...')
    const brandItems = await Promise.all(
      brandsData.items.map(async (item, i) => {
        const itemAr = brandsDataAr.items[i]
        const logoAsset = await asset.create(environment, item.logo)
        const entry = await environment.createEntry('brandItem', {
          fields: {
            name: { en: item.name, ar: itemAr.name },
            logo: { en: { sys: { type: 'Link', linkType: 'Asset', id: logoAsset.sys.id } } },
          },
        })
        await entry.publish()
        return entry
      })
    )
    console.log('Creating Brands Wall section...')
    const brandsSection = await environment.createEntry('brandsWall', {
      fields: {
        title: { en: brandsData.title, ar: brandsDataAr.title },
        items: { en: brandItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await brandsSection.publish()
    sectionEntries.push(brandsSection)
    console.log('Published Brands Wall section.')
  }
  
  // 5. Services Grid Section
  const servicesData = findSection('services', 'en')
  const servicesDataAr = findSection('services', 'ar')
  if (servicesData) {
    console.log('Creating Service items...')
    const serviceItems = await Promise.all(
      servicesData.items.map(async (item, i) => {
        const itemAr = servicesDataAr.items[i]
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
    console.log('Creating Services Grid section...')
    const servicesSection = await environment.createEntry('servicesGrid', {
      fields: {
        title: { en: servicesData.title, ar: servicesDataAr.title },
        items: { en: serviceItems.map((item) => ({ sys: { type: 'Link', linkType: 'Entry', id: item.sys.id } })) },
      },
    })
    await servicesSection.publish()
    sectionEntries.push(servicesSection)
    console.log('Published Services Grid section.')
  }
  
  // 6. Coverage Section
  const coverageData = findSection('coverage', 'en')
  const coverageDataAr = findSection('coverage', 'ar')
  if (coverageData) {
    console.log('Creating Coverage section...')
    const coverageSection = await environment.createEntry('coverage', {
      fields: {
        title: { en: coverageData.title, ar: coverageDataAr.title },
        subtitle: { en: coverageData.subtitle, ar: coverageDataAr.subtitle },
        regions: { en: coverageData.regions, ar: coverageDataAr.regions },
      },
    })
    await coverageSection.publish()
    sectionEntries.push(coverageSection)
    console.log('Published Coverage section.')
  }

  // 7. Why Us Section
  const whyUsData = findSection('whyus', 'en')
  const whyUsDataAr = findSection('whyus', 'ar')
  if (whyUsData) {
    console.log('Creating Why Us section...')
    const whyUsSection = await environment.createEntry('whyUs', {
      fields: {
        title: { en: whyUsData.title, ar: whyUsDataAr.title },
        description: {
          en: 'We provide more than just products; we deliver performance, reliability, and a partnership built on deep technical expertise.',
          ar: 'نحن نقدم أكثر من مجرد منتجات؛ نحن نقدم الأداء والموثوقية وشراكة مبنية على خبرة فنية عميقة.',
        },
        bullets: { en: whyUsData.bullets, ar: whyUsDataAr.bullets },
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
      title: { en: homeData.title, ar: homeDataAr.title },
      slug: { en: homeData.slug, ar: homeDataAr.slug },
      sections: {
        en: sectionEntries.map((entry) => ({ sys: { type: 'Link', linkType: 'Entry', id: entry.sys.id } })),
      },
    },
  })
  await page.publish()
  console.log('Successfully published the Home page!')
}

run(importHome)
