import type { ReactNode } from 'react'
import { ImageSlider } from '../ui/ImageSlider'
import { authSlides } from '../../lib/images'

interface AuthLayoutProps {
  icon: ReactNode
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthLayout({ icon, title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[calc(100vh-64px)]">
        <div className="hidden md:block md:col-span-6">
          <ImageSlider images={authSlides} />
        </div>
        <div className="flex w-full items-center justify-center px-6 py-12 md:col-span-6 md:px-10">
          <div className="w-full max-w-sm bg-gradient-to-b from-brand-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-brand-100">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
              {icon}
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center text-gray-900">{title}</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">{subtitle}</p>
            {children}
            <div className="mt-6 text-sm text-gray-500">{footer}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
