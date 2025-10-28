'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Direction = 'ltr' | 'rtl'
export type Locale = 'en' | 'ar'

interface DirectionContextType {
  direction: Direction
  locale: Locale
  setLocale: (locale: Locale) => void
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined)

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.dir = direction
    document.documentElement.lang = locale
  }, [direction, locale])

  return (
    <DirectionContext.Provider value={{ direction, locale, setLocale }}>
      {children}
    </DirectionContext.Provider>
  )
}

export function useDirection() {
  const context = useContext(DirectionContext)
  if (context === undefined) {
    throw new Error('useDirection must be used within a DirectionProvider')
  }
  return context
}
