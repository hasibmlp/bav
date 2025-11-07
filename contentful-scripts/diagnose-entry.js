require('dotenv').config({ path: '.env' })
const contentful = require('contentful-management')

async function diagnoseEntry() {
  const SPACE_ID = "1b9v9pyyxotl"
  const MANAGEMENT_TOKEN = "WCXnOdTIWiUMu8-WQE7kXFcbIbvhywYC_ADjQ5QSHBc"
  const ENVIRONMENT_ID = 'master'

  if (!SPACE_ID || !MANAGEMENT_TOKEN) {
    console.error('Missing Contentful credentials in .env.local')
    process.exit(1)
  }

  try {
    const client = contentful.createClient({ accessToken: MANAGEMENT_TOKEN })
    const space = await client.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log("Fetching all 'page' entries to find 'home'...")
    const entries = await environment.getEntries({
      content_type: 'page',
    })

    // Find the home entry by looking through all pages
    const homeEntry = entries.items.find(
      (entry) => entry.fields.slug?.['en-US'] === 'home'
    )

    if (!homeEntry) {
      console.error(
        "❌ Error: Could not find a page entry where the 'en-US' slug is 'home'."
      )
      console.log(
        'Please check your Page entries in Contentful to ensure one has the slug "home" for the English (USA) locale.'
      )
      return
    }

    console.log('\n--- Found Home Page Entry ---')
    console.log(`Entry ID: ${homeEntry.sys.id}`)
    console.log(
      'Available locales for the slug field:',
      Object.keys(homeEntry.fields.slug || {})
    )
    console.log(
      "Value of slug for 'en-US':",
      homeEntry.fields.slug?.['en-US']
    )
    console.log("Value of slug for 'en':", homeEntry.fields.slug?.['en'])
    console.log('--- End of Entry ---')

    if (!homeEntry.fields.slug?.['en']) {
      console.log(
        '\n❗️ACTION REQUIRED: The `en` locale does not have a slug value. You must go to your "Home" page entry in Contentful, set the slug to "home" for the `en` locale, and then publish the entry.'
      )
    } else if (homeEntry.fields.slug['en'] !== 'home') {
      console.log(
        `\n❗️ACTION REQUIRED: The slug for the 'en' locale is "${homeEntry.fields.slug['en']}", not "home". Please correct it and publish the entry.`
      )
    } else {
      console.log(
        '\n✅ The `en` locale has the correct slug ("home"). Please ensure the entire "Home" page entry is published in Contentful for the `en` locale to resolve the 404 error.'
      )
    }
  } catch (error) {
    console.error('❌ An error occurred:', error)
    process.exit(1)
  }
}

diagnoseEntry()
