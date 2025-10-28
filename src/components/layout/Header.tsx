'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDirection } from '@/context/DirectionProvider'
import MobileNav from '@/components/layout/MobileNav'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const langMenuRef = useRef<HTMLDivElement>(null)
  const { locale, setLocale } = useDirection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Effect to handle body scroll lock and escape key for drawer
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsDrawerOpen(false)
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isDrawerOpen])

  // Effect to handle outside click for language menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangMenuOpen])

  const navLinks = [
    { href: '/solutions', label: 'Solutions' },
    { href: '/services', label: 'Services' },
    { href: '/sectors', label: 'Sectors' },
    { href: '/partners', label: 'Partners' },
    { href: '/about', label: 'About BeAV' },
  ]

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
          <div className="flex items-center gap-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                {link.label}
              </Link>
            ))}
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
              Contact Us
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
      <div className="lg:hidden">
        <div
          className={`
          fixed inset-0 z-50 transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        >
          <div className="fixed inset-0 bg-white" />
          <div className="relative h-full w-full bg-white text-neutral-800">
            <div className="p-4 flex items-center justify-between border-b">
              <Link href="/" onClick={() => setIsDrawerOpen(false)}>
                <Image src="/images/bav-logo.png" alt="BAV Logo" width={100} height={40} />
              </Link>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 rounded-md"
                aria-label="Close navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="p-8 flex flex-col gap-8 text-2xl font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsDrawerOpen(false)}
                  className="hover:text-[var(--color-primary)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher isScrolled={false} />
              <Link
                href="/contact"
                onClick={() => setIsDrawerOpen(false)}
                className="hover:text-[var(--color-primary)] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
