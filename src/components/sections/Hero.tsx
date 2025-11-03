import type { HeroSection } from '@/types/view'
import Image from 'next/image'
import Link from 'next/link'

export function Hero({ data }: { data: HeroSection }) {
  const isVideo = data.image?.contentType?.startsWith('video')

  return (
    <section className="relative h-screen max-h-[900px] flex items-center justify-center text-center text-white overflow-hidden">
      {isVideo && data.image ? (
        <video
          src={data.image.src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      ) : (
        data.image && (
          <Image
            src={data.image.src}
            alt={data.image.alt || 'Hero background'}
            fill
            priority
            className="object-cover"
          />
        )
      )}
      <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
      <div className="relative z-20 mx-auto max-w-6xl px-4 flex flex-col items-center justify-center">
        {data.eyebrow && (  
          <p className="mb-3 text-sm font-medium tracking-wide text-sky-300/90">{data.eyebrow}</p>
        )}
        <h1
          className="font-bold leading-none drop-shadow-lg"
          style={{ fontSize: 'clamp(2.5rem, 1.5rem + 5vw, 5rem)' }}
        >
          {data.headline}
        </h1>
        {data.subheadline && (
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-200 drop-shadow-md">
            {data.subheadline}
          </p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {data.ctaLabel && data.ctaHref && (
            <>
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
              <Link
                href="/contact"
                className="
                inline-flex items-center justify-center rounded-md
                px-6 py-3 text-base font-medium
                text-white ring-1 ring-white/50 hover:bg-white/10
                transition-colors duration-200 no-underline hover:no-underline
              "
              >
                Contact Us
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
