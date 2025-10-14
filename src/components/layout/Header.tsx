'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${isScrolled ? 'bg-white border-b border-neutral-200/80' : 'bg-transparent'}
      `}
    >
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/images/bav-logo.png"
              alt="BAV Logo"
              width={120}
              height={48}
              className={`
                transition-all duration-300
                ${isScrolled ? 'filter brightness-0' : ''}
              `}
            />
          </Link>
        </div>
        <div className={`flex items-center gap-6 text-sm ${isScrolled ? 'text-neutral-800' : 'text-white'}`}>
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link
            href="/contact"
            className={`
              rounded-md px-3.5 py-2 shadow-sm transition-colors duration-300 no-underline hover:no-underline
              ${
                isScrolled
                  ? 'text-white hover:opacity-90'
                  : 'text-white hover:bg-white/10 border border-white/50'
              }
            `}
            style={{ backgroundColor: isScrolled ? 'var(--color-primary)' : 'transparent' }}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  )
}
