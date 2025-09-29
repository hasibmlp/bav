// src/components/sections/Coverage.tsx
import type { CoverageSection } from '@/types/view'

export function Coverage({ data }: { data: CoverageSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {data.title && (
          <header className="mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{data.title}</h2>
          </header>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.regions.map((region, i) => (
            <div
              key={i}
              className="
                flex items-center gap-4 rounded-xl border border-neutral-200/70 dark:border-neutral-800/70
                bg-white/70 dark:bg-neutral-900/40 p-4
              "
            >
              <div
                className="
                  h-10 w-10 rounded-lg grid place-items-center
                  ring-1 ring-neutral-200/70 dark:ring-neutral-800/70
                  bg-white/70 dark:bg-neutral-900/60
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neutral-500"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">{region}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
