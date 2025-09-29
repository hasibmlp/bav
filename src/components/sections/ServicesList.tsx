'use client'

import { useState } from 'react'
import type { ReactElement } from 'react'
import type { ServicesSection } from '@/types/view'
import { ServiceContent } from './ServiceContent'

const icons: Record<string, ReactElement> = {
  office: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
      <path d="M12 7h.01" />
    </svg>
  ),
  command: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 4v10h10v-4" />
      <path d="M14 15v4h6v-4" />
      <path d="M17 15v-2" />
    </svg>
  ),
  classroom: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15" />
      <path d="M12 18V6" />
    </svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  retail: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h2" />
      <path d="M15 15h2" />
      <path d="M7 2v4" />
      <path d="M15 2v4" />
    </svg>
  ),
}

export function ServicesList({ data }: { data: ServicesSection }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4">
        {data.title && (
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data.title}</h1>
          </header>
        )}
        <div className="grid gap-4">
          {data.items.map((item, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-sky-500/50">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="
                  w-full flex items-center justify-between
                  bg-sky-600/80 p-4 md:p-6
                  text-left
                "
              >
                <h2 className="text-lg md:text-xl font-medium">{item.title}</h2>
                {item.icon && (
                  <div className="h-10 w-10 grid place-items-center rounded-full bg-sky-500/50">
                    {icons[item.icon]}
                  </div>
                )}
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === i ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-50'
                }`}
              >
                <ServiceContent />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
