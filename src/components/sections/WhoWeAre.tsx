import type { WhoWeAreSection } from '@/types/view'

export function WhoWeAre({ data }: { data: WhoWeAreSection }) {
  return (
    <section className="py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {data.headline && (
          <p className="mb-4 text-sm font-medium tracking-wide uppercase text-sky-500">
            {data.headline}
          </p>
        )}
        {data.subheadline && (
          <p className="text-4xl md:text-5xl font-bold uppercase leading-snug text-black">
            {data.subheadline}
          </p>
        )}
      </div>
    </section>
  )
}

