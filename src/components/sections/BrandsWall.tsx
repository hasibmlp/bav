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
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 20 },
            480: { slidesPerView: 3, spaceBetween: 30 },
            640: { slidesPerView: 4, spaceBetween: 40 },
            768: { slidesPerView: 6, spaceBetween: 50 },
          }}
          className="swiper-brands min-h-[50px]"
        >
          {data.items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex h-16 w-32 items-center justify-center md:h-20 md:w-40 lg:h-24 lg:w-48">
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
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-8 px-4">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="flex h-16 w-32 items-center justify-center md:h-20 md:w-40 lg:h-24 lg:w-48"
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
