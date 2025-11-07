require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')

async function updateLocales() {
  const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
  const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN
  const ENVIRONMENT_ID = 'master'

  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error(
      '❌ Error: CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN must be provided in .env.local'
    )
    process.exit(1)
  }

  try {
    const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)
    const locales = await environment.getLocales()

    // 1. Find and update the default 'en-US' locale to 'en'
    const defaultLocale = locales.items.find((locale) => locale.code === 'en-US')
    if (defaultLocale) {
      console.log("Found 'en-US' locale. Updating code to 'en'...")
      defaultLocale.code = 'en'
      await defaultLocale.update()
      console.log("✅ Successfully updated 'en-US' to 'en'.")
    } else {
      console.log("✅ 'en-US' locale not found. Assuming it's already 'en'.")
    }

    // 2. Check for 'ar' locale and create it if it doesn't exist
    const arabicLocale = locales.items.find((locale) => locale.code === 'ar')
    if (!arabicLocale) {
      console.log("'ar' locale not found. Creating it...")
      await environment.createLocale({
        name: 'Arabic',
        code: 'ar',
      })
      console.log("✅ Successfully created 'ar' locale.")
    } else {
      console.log("✅ 'ar' locale already exists.")
    }

    console.log('\nLocale setup complete.')
  } catch (error) {
    console.error('❌ An error occurred during the locale update process:')
    console.error(error)
    process.exit(1)
  }
}

updateLocales()
