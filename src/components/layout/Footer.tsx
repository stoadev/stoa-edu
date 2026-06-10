import { Link } from 'react-router-dom'
import { X, Mail, Globe } from 'lucide-react'

const exploreLinks = [
  { to: '/courses', label: 'Tüm Kurslar' },
  { to: '/categories', label: 'Kategoriler' },
  { to: '/about', label: 'Hakkımızda' },
  { to: '/contact', label: 'İletişim' },
]

const categoryLinks = [
  { to: '/courses', label: 'Web Geliştirme' },
  { to: '/courses', label: 'Mobil Geliştirme' },
  { to: '/courses', label: 'Tasarım' },
  { to: '/courses', label: 'Veri Bilimi' },
]

const socialLinks = [
  { href: 'https://x.com', label: 'X', icon: X },
  { href: 'https://stoaedu.com', label: 'Web sitesi', icon: Globe },
  { href: 'mailto:destek@stoaedu.com', label: 'E-posta', icon: Mail },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Marka */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              stoaedu
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Yazılım ve tasarım alanında kariyerinizi ilerletecek, uygulamalı online kurslar.
            </p>
            <div className="mt-4 flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 transition-colors hover:border-brand-300 hover:text-brand-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Keşfet */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Keşfet</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Kategoriler</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">İletişim</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              <li>destek@stoaedu.com</li>
              <li>Levent, İstanbul</li>
              <li>Hafta içi 09:00 – 18:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <p className="text-sm text-gray-500">© 2026 stoaedu. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">
              Gizlilik Politikası
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-900">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
