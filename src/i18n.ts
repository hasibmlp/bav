import { getRequestConfig } from 'next-intl/server'
import { locales, Locale } from './navigation'

// Type guard to check if a string is a valid locale
function isValidLocale(locale: any): locale is Locale {
  return locales.includes(locale)
}

export default getRequestConfig(async ({ locale }) => {
  // Avoid throwing in root layout; fallback to 'en' if invalid
  const safeLocale: Locale = isValidLocale(locale) ? locale : 'en'

  return {
    locale: safeLocale,
    messages: (await import(`./locales/${safeLocale}.json`)).default,
  }
})
