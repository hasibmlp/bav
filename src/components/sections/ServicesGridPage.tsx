import type { ServicesSection } from '@/types/view'
import Image from 'next/image'

export function ServicesGridPage({ data }: { data: ServicesSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-16">
          {data.items.map((item, i) => (
            <article
              key={i}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12"
            >
              {item.image && (
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl ${
                    i % 2 !== 0 ? 'lg:order-last' : ''
                  }`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || ''}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-neutral-900">{item.title}</h3>
                {item.description && (
                  <p className="mt-4 text-lg text-neutral-700">{item.description}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
