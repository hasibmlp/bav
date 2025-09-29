'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

type BrandItem = {
  name: string
  url?: string
  logo?: { src: string; alt?: string; width?: number; height?: number }
}

export default function Brands({ items }: { items: BrandItem[] }) {
  // Filter to items with at least a name or logo
  const list = (items ?? []).filter(Boolean)

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, A11y]}
        aria-label="Brand logo carousel"
        loop
        // Continuous marquee-like motion
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={3000}
        allowTouchMove
        slidesPerView={3}
        spaceBetween={16}
        breakpoints={{
          480: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 5, spaceBetween: 24 },
          1024: { slidesPerView: 6, spaceBetween: 28 },
          1280: { slidesPerView: 7, spaceBetween: 32 },
        }}
        className="!overflow-hidden"
      >
        {list.map((b, i) => {
          const content = (
            <div
              className="
                h-16 md:h-20 lg:h-24
                flex items-center gap-4
                rounded-xl border border-neutral-200/70 dark:border-neutral-800/70
                bg-white/70 dark:bg-neutral-900/40
                px-6 justify-center
              "
              title={b.name}
            >
              {b.logo?.src && (
                <Image
                  src={b.logo.src}
                  alt={b.logo.alt || b.name}
                  width={b.logo.width ?? 120}
                  height={b.logo.height ?? 60}
                  className="max-h-12 w-auto object-contain filter brightness-0 invert"
                />
              )}
              <span className="font-medium text-neutral-700 dark:text-neutral-300">{b.name}</span>
            </div>
          )

          return (
            <SwiperSlide key={i} className="!h-auto">
              {b.url ? (
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded-xl">
                  {content}
                </a>
              ) : (
                content
              )}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
