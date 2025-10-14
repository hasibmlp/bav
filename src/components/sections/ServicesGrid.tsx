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

export function ServicesGrid({ data }: { data: ServicesSection }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="">
        <header className="mb-8 md:mb-12 flex items-end justify-between mx-auto max-w-[1400px] px-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{data.title}</h2>
          </div>
          <Link href="/services" className="text-sm font-medium hover:underline">
            View All Services
          </Link>
        </header>

        <div className="relative">
          <div
            className={`min-h-[600px] transition-opacity duration-500 ${swiper ? 'opacity-100' : 'opacity-0'}`}
          >
            <Swiper
              modules={[Navigation, A11y]}
              onSwiper={setSwiper}
              spaceBetween={32}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                1024: { slidesPerView: 1.8 },
              }}
              className="!pb-4"
            >
              {data.items.map((it, i) => (
                <SwiperSlide key={i} className="!h-auto lg:pl-4">
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
                    <div className="flex flex-col justify-start py-6 px-4 lg:py-8 lg:px-5">
                      <h3 className="text-xl/8 lg:text-3xl/10 font-semibold text-neutral-900 text-left">
                        {it.title}
                      </h3>
                      {it.description && (
                        <p className="mt-8 text-base text-neutral-700 text-left">{it.description}</p>
                      )}
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
              className="prev-arrow h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 grid place-items-center transition-colors"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => swiper?.slideNext()}
              className="next-arrow h-10 w-10 rounded-full bg-neutral-100 hover:bg-neutral-200 grid place-items-center transition-colors"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
