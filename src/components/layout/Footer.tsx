import Link from 'next/link'
import Image from 'next/image'

const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/brands', label: 'Brands' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
]

export function Footer() {
  return (
    <footer
      className="mt-24 border-t border-teal-700/20"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-24 text-white">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="sm:col-span-2">
            <Link href="/">
              <Image
                src="/images/bav-logo.png"
                alt="BAV Logo"
                width={120}
                height={48}
                className="filter brightness-0 invert"
              />
            </Link>
            <div className="mt-2">
              <p className="text-white text-sm">Let’s collaborate on your next AV project.</p>
            </div>
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-medium text-white">Navigation</h3>
            {footerNav.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} className="text-base text-white hover:opacity-80">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-2">
            <h3 className="text-lg font-medium text-white">Legal</h3>
            {footerNav.slice(5).map((item) => (
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
