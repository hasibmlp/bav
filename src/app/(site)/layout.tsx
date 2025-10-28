// src/app/(site)/layout.tsx
import '@/app/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Metadata } from 'next'
import { defaultMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
