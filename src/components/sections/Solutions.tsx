'use client'

import { useRef, useEffect, useState } from 'react'
import type { SolutionsSection } from '@/types/view'
import Image from 'next/image'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { Navigation, A11y, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useInView } from 'react-intersection-observer'
import { useDirection } from '@/context/DirectionProvider'

export function Solutions({ data }: { data: SolutionsSection }) {
  const swiperRef = useRef<SwiperClass | null>(null)
  const { direction } = useDirection()
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  useEffect(() => {
    const swiperInstance = swiperRef.current
    if (inView) {
      swiperInstance?.autoplay.start()
    } else {
      swiperInstance?.autoplay.stop()
  }
  }, [inView])

  return (
    <section ref={ref} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 md:mb-12 text-center">
          <h2
            className="font-bold tracking-tight text-neutral-900"
            style={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3.5rem)' }}
          >
            {data.title}
          </h2>
          {data.description && <p className="mt-2 text-lg text-neutral-600">{data.description}</p>}
        </header>
        <div className={`min-h-[700px] transition-opacity duration-500 ${swiper ? 'opacity-100' : 'opacity-0'}`}>
          <Swiper
            ref={(node) => {
              if (node) swiperRef.current = node.swiper
            }}
            key={direction}
            dir={direction}
            modules={[Navigation, A11y, Autoplay]}
            navigation={{ nextEl: '.next-solution', prevEl: '.prev-solution' }}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false, stopOnLastSlide: true }}
            slidesPerView={1}
            spaceBetween={32}
            centeredSlides
            onSwiper={setSwiper}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!p-1"
          >
            {data.items.map((item, i) => (
              <SwiperSlide
                key={i}
                className="relative overflow-hidden md:rounded-xl transition-transform duration-300"
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`relative aspect-[2/3] w-full transition-transform duration-300 ${
                        isActive ? 'scale-105' : ''
                      }`}
                    >
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
                    <div className="absolute inset-0 p-4 flex flex-col justify-end overflow-hidden">
                      <div
                        className={`p-8 transition-transform duration-500 ease-in-out ${
                          isActive ? 'translate-y-0' : 'translate-y-full'
                        }`}
                      >
                        <h3
                          className="font-bold text-white"
                          style={{ fontSize: 'clamp(1.5rem, 1rem + 1.5vw, 2.5rem)' }}
                        >
                          {item.title}
                        </h3>
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
