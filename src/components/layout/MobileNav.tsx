'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
]

export default function MobileNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      <div className="flex h-full flex-col p-8">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/bav-logo.png"
              alt="BAV Logo"
              width={140}
              height={56}
              className="h-auto w-auto"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-white"
            aria-label="Close menu"
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
              className="h-6 w-6"
            >
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-12 flex flex-1 flex-col justify-between">
          <ul className="flex flex-col gap-6 text-2xl font-medium text-white">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="no-underline hover:no-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/20 pt-8 mt-8">
            <div className="flex items-center justify-between">
              <LanguageSwitcher isScrolled={false} />
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-white/10 px-4 py-2.5 text-base font-medium text-white no-underline hover:no-underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
