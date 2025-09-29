// src/components/sections/ServicesGrid.tsx
import type { ServicesSection } from '@/types/view'

export function ServicesGrid({ data }: { data: ServicesSection }) {
  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {data.title && (
          <header className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{data.title}</h2>
            {/** Optional subtitle if you add one later */}
            {/* <p className="mt-2 text-neutral-600 dark:text-neutral-300">Short support line.</p> */}
          </header>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {data.items.map((it, i) => (
            <article
              key={i}
              className="
                group relative overflow-hidden rounded-xl border border-neutral-200/70 dark:border-neutral-800/70
                bg-white/70 dark:bg-neutral-900/40
                p-6 md:p-8
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:border-sky-500/30
                motion-safe:hover:-translate-y-1
              "
            >
              {/* Icon slot */}
              <div className="mb-3 h-10 w-10 rounded-lg grid place-items-center ring-1 ring-neutral-200/70 dark:ring-neutral-800/70 bg-white/70 dark:bg-neutral-900/60">
                <span aria-hidden className="text-neutral-400 dark:text-neutral-500 text-lg">
                  {it.icon ?? '◆'}
                </span>
              </div>

              <h3 className="text-lg/7 md:text-xl/8 font-semibold text-neutral-900 dark:text-neutral-50">
                {it.title}
              </h3>

              {it.description && (
                <p className="mt-2 text-base text-neutral-700 dark:text-neutral-300">
                  {it.description}
                </p>
              )}

              {/* Optional link/CTA per service in future */}
              {/* <a href={it.href ?? '#'} className="mt-3 inline-flex items-center gap-1 text-sm text-sky-700 dark:text-sky-300">
                Learn more →
              </a> */}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
