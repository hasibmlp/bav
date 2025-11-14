import type { HeroSection, ImageView } from '@/types/view'

export function PageHero({
  data,
  heroImage,
}: {
  data: HeroSection
  heroImage?: ImageView
}) {
  const imageUrl = heroImage?.src || '/images/bav-hero.jpg'

  return (
    <section className="relative bg-neutral-900 text-white pt-28 md:pt-40 pb-12 md:pb-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data.headline}</h1>
        {data.subheadline && (
          <p className="mt-4 text-base md:text-lg text-neutral-300">{data.subheadline}</p>
        )}
      </div>
    </section>
  )
}
