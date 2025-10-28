import type { ContentSection } from '@/types/view'

export function Content({ data }: { data: ContentSection }) {
  return (
    <section className="py-20 md:py-28">
      <div
        className="prose prose-lg mx-auto max-w-4xl px-4"
        dangerouslySetInnerHTML={{ __html: data.body }}
      />
    </section>
  )
}
