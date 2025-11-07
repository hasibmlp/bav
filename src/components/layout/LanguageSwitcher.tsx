'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export function LanguageSwitcher({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = useLocale() as 'en' | 'ar'
  const t = useTranslations('LanguageSwitcher')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function switchTo(locale: 'en' | 'ar') {
    const query = Object.fromEntries(searchParams)
    router.replace({ pathname, query }, { locale })
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 transition-colors ${
          isScrolled ? 'text-neutral-800' : 'text-white'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <p
          className={`font-medium transition-colors ${
            isScrolled ? 'text-neutral-800' : 'text-white'
          }`}
        >
          {currentLocale === 'en' ? t('english') : t('arabic')}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-32 rounded-md shadow-lg ${
            isScrolled ? 'bg-white' : 'bg-neutral-800'
          }`}
        >
          <div className="py-1">
            <button
              onClick={() => switchTo('en')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-neutral-700'
              }`}
            >
              {t('english')}
            </button>
            <button
              onClick={() => switchTo('ar')}
              className={`block w-full px-4 py-2 text-left text-sm ${
                isScrolled ? 'text-neutral-700 hover:bg-neutral-100' : 'text-white hover:bg-neutral-700'
              }`}
            >
              {t('arabic')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
