import type { HeroSection } from '@/types/view'
import Link from 'next/link'
import Image from 'next/image'

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center text-white">
      {data.image?.src && (
        <Image
          src={data.image.src}
          alt={data.image.alt || 'Background'}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
      )}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 mx-auto max-w-4xl px-4 flex flex-col items-center justify-center">
        {data.eyebrow && (
          <p className="mb-3 text-sm font-medium tracking-wide text-sky-300/80">{data.eyebrow}</p>
        )}
        <h1 className="text-3xl/tight sm:text-4xl/tight lg:text-6xl/tight font-semibold">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-300">{data.subheadline}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="
                inline-flex items-center justify-center rounded-md
                px-6 py-3 text-base font-medium
                text-white bg-sky-600 hover:bg-sky-700
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600
                transition-transform duration-200 motion-safe:hover:scale-105
              "
            >
              {data.ctaLabel}
            </Link>
          )}
          <Link
            href="#services"
            className="
              inline-flex items-center justify-center rounded-md
              px-6 py-3 text-base font-medium
              text-white ring-2 ring-white hover:bg-white hover:text-black
              transition-colors duration-200
            "
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  )
}
