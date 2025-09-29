// src/components/common/RichText.tsx
export function RichText({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
