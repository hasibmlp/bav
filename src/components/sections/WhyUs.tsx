// src/components/sections/WhyUs.tsx
import type { WhyUsSection } from '@/types/view'

export function WhyUs({ data }: { data: WhyUsSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            {data.title && (
              <header className="mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{data.title}</h2>
              </header>
            )}
            <p className="text-neutral-600 dark:text-neutral-300">
              We provide more than just products; we deliver performance, reliability, and a partnership
              built on deep technical expertise.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {data.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-sky-100 dark:bg-sky-900/40 grid place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sky-600 dark:text-sky-400"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-neutral-800 dark:text-neutral-200">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
