// src/components/common/Container.tsx
import { cn } from '@/lib/utils'
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto px-4', className)}>{children}</div>
}
