'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FooterCTA } from './FooterCTA'
import { useDirection } from '@/context/DirectionProvider'

const mainNav = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/services', label: 'Services' },
  { href: '/sectors', label: 'Sectors' },
]

const companyNav = [
  { href: '/partners', label: 'Partners' },
  { href: '/about', label: 'About BAV' },
  { href: '/contact', label: 'Contact Us' },
]

export function Footer() {
  const { direction } = useDirection()
  return (
    <footer
      className="mt-24 border-t border-neutral-200/70"
      style={{ backgroundColor: 'var(--color-primary)' }}
      dir={direction}
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
              <p className="text-white text-sm">Let’s collaborate on your next AV project.</p>
            </div>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-medium text-white">Navigation</h3>
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-medium text-white">Company</h3>
            {companyNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-20 border-t border-white/20 pt-16 flex flex-col sm:flex-row items-center justify-between text-sm text-white">
          <p>&copy; {new Date().getFullYear()} BAV. All rights reserved.</p>
          {/* Social links can go here */}
        </div>
      </div>
    </footer>
  )
}
