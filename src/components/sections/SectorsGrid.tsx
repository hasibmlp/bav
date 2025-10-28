import type { SectorsGridSection } from '@/types/view'
import Image from 'next/image'

export function SectorsGrid({ data }: { data: SectorsGridSection }) {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-sm"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt || ''}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <div className="h-0 opacity-0 transition-all duration-300 group-hover:h-auto group-hover:opacity-100 group-hover:mt-2">
                  <p className="text-sm text-neutral-300">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
