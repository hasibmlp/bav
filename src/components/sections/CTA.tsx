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
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="mt-2 text-neutral-700 dark:text-neutral-300">{data.subheadline}</p>
          )}

          {data.ctaLabel && data.ctaHref && (
            <div className="mt-6">
              <Link
                href={data.ctaHref}
                className="
                  inline-flex items-center justify-center rounded-md
                  px-4 py-2.5 text-sm font-medium
                  text-white bg-sky-600 hover:bg-sky-700
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600
                  dark:focus-visible:ring-offset-neutral-900
                  transition-[background-color,transform] duration-200
                  motion-safe:active:scale-[.98]
                "
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
