import Link from 'next/link'

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
    <footer className="mt-24 border-t border-neutral-200/70 dark:border-neutral-800/70">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              BAV
            </Link>
            <div className="mt-2">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                Let’s collaborate on your next AV project.
              </p>
              <Link
                href="/contact"
                className="
                  inline-flex items-center justify-center rounded-md
                  mt-3 px-4 py-2 text-sm font-medium
                  text-white bg-sky-600 hover:bg-sky-700
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600
                "
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="grid gap-1">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Navigation</h3>
            {footerNav.slice(0, 5).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="grid gap-1">
            <h3 className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Legal</h3>
            {footerNav.slice(5).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-200/70 dark:border-neutral-800/70 pt-10 flex flex-col sm:flex-row items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <p>&copy; {new Date().getFullYear()} BAV. All rights reserved.</p>
          {/* Social links can go here */}
        </div>
      </div>
    </footer>
  )
}
