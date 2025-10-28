import type { ServicesSection } from '@/types/view'
import { ReactElement } from 'react'
import Image from 'next/image'

const icons: Record<string, ReactElement> = {
  'AV System Design & Consulting': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
  ),
  'Integration & Installation Support': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
  ),
  'Logistics & Supply Chain': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  'After-Sales & Technical Support': (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
  ),
}

export function ServicesGridPage({ data }: { data: ServicesSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 relative">
        {/* The connecting line */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-neutral-200 hidden lg:block"
        />
        <div className="space-y-24">
          {data.items.map((item, i) => (
            <div key={i} className="relative">
              <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
                {/* Left Column: Content */}
                <div
                  className={`flex flex-col items-start lg:items-end ${
                    i % 2 !== 0 ? 'lg:order-last' : ''
                  }`}
                >
                  <div className="lg:max-w-md w-full">
                    <div
                      className="flex items-center gap-4"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <span className="text-4xl font-bold">0{i + 1}</span>
                      <div className="w-10 h-10">{icons[item.title]}</div>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-neutral-900 lg:text-right">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-4 text-lg text-neutral-700 lg:text-right">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column: Image */}
                <div className="flex flex-col items-start">
                  {item.image && (
                    <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt || ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
