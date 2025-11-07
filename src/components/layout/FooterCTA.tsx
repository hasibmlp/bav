'use client'

import { Link } from '@/navigation' // Using next-intl Link to preserve locale
import { useTranslations } from 'next-intl'

export function FooterCTA() {
  const t = useTranslations('FooterCTA')
  return (
    <div className="py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">{t('title')}</h2>
      <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{t('description')}</p>
      <div className="mt-8">
        <Link
          href="/contact"
          className="
            inline-flex items-center justify-center rounded-md
            px-6 py-3 text-base font-medium
            text-[var(--color-footer-bg)] bg-white hover:bg-neutral-200
            transition-colors no-underline
          "
        >
          {t('button')}
        </Link>
      </div>
    </div>
  )
}
