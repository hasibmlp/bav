// src/components/common/Section.tsx
import { Container } from './Container'
export function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="py-12 md:py-16">
      <Container>{children}</Container>
    </section>
  )
}
