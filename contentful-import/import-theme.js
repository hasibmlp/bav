require('dotenv').config({ path: '.env.local' })
const contentful = require('contentful-management')

const contentfulManagementClient = contentful.createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
})

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || 'master'

async function importThemeSettings() {
  try {
    const space = await contentfulManagementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log('Importing Theme Settings data...')

    // Load mock data
    const themeData = require('../src/lib/content/mocks/theme.json')
    const themeDataAr = require('../src/lib/content/mocks/theme.ar.json')

    // Combine English hrefs with Arabic labels
    const localizedNav = {
      items: themeData.navigation.items.map((item, index) => ({
        ...item,
        label: themeDataAr.navigation.items[index].label,
      })),
    }

    // Create the Theme Settings entry
    console.log('Creating Theme Settings entry...')
    const settings = await environment.createEntry('themeSettings', {
      fields: {
        internalTitle: { en: themeData.internalTitle },
        primaryColor: { en: themeData.primaryColor },
        primaryColorRgb: { en: themeData.primaryColorRgb },
        primaryColorTint: { en: themeData.primaryColorTint },
        secondaryColor: { en: themeData.secondaryColor },
        darkColor: { en: themeData.darkColor },
        lightBgColor: { en: themeData.lightBgColor },
        footerBackgroundColor: { en: themeData.footerBackgroundColor },
        navigation: {
          en: themeData.navigation,
          ar: localizedNav,
        },
      },
    })
    await settings.publish()
    console.log('Successfully published the Theme Settings!')
  } catch (error) {
    console.error('Error importing theme settings:', error)
  }
}

importThemeSettings()
