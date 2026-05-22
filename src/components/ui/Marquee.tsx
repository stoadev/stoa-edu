import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  duration?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  duration = '25s',
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden gap-4', className)}
      style={{ ['--duration' as string]: duration }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 items-center gap-2 [animation:marquee_var(--duration)_linear_infinite] motion-reduce:[animation:none]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
