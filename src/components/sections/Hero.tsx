import type { HeroSection } from '@/types/view'
import Image from 'next/image'
import { Link } from '@/navigation' // Using next-intl Link to preserve locale

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
        <div className="mt-8 flex items-center justify-center gap-x-6">
          {data.ctaLabel && data.ctaHref && (
            <Link
              href={data.ctaHref}
              className="rounded-md bg-white px-5 py-3 text-base font-semibold text-neutral-800 shadow-sm hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white no-underline"
            >
              {data.ctaLabel}
            </Link>
          )}
          {data.secondaryCtaLabel && data.secondaryCtaHref && (
            <Link
              href={data.secondaryCtaHref}
              className="
                  group inline-flex items-center gap-2 font-semibold border-2 px-5 py-2.5 rounded-md
                  transition-colors no-underline text-base
                  text-white border-white
                  hover:bg-white hover:text-[var(--color-primary)]
                "
            >
              {data.secondaryCtaLabel}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
