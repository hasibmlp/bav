import type { PartnersShowcaseSection } from '@/types/view'
import Image from 'next/image'

export function PartnersShowcase({ data }: { data: PartnersShowcaseSection }) {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-4xl px-4">
        <div className="space-y-24 lg:space-y-32">
          {data.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              {/* Logo */}
              <div className="relative h-16 w-48 mb-6">
                <Image
                  src={item.logo.src}
                  alt={item.logo.alt || ''}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Name & Description */}
              <p className="mt-4 max-w-2xl text-lg text-neutral-700">{item.description}</p>

              {/* Details Grid */}
              <div className="mt-10 grid w-full grid-cols-1 gap-8 text-left md:grid-cols-2">
                {/* Key Features */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-neutral-500">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {item.features.map((feature, j) => (
                      <li key={j} className="flex items-start">
                        <svg
                          className="w-5 h-5 mr-3 mt-1 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: 'var(--color-secondary)' }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why They Fit */}
                <div
                  className="rounded-lg border-b-4 p-6"
                  style={{ borderColor: 'var(--color-primary)' }}
                >
                  <h3
                    className="text-sm font-semibold tracking-wide uppercase"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Why They Fit
                  </h3>
                  <p className="mt-2 text-neutral-700">{item.fit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
