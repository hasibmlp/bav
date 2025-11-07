'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/navigation'
import Image from 'next/image'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslations } from 'next-intl'
import type { NavigationLink, NavigationMenu } from '@/types/view'
import MobileNav from './MobileNav'

function HeaderNavLinks({ navLinks }: { navLinks: NavigationLink[] }) {
  const pathname = usePathname()

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`transition-colors hover:text-[var(--color-primary)] ${
            pathname === link.href ? 'text-[var(--color-primary)]' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  )
}

export function Header({ navigation }: { navigation: NavigationMenu }) {
  const t = useTranslations('Navigation')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={`
        fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white border-b border-neutral-200/80' : 'bg-transparent'}
      `}
        style={{ height: '80px' }}
      >
        <nav className="mx-auto max-w-7xl px-4 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/images/bav-logo.png"
                alt="BAV Logo"
                width={140}
                height={56}
                className="h-auto w-auto transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div
            className={`hidden lg:flex items-center gap-6 text-sm ${
              isScrolled ? 'text-neutral-800' : 'text-white'
            }`}
          >
            <HeaderNavLinks navLinks={navigation.items} />
            <LanguageSwitcher isScrolled={isScrolled} />
            <Link
              href="/contact"
              className={`
              rounded-md px-3.5 py-2 shadow-sm transition-colors duration-300 no-underline hover:no-underline
              ${
                isScrolled
                  ? 'text-white hover:opacity-90'
                  : 'text-white border border-white/50 hover:border-[var(--color-primary)]'
              }
            `}
              style={{ backgroundColor: isScrolled ? 'var(--color-primary)' : 'transparent' }}
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden ms-auto">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className={`p-2 rounded-md ${isScrolled ? 'text-neutral-800' : 'text-white'}`}
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer */}
      <MobileNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navLinks={navigation.items}
      />
    </>
  )
}
