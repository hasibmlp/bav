import type { BrandsSection } from '@/types/view'
import Brands from '@/components/Brands' // client component

// Server component wrapper — no "use client" here.
export function BrandsWall({ data }: { data: BrandsSection }) {
  if (!data?.items?.length) return null
  return (
    <section
      className="
        py-12 md:py-16
        bg-white/60 dark:bg-neutral-950/40
      "
      aria-label="Partner brands"
    >
      <div className="mx-auto">
        {/* No title by request — pure logo wall */}
        <Brands items={data.items} />
      </div>
    </section>
  )
}
