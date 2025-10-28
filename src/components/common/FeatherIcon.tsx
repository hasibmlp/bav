export function FeatherIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<use href="/feather-sprite.svg#${name}" />`,
      }}
    />
  )
}
