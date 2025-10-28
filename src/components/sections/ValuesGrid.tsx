// src/components/sections/ValuesGrid.tsx
import type { ValuesSection } from '@/types/view'
import { FeatherIcon } from '@/components/common/FeatherIcon'

export function ValuesGrid({ data }: { data: ValuesSection }) {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {data.title}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="grid h-16 w-16 place-items-center rounded-full"
                style={{ backgroundColor: 'var(--color-primary-tint)', color: 'var(--color-primary)' }}
              >
                <FeatherIcon name={item.icon || 'star'} className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-2 text-neutral-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
