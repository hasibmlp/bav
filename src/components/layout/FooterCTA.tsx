import Link from 'next/link'

export function FooterCTA() {
  return (
    <div className="py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Start Your Project?</h2>
      <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
        We're ready to bring our expertise to your next challenge. Reach out to discuss your
        project needs.
      </p>
      <div className="mt-8">
        <Link
          href="/contact"
          className="
            inline-flex items-center justify-center rounded-md
            px-6 py-3 text-base font-medium
            text-[var(--color-primary)] bg-white hover:bg-neutral-200
            transition-colors no-underline
          "
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
