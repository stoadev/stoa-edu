import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { ShoppingCart, Code, Smartphone, Palette, BarChart3 } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useCategories } from '../../lib/queries/categories'
import { useCourses } from '../../lib/queries/courses'
import { useScroll } from '../../hooks/useScroll'
import { cn } from '../../lib/utils'
import { MenuToggleIcon } from '../ui/menu-toggle-icon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { Button } from '../ui/Button'
import { formatPrice } from '../../lib/format'

const categoryIcons: Record<string, typeof Code> = {
  'web-gelistirme': Code,
  mobil: Smartphone,
  tasarim: Palette,
  'veri-bilimi': BarChart3,
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScroll(10)
  const { user, profile, loading, signOut } = useAuth()
  const { data: categories } = useCategories()
  const { data: courses } = useCourses()
  const featured = courses?.slice(0, 2) ?? []
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleSignOut = async () => {
    await signOut()
    setOpen(false)
    navigate('/')
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors',
        scrolled &&
          'bg-white/95 supports-[backdrop-filter]:bg-white/70 border-b border-gray-200 backdrop-blur-lg',
      )}
    >
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-8">
        {/* Sol: logo + nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            stoaedu
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {/* Kurslar dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Kurslar</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[640px] grid-cols-2 gap-4 p-4">
                    {/* Sol: kategoriler */}
                    <div>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Kategoriler
                      </p>
                      <ul className="space-y-1">
                        {categories?.map((cat) => {
                          const Icon = categoryIcons[cat.slug] ?? Code
                          return (
                            <li key={cat.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to="/courses"
                                  className="flex items-start gap-3 rounded-md p-2 hover:bg-gray-100"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-gray-50">
                                    <Icon className="h-5 w-5 text-gray-700" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                      {cat.name}
                                    </span>
                                    {cat.description && (
                                      <span className="text-xs text-gray-500">
                                        {cat.description}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                    {/* Sağ: öne çıkan kurslar */}
                    <div>
                      <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Öne Çıkanlar
                      </p>
                      <ul className="space-y-2">
                        {featured.map((course) => (
                          <li key={course.id}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={`/courses/${course.slug}`}
                                className="flex items-start gap-3 rounded-md p-2 hover:bg-gray-100"
                              >
                                {course.thumbnail_url && (
                                  <img
                                    src={course.thumbnail_url}
                                    alt={course.title}
                                    width={80}
                                    height={48}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-12 w-20 rounded object-cover"
                                  />
                                )}
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-gray-900">
                                    {course.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatPrice(course.price, course.currency)}
                                  </span>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="border-t bg-gray-50 px-4 py-2">
                    <Link
                      to="/courses"
                      className="text-sm font-medium text-brand-700 hover:text-brand-800"
                    >
                      Tüm Kursları Gör →
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Statik linkler */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      cn('inline-flex h-10 items-center rounded-md px-4 py-2 text-base font-normal transition-colors hover:bg-gray-100 hover:text-gray-900', isActive && 'bg-gray-100 text-gray-900')
                    }
                  >
                    Hakkımızda
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      cn('inline-flex h-10 items-center rounded-md px-4 py-2 text-base font-normal transition-colors hover:bg-gray-100 hover:text-gray-900', isActive && 'bg-gray-100 text-gray-900')
                    }
                  >
                    İletişim
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Sağ: sepet + auth */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/cart" aria-label="Sepet" className="rounded-md p-2 hover:bg-gray-100">
            <ShoppingCart className="h-5 w-5 text-gray-700" />
          </Link>
          {!loading &&
            (user ? (
              <>
                <span className="text-base text-gray-700">{profile?.full_name || user.email}</span>
                <Button variant="outline" size="md" onClick={handleSignOut}>
                  Çıkış
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="md">
                    Oturum aç
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">
                    Kayıt Ol
                  </Button>
                </Link>
              </>
            ))}
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md border p-2 md:hidden"
          aria-expanded={open}
          aria-label="Menü"
        >
          <MenuToggleIcon open={open} className="h-5 w-5" duration={300} />
        </button>
      </nav>

      {/* Mobile menu (portal) */}
      {open &&
        createPortal(
          <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-4 overflow-y-auto border-t bg-white/95 p-4 backdrop-blur-lg md:hidden">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/courses"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn('rounded-md p-3 text-base font-normal hover:bg-gray-100', isActive && 'bg-gray-100 text-gray-900')
                }
              >
                Kurslar
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn('rounded-md p-3 text-base font-normal hover:bg-gray-100', isActive && 'bg-gray-100 text-gray-900')
                }
              >
                Hakkımızda
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn('rounded-md p-3 text-base font-normal hover:bg-gray-100', isActive && 'bg-gray-100 text-gray-900')
                }
              >
                İletişim
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn('flex items-center gap-2 rounded-md p-3 text-base font-normal hover:bg-gray-100', isActive && 'bg-gray-100 text-gray-900')
                }
              >
                <ShoppingCart className="h-5 w-5" /> Sepet
              </NavLink>
            </div>
            {!loading && (
              <div className="mt-auto flex flex-col gap-2">
                {user ? (
                  <>
                    <p className="px-3 text-base text-gray-700">
                      {profile?.full_name || user.email}
                    </p>
                    <Button variant="outline" onClick={handleSignOut}>
                      Çıkış
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Oturum aç
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)}>
                      <Button variant="primary" className="w-full">
                        Kayıt Ol
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>,
          document.body,
        )}
    </header>
  )
}
