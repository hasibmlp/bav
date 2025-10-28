'use client'

import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { animate } from 'framer-motion'
import type { SnapshotSection } from '@/types/view'

function AnimatedNumber({ value }: { value: string }) {
  const [ref, inView] = useInView({ triggerOnce: true })
  const [animatedValue, setAnimatedValue] = useState(0)
  const numericValue = parseInt(value, 10)

  useEffect(() => {
    if (inView) {
      animate(0, numericValue, {
        duration: 2,
        onUpdate: (latest) => {
          setAnimatedValue(Math.round(latest))
        },
      })
    }
  }, [inView, numericValue])

  return (
    <span ref={ref} className="inline-block min-h-[1em]">
      {animatedValue}
      {value.includes('+') ? '+' : ''}
    </span>
  )
}

export function Snapshot({ data }: { data: SnapshotSection }) {
  return (
    <section className="py-20 md:py-28 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          {data.title}
        </h2>
        <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {data.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center">
              <p
                className="text-4xl font-bold sm:text-5xl"
                style={{ color: 'var(--color-primary)' }}
              >
                <AnimatedNumber value={metric.value} />
              </p>
              <p className="mt-2 text-sm font-medium text-neutral-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
