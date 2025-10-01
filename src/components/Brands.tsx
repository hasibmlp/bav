'use client'

import Image from 'next/image'

type BrandItem = {
  name: string
  url?: string
  logo?: { src: string; alt?: string; width?: number; height?: number }
}

export default function Brands({ items }: { items: BrandItem[] }) {
  const list = (items ?? []).filter(Boolean)

  const renderBrand = (b: BrandItem, i: number) => (
    <div
      key={i}
      className="
        h-24 md:h-32 flex-shrink-0
        flex items-center gap-4 justify-center
        rounded-xl
        px-12 md:px-16
      "
      title={b.name}
    >
      {b.logo?.src && (
        <Image
          src={b.logo.src}
          alt={b.logo.alt || b.name}
          width={b.logo.width ?? 140}
          height={b.logo.height ?? 70}
          className="max-h-12 md:max-h-16 w-auto object-contain filter brightness-0 invert"
        />
      )}
      <span className="font-medium md:text-lg text-neutral-700 dark:text-neutral-300">{b.name}</span>
    </div>
  )

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max animate-marquee">
        {list.map((b, i) => renderBrand(b, i))}
        {list.map((b, i) => renderBrand(b, i + list.length))}
      </div>
    </div>
  )
}
