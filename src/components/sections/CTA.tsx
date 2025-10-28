// src/components/sections/CTA.tsx
import type { CTASection } from '@/types/view'
import Link from 'next/link'

export function CTA({ data }: { data: CTASection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div
          className="
            relative isolate overflow-hidden rounded-2xl
            px-6 py-12 text-center
            bg-[radial-gradient(100%_200px_at_50%_-10%,rgba(14,165,233,.15),transparent_60%)]
            dark:bg-[radial-gradient(100%_200px_at_50%_-10%,rgba(14,165,233,.1),transparent_60%)]
            ring-1 ring-neutral-200/60 dark:ring-neutral-800/60
          "
        >
          <h2
            className="font-semibold tracking-tight text-neutral-900"
            style={{ fontSize: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)' }}
          >
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="mt-4 text-lg text-neutral-700">{data.subheadline}</p>
          )}

          {data.ctaLabel && data.ctaHref && (
            <div className="mt-6">
              <Link
                href={data.ctaHref}
                className="
                  inline-flex items-center justify-center rounded-md
                  px-5 py-3 text-base font-medium
                  text-white transition-colors hover:bg-sky-700
                "
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {data.ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
