import type { WhoWeAreSection } from '@/types/view'
import Image from 'next/image'

export function WhoWeAre({ data }: { data: WhoWeAreSection }) {
  return (
    <section className="py-28 md:py-36 relative">
      <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
        {data.headline && (
          <p className="mb-4 text-sm font-medium tracking-wide uppercase text-sky-500">
            {data.headline}
          </p>
        )}
        {data.subheadline && (
          <p className="mb-4 text-lg font-bold text-gray-900">
            {data.subheadline}
          </p>
        )}
      </div>
      {data.image?.src && (
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1/4 max-w-xs h-auto aspect-[3/4] z-0 hidden lg:block">
          <Image
            src={data.image.src}
            alt={data.image.alt || ''}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </section>
  )
}
