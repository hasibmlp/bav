import type { WhoWeAreSection } from "@/types/view";
import Image from "next/image";

export function WhoWeAre({ data }: { data: WhoWeAreSection }) {
  return (
    <section className="py-56 md:py-72 relative">
      {/* Decorative Images */}
      <div
        className="absolute top-24 left-[25%] -translate-x-1/2 w-24 h-24 -rotate-6 lg:top-2/3 lg:-translate-y-1/2 lg:left-[calc(50%-min(40vw,48rem))] lg:w-[clamp(8rem,12vw,10rem)] lg:h-[clamp(8rem,12vw,10rem)]"
      >
        <Image
          src="/images/bnc-who-1.jpeg"
          alt="Decorative image 1"
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div
        className="absolute top-10 right-10 w-20 h-20 rotate-6 lg:top-1/4 lg:-translate-y-1/2 lg:right-[calc(50%-min(42vw,52rem))] lg:w-[clamp(10rem,15vw,12rem)] lg:h-[clamp(10rem,15vw,12rem)]"
      >
        <Image
          src="/images/bnc-who-2.jpeg"
          alt="Decorative image 2"
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-28 h-28 rotate-3 lg:bottom-[-4rem] lg:left-[65%] lg:w-[clamp(9rem,13vw,11rem)] lg:h-[clamp(9rem,13vw,11rem)]"
      >
        <Image
          src="/images/bnc-who-3.jpeg"
          alt="Decorative image 3"
          fill
          className="object-cover rounded-xl"
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
        {data.headline && (
          <p
            className="mb-4 text-lg font-medium tracking-wide uppercase"
            style={{ color: 'var(--color-primary)' }}
          >
            {data.headline}
          </p>
        )}
        {data.subheadline && (
          <p
            className="font-bold uppercase leading-snug text-black"
            style={{ fontSize: "clamp(2rem, 1.8rem + 1.5vw, 3.25rem)" }}
          >
            {data.subheadline}
          </p>
        )}
      </div>
    </section>
  );
}
