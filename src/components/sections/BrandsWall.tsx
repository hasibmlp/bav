'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import type { BrandsSection } from '@/types/view'
import Image from 'next/image'
import { useDirection } from '@/context/DirectionProvider'

export function BrandsWall({ data }: { data: BrandsSection }) {
  const { direction } = useDirection()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hasEnoughForMobile = data.items.length > 2
  const hasEnoughForDesktop = data.items.length > 6
  const shouldRenderSlider = (!isDesktop && hasEnoughForMobile) || (isDesktop && hasEnoughForDesktop)
  const canAutoplay = shouldRenderSlider

  return (
    <section className="py-20 md:py-28">
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
      {shouldRenderSlider ? (
        <Swiper
          key={direction}
          dir={direction}
          modules={[Autoplay, A11y]}
          loop={canAutoplay}
          autoplay={
            canAutoplay
              ? {
                  delay: 0,
                  disableOnInteraction: false,
                }
              : false
          }
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
          {data.items.map((item) => (
            <SwiperSlide key={item.id}>
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
      ) : (
        <div className="flex w-full flex-wrap items-center justify-center gap-x-24 gap-y-12 px-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex h-12 w-32 items-center justify-center md:h-16 md:w-40 lg:h-16 lg:w-48"
            >
              <Image
                src={item.logo.src}
                alt={item.logo.alt || item.name}
                width={90}
                height={30}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
