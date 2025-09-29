// src/components/sections/BrandsGrid.tsx
import type { BrandsSection } from '@/types/view'
import { Section } from '@/components/common/Section'

export function BrandsGrid({ data }: { data: BrandsSection }) {
  return (
    <Section>
      {data.title && <h2 className="text-2xl font-semibold mb-6">{data.title}</h2>}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.items.map((b, i) => (
          <a key={i} href={b.url ?? '#'} className="rounded border p-6 text-center hover:shadow-sm">
            <div className="font-medium">{b.name}</div>
          </a>
        ))}
      </div>
    </Section>
  )
}
