require('dotenv').config({ path: '.env' })
const contentfulManagement = require('contentful-management')
const contentfulDelivery = require('contentful')

async function diagnose() {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
  const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN
  const ENVIRONMENT_ID = 'master'

  console.log(`--- Starting Diagnosis for Space ID: ${SPACE_ID} ---\n`)

  if (!SPACE_ID || !MANAGEMENT_TOKEN || !ACCESS_TOKEN) {
    console.error('❌ Error: Make sure CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, and CONTENTFUL_ACCESS_TOKEN are all set in your .env.local file.')
    process.exit(1)
  }

  // --- Step 1: Check locales with Management API ---
  try {
    console.log('1. Checking locales using the Management API...')
    const managementClient = contentfulManagement.createClient({ accessToken: MANAGEMENT_TOKEN })
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)
    const locales = await environment.getLocales()
    const localeCodes = locales.items.map(locale => locale.code)
    
    console.log(`✅ Success: Found the following locales: [${localeCodes.join(', ')}]`)
    if (!localeCodes.includes('en')) {
        console.log('❗️ CRITICAL: The "en" locale does not exist in this space. The "update-locales.js" script may have failed or was run against a different space.')
    }
     if (!localeCodes.includes('ar')) {
        console.log('❗️ WARNING: The "ar" locale does not exist. The "update-locales.js" script may have failed.')
    }
  } catch (error) {
    console.error('❌ Failed: Could not check locales using the Management API.')
    console.error(`   Is your MANAGEMENT_TOKEN correct for space "${SPACE_ID}"?`)
    console.error('   Error Details:', error.message)
    process.exit(1)
  }

  console.log('\n---------------------------------------------------\n')

  // --- Step 2: Check for 'home' page with Delivery API ---
  try {
    console.log('2. Attempting to fetch "home" page with locale "en" using the Delivery API...')
    const deliveryClient = contentfulDelivery.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    })
    const response = await deliveryClient.getEntries({
      content_type: 'page',
      'fields.slug': 'home',
      locale: 'en',
    })

    if (response.items.length > 0) {
      console.log('✅ Success: The "home" page was found for the "en" locale!')
      console.log('\n--- Diagnosis Complete: Everything looks correct! ---')
      console.log('If the app still fails, the problem might be with how Next.js is loading environment variables or a caching issue. Try deleting the ".next" folder.')
    } else {
      console.log('❗️ CRITICAL: The Delivery API connected successfully, but could not find a "page" entry with slug "home" for the "en" locale.')
      console.log('   This means the import scripts may have failed or you are looking at an empty space.')
    }
  } catch (error) {
    console.error('❌ Failed: Could not fetch the "home" page using the Delivery API.')
    console.error(`   Is your ACCESS_TOKEN (the delivery token) correct for space "${SPACE_ID}"?`)
    if (error.message.includes('Unknown locale')) {
        console.error('   ❗️ CRITICAL: The error is "Unknown locale". This confirms the Delivery API is pointing to a space where the "en" locale does not exist.')
    }
    console.error('   Error Details:', error.message)
  }
}

diagnose()
