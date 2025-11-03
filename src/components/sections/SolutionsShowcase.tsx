'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import type { SolutionsShowcaseSection } from '@/types/view'
import { FeatherIcon } from '@/components/common/FeatherIcon'

export function SolutionsShowcase({ data }: { data: SolutionsShowcaseSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (openIndex !== null) {
      const timer = setTimeout(() => {
        const element = itemRefs.current[openIndex]
        if (element) {
          const rect = element.getBoundingClientRect()
          const isFullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight

          if (!isFullyVisible) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        }
      }, 300) // Delay to match animation
      return () => clearTimeout(timer)
    }
  }, [openIndex])

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {data.title || 'Our Solutions'}
          </h2>
        </header>
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-sm transition-all duration-300"
              style={{
                backgroundColor: openIndex === index ? '#FFFFFF' : 'var(--color-primary)',
              }}
            >
              <button
                onClick={() => handleToggle(index)}
                className={`flex w-full items-center justify-between p-6 text-left transition-colors ${
                  openIndex === index ? 'hover:bg-neutral-50/50' : 'hover:bg-white/10'
                }`}
              >
                <h3
                  className={`text-xl font-semibold md:text-2xl ${
                    openIndex === index ? 'text-neutral-800' : 'text-white'
                  }`}
                >
                  {item.title}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeatherIcon
                    name="chevron-down"
                    className={`h-6 w-6 ${
                      openIndex === index ? 'text-neutral-500' : 'text-white'
                    }`}
                  />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <div className="grid items-start gap-8 p-6 md:p-8 lg:grid-cols-2 lg:gap-12">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt || item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          priority={index === 0}
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-neutral-700">{item.description}</p>
                        {item.poweredBy && (
                          <p className="text-sm text-neutral-600">
                            <span className="font-semibold">Powered by innovation:</span>{' '}
                            {item.poweredBy}
                          </p>
                        )}
                        {item.features && (
                          <div>
                            <h4 className="font-semibold text-neutral-800">Key Features:</h4>
                            <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                              {item.features?.map((feature) => (
                                <li key={feature} className="flex items-start">
                                  <FeatherIcon
                                    name="check-circle"
                                    className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary)]"
                                  />
                                  <span className="text-neutral-600">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
