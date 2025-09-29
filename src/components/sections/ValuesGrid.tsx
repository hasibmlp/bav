// src/components/sections/ValuesGrid.tsx
import type { ValuesSection } from '@/types/view'

const icons: Record<string, JSX.Element> = {
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  cpu: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  users: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  lightbulb: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 3.03 1.09 5.4 3 6.92V20h8v-4.08A6.98 6.98 0 0 0 19 9a7 7 0 0 0-7-7z" />
    </svg>
  ),
  gem: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="M10 22l-4-13" />
      <path d="M14 22l4-13" />
    </svg>
  ),
}

export function ValuesGrid({ data }: { data: ValuesSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {data.title && (
          <header className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{data.title}</h2>
          </header>
        )}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="
                rounded-xl border border-neutral-200/70 dark:border-neutral-800/70
                bg-white/70 dark:bg-neutral-900/40 p-6 md:p-8
              "
            >
              {item.icon && (
                <div className="mb-4 h-12 w-12 rounded-lg grid place-items-center bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400">
                  {icons[item.icon]}
                </div>
              )}
              <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-2 text-base text-neutral-700 dark:text-neutral-300">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
