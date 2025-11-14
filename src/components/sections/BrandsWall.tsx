'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import type { BrandsSection } from '@/types/view'
import Image from 'next/image'

export function BrandsWall({ data }: { data: BrandsSection }) {
  // To ensure smooth looping with autoplay, we duplicate the items if they are not enough to fill the view.
  const items = data.items.length > 6 ? data.items : [...data.items, ...data.items]

  return (
    <section className="pb-20 md:pb-28">
      {data.title && (
        <div className="mx-auto max-w-7xl px-4">
          <header className="mb-8 text-center md:mb-20">
            <h2
              className="font-bold tracking-tight text-neutral-900"
              style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)' }}
            >
              {data.title}
            </h2>
          </header>
        </div>
      )}
      {items.length > 0 && (
        <Swiper
          modules={[Autoplay, A11y]}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={5000}
          allowTouchMove={false}
          slidesPerView={5}
          spaceBetween={60}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 40 },
            480: { slidesPerView: 3, spaceBetween: 50 },
            640: { slidesPerView: 4, spaceBetween: 60 },
            768: { slidesPerView: 6, spaceBetween: 80 },
          }}
          className="swiper-brands min-h-[50px]"
        >
          {items.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`}>
              <div className="flex h-12 w-32 items-center justify-center md:h-16 md:w-40 lg:h-16 lg:w-48">
                <Image
                  src={item.logo.src}
                  alt={item.logo.alt || item.name}
                  width={90}
                  height={30}
                  className="h-full w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  )
}
