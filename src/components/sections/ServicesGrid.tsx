'use client'

import { useState } from 'react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y } from 'swiper/modules'
import type { ServicesSection } from '@/types/view'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useDirection } from '@/context/DirectionProvider'

export function ServicesGrid({ data }: { data: ServicesSection }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const { direction } = useDirection()

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="">
        <header className="mb-8 md:mb-12 flex items-end justify-between mx-auto max-w-[1400px] px-4">
          <div>
            <h2
              className="font-bold tracking-tight"
              style={{ fontSize: 'clamp(1.875rem, 1.2rem + 2vw, 3rem)' }}
            >
              {data.title}
            </h2>
          </div>
          <Link href="/services" className="text-sm font-medium hover:underline">
            View All Services
          </Link>
        </header>

        <div className="relative">
          <div
            className={`min-h-[600px] transition-opacity duration-500 ${
              swiper ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Swiper
              key={direction}
              dir={direction}
              modules={[Navigation, A11y]}
              onSwiper={setSwiper}
              spaceBetween={32}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                1024: { slidesPerView: 1.8 },
                1800: { slidesPerView: 3 },
              }}
              className="!pb-4 !pl-4 sm:!pl-6 md:!pl-12 lg:!pl-24"
            >
              {data.items.map((it, i) => (
                <SwiperSlide key={i} className="!h-auto">
                  <article className="group relative grid grid-cols-1 lg:grid-cols-2 items-start gap-8">
                    {it.image && (
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                        <Image
                          src={it.image.src}
                          alt={it.image.alt || ''}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col justify-start py-6 px-4 lg:py-8 lg:px-5 h-full">
                      <h3
                        className="font-semibold text-neutral-900 text-left"
                        style={{
                          fontSize: 'clamp(1.25rem, 0.8rem + 1.2vw, 2.25rem)',
                          lineHeight: 'clamp(2rem, 1.5rem + 1.5vw, 2.75rem)',
                        }}
                      >
                        {it.title}
                      </h3>
                      {it.description && (
                        <p className="mt-8 text-base text-neutral-700 text-left">{it.description}</p>
                      )}
                      <div className="mt-auto pt-8">
                        <Link
                          href="/services"
                          className="
                            inline-flex items-center gap-2 font-semibold border-2 px-5 py-2.5 rounded-md
                            transition-colors no-underline text-base
                            text-[var(--color-primary)] border-[var(--color-primary)]
                            hover:bg-[var(--color-primary)] hover:text-white
                          "
                        >
                          Explore
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
                            className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="mx-auto max-w-[1400px] mt-4 flex justify-end px-4">
          <div className="flex items-center gap-2 xl:pt-8">
            <button
              onClick={() => swiper?.slidePrev()}
              className="prev-arrow h-10 w-10 rounded-full grid place-items-center transition-opacity hover:opacity-90"
              aria-label="Previous slide"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="next-arrow h-10 w-10 rounded-full grid place-items-center transition-opacity hover:opacity-90"
              aria-label="Next slide"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="rtl:rotate-180"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
