// src/components/layout/Header.tsx
import Link from 'next/link'

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-white">
            BAV
          </Link>
        </div>
        <div className="flex items-center gap-6 text-sm text-white">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link
            href="/contact"
            className="rounded-md bg-sky-600 px-3.5 py-2 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  )
}
