import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

interface ImageSliderProps {
  images: Array<{ src: string; alt: string }>
  interval?: number
  className?: string
}

let sharedActiveIndex = 0
let sharedElapsed = 0
let sharedTickStart = Date.now()

export function ImageSlider({ images, interval = 5000, className }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(sharedActiveIndex)

  useEffect(() => {
    if (images.length <= 1) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    sharedTickStart = Date.now()
    const remaining = Math.max(interval - sharedElapsed, 0)

    const advance = () => {
      sharedActiveIndex = (sharedActiveIndex + 1) % images.length
      sharedElapsed = 0
      sharedTickStart = Date.now()
      setActiveIndex(sharedActiveIndex)
    }

    const timeout = setTimeout(() => {
      advance()
    }, remaining)

    let timer: ReturnType<typeof setInterval> | undefined
    const intervalTimeout = setTimeout(() => {
      timer = setInterval(advance, interval)
    }, remaining)

    return () => {
      clearTimeout(timeout)
      clearTimeout(intervalTimeout)
      if (timer) clearInterval(timer)
      sharedElapsed += Date.now() - sharedTickStart
    }
  }, [images.length, interval])

  function goTo(i: number) {
    sharedActiveIndex = i
    sharedElapsed = 0
    sharedTickStart = Date.now()
    setActiveIndex(i)
  }

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          width={1600}
          height={1200}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out',
            i === activeIndex ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${i + 1}. görsele git`}
              aria-current={i === activeIndex}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
                i === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
