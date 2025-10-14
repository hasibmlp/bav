import type { CoverageSection } from '@/types/view'
import Image from 'next/image'

export function Coverage({ data }: { data: CoverageSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            {data.title && (
              <header className="mb-4">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">
                  {data.title}
                </h2>
              </header>
            )}
            <p className="text-neutral-700">
              Headquartered in the UAE, we provide project-driven support and distribution across the
              entire GCC region.
            </p>
            <div className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {data.regions.map((region, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-sky-100 grid place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-sky-600"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="font-medium text-neutral-800">{region}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              And expanding to new countries.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src="/images/gcc-map.png"
              alt="Map of the GCC region"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
