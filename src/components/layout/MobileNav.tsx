'use client'

import { Link, usePathname } from '@/navigation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import type { NavigationLink } from '@/types/view'
import Image from 'next/image'

export default function MobileNav({
  isOpen,
  onClose,
  navLinks,
}: {
  isOpen: boolean
  onClose: () => void
  navLinks: NavigationLink[]
}) {
  const t = useTranslations('Navigation')
  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  return (
    <div
      className={`
        fixed inset-0 z-50 transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="fixed inset-0 bg-white" />
      <div className="relative h-full w-full bg-white text-neutral-800">
        <div className="p-4 flex items-center justify-between border-b">
          <Link href="/" onClick={onClose}>
            <Image src="/images/bav-logo.png" alt="BAV Logo" width={100} height={40} />
          </Link>
          <button onClick={onClose} className="p-2 rounded-md" aria-label="Close navigation menu">
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
              onClick={onClose}
              className={`transition-colors hover:text-[var(--color-primary)] ${
                pathname === link.href ? 'text-[var(--color-primary)]' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={onClose}
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {t('contact')}
          </Link>
          <div className="mt-20">
            <LanguageSwitcher isScrolled={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
