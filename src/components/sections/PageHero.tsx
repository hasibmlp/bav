import type { HeroSection } from '@/types/view'

export function PageHero({ data }: { data: HeroSection }) {
  return (
    <section className="relative bg-neutral-900 text-white py-20 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('/images/bav-hero.jpg')" }}
      ></div>
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{data.headline}</h1>
        {data.subheadline && (
          <p className="mt-4 text-lg md:text-xl text-neutral-300">{data.subheadline}</p>
        )}
      </div>
    </section>
  )
}
