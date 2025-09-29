// src/app/(site)/contact/page.tsx
import { Section } from '@/components/common/Section'
import { Container } from '@/components/common/Container'
import { ContactForm } from '@/components/forms/ContactForm'

export default function Page() {
  return (
    <Section>
      <Container>
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <ContactForm />
      </Container>
    </Section>
  )
}
