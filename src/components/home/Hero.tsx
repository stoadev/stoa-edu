import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Marquee } from '../ui/Marquee'
import { ImageSlider } from '../ui/ImageSlider'
import { authSlides } from '../../lib/images'

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&auto=format',
]

const techLogos = [
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
]

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[calc(100vh-64px)]">
        {/* Sol: görsel */}
        <div className="h-64 w-full md:col-span-6 md:h-full">
          <ImageSlider images={authSlides} />
        </div>

        {/* Sağ: içerik */}
        <div className="flex w-full flex-col px-6 pt-12 pb-6 md:col-span-6 md:px-10 md:pt-20 md:pb-8">
          <div className="my-auto w-full max-w-2xl space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Geleceğini bugünden inşa et
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Yazılım, tasarım ve veri alanında uzmanlardan hazırlanmış kurslarla kariyerini bir
                üst seviyeye taşı. Kendi hızında öğren, ne zaman istersen tekrar izle.
              </p>
            </div>

            {/* Avatar grubu + stat */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">10,000+</p>
                <p className="text-sm text-gray-500">Mutlu öğrenci</p>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link to="/courses" className="group inline-flex items-center gap-0">
                <span className="rounded-l-full bg-brand-100 px-6 py-3 text-gray-900 font-medium transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-brand-100">
                  Kursları Görüntüle
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-r-full bg-brand-100 text-gray-900 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-brand-100">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-12 transition-transform duration-300 group-hover:translate-x-0" />
                  <ArrowUpRight className="absolute h-5 w-5 transition-transform duration-300 group-hover:translate-x-12" />
                </span>
              </Link>
            </div>
          </div>

          {/* Tech logos marquee — sağ kolon altında */}
          <div className="relative -mx-6 mt-12 md:-mx-10">
            <div className="pointer-events-none absolute left-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
            <Marquee duration="30s" pauseOnHover={false}>
              {techLogos.map((logo) => (
                <div key={logo.name} className="flex items-center gap-3 px-4 cursor-default select-none">
                  <img src={logo.url} alt={logo.name} width={64} height={64} loading="lazy" decoding="async" className="h-16 w-16" />
                  <span className="text-xl font-semibold text-gray-800">{logo.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  )
}
