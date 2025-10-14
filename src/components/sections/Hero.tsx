import type { HeroSection } from '@/types/view'
import Link from 'next/link'

export function Hero({ data }: { data: HeroSection }) {
  return (
    <section className="relative h-screen max-h-[900px] flex items-center justify-center text-center text-white overflow-hidden">
      <video
        src="/videos/bav-hero-video.MP4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 mx-auto max-w-4xl px-4 flex flex-col items-center justify-center">
        {data.eyebrow && (
          <p className="mb-3 text-sm font-medium tracking-wide text-sky-300/90">{data.eyebrow}</p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-none drop-shadow-lg">
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200 drop-shadow-md">
            {data.subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="
                inline-flex items-center justify-center rounded-md
                px-6 py-3 text-base font-medium
                text-white
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600
                transition-transform duration-200 motion-safe:hover:scale-105
                no-underline hover:no-underline
              "
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {data.ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
