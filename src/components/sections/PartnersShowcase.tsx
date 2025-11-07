import Image from 'next/image'
import type { PartnersShowcaseSection } from '@/types/view'
import { Link } from '@/navigation'

export function PartnersShowcase({ data }: { data: PartnersShowcaseSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <div className="absolute inset-0 bg-white">
                <Image
                  src={item.logo.src}
                  alt={item.logo.alt || ''}
                  fill
                  className="object-contain p-8"
                />
              </div>

              <div
                className="absolute inset-0 flex translate-y-full flex-col items-center justify-center p-6 text-center text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.9)' }}
              >
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="mt-2 text-sm">{item.description}</p>
                {item.url && item.ctaLabel && (
                  <Link
                    href={item.url}
                    className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 no-underline"
                  >
                    {item.ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
