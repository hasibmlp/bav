'use client'

import { useState } from 'react'
import type { SolutionsSection } from '@/types/view'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

export function Solutions({ data }: { data: SolutionsSection }) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiperInstance: SwiperInstance) => {
    setActiveIndex(swiperInstance.realIndex)
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto md:max-w-[90%] md:px-4">
        <header className="mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Environments We Empower
          </h2>
        </header>
        <div className={`min-h-[700px] transition-opacity duration-500 ${swiper ? 'opacity-100' : 'opacity-0'}`}>
          <Swiper
            modules={[Autoplay, A11y]}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            slidesPerView={1}
            spaceBetween={32}
            centeredSlides
            onSwiper={setSwiper}
            onSlideChange={handleSlideChange}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {data.items.map((item, i) => (
              <SwiperSlide key={i} className="relative overflow-hidden md:rounded-xl transition-transform duration-300">
                {({ isActive }) => (
                  <>
                    <div className={`relative aspect-[2/3] w-full transition-transform duration-300 ${isActive ? 'scale-105' : ''}`}>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt || item.title}
                        layout="fill"
                        objectFit="cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                    <div
                      className="absolute inset-0 p-4 flex flex-col justify-end overflow-hidden"
                    >
                      <div
                        className={`p-8 transition-transform duration-500 ease-in-out ${
                          isActive ? 'translate-y-0' : 'translate-y-full'
                        }`}
                      >
                        <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                        <p className="mt-8 text-base text-neutral-200">{item.description}</p>
                        {item.audience && (
                          <p className="mt-4 text-sm text-neutral-300">{item.audience}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
