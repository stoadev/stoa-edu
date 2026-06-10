import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'

interface ImageSliderProps {
  images: Array<{ src: string; alt: string }>
  interval?: number
  className?: string
}

export function ImageSlider({ images, interval = 5000, className }: ImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval, activeIndex])

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
              onClick={() => setActiveIndex(i)}
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
