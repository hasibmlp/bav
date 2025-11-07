'use client'

import { Link } from '@/navigation'
import Image from 'next/image'
import { FooterCTA } from './FooterCTA'
import { useTranslations } from 'next-intl'
import type { NavigationMenu } from '@/types/view'

export function Footer({ navigation }: { navigation: NavigationMenu }) {
  const t = useTranslations('Footer')
  const navLinks = navigation.items

  const half = Math.ceil(navLinks.length / 2)
  const firstHalf = navLinks.slice(0, half)
  const secondHalf = navLinks.slice(half)

  return (
    <footer
      className="mt-24 border-t border-neutral-200/70"
      style={{ backgroundColor: 'var(--color-footer-bg, var(--color-primary))' }}
    >
      <FooterCTA />
      <hr className="border-t border-white/10 max-w-7xl mx-auto" />
      <div className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="sm:col-span-2">
            <Link href="/">
              <Image
                src="/images/bav-logo.png"
                alt="BAV Logo"
                width={140}
                height={56}
                className="filter brightness-0 invert h-auto w-auto"
              />
            </Link>
            <div className="mt-2">
              <p className="text-white text-sm">{t('tagline')}</p>
            </div>
          </div>
          <div className="grid gap-2">
            {firstHalf.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-2">
            {secondHalf.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-20 border-t border-white/20 pt-16 flex flex-col sm:flex-row items-center justify-between text-sm text-white">
          <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
