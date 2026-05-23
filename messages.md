# Messages

## [#085] Coder → Manager | 2026-05-23 02:10 | status: pending
✓ 4 dosyada değişiklik/oluşturma yapıldı:
- `src/lib/images.ts` — yeni, `authSlides` dizisi
- `src/components/ui/ImageSlider.tsx` — yeni, fade slider (prefers-reduced-motion destekli)
- `src/components/home/Hero.tsx` — sol `<img>` → `<ImageSlider images={authSlides} />`
- `src/components/auth/AuthLayout.tsx` — sol `<img>` → `<ImageSlider images={authSlides} />`

---

## [#084] Manager → Coder | 2026-05-23 02:00 | status: done

**Brief:** ImageSlider component + Hero ve AuthLayout'a entegrasyon. Otomatik fade, 5 saniye, prefers-reduced-motion saygısı. 4 dosya.

### 1. `src/lib/images.ts` (yeni)

Slider'da kullanılacak görsel listesi:

```ts
export const authSlides = [
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1600&h=1200&fit=crop&auto=format',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&h=1200&fit=crop&auto=format',
    alt: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1600&h=1200&fit=crop&auto=format',
    alt: '',
  },
]
```

### 2. `src/components/ui/ImageSlider.tsx` (yeni)

Custom fade slider. Tüm görseller absolute positioned üst üste, sadece active olan `opacity-100`, diğerleri `opacity-0`. CSS transition ile fade.

```tsx
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

    // prefers-reduced-motion: kullanıcı animasyon istemiyorsa otomatik geçiş yapma
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [images.length, interval])

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
    </div>
  )
}
```

**Notlar:**
- İlk görsel `loading="eager"` (above-the-fold, hemen yükle), diğerleri `lazy`
- `transition-opacity duration-1000` = 1 saniye fade (yumuşak)
- `prefers-reduced-motion: reduce` ise interval başlamaz, ilk görsel kalır
- Tek görsel verildiyse interval başlamaz
- `key={i}` indeks bazlı çünkü dizi sabit, splice/reorder yok

### 3. `src/components/home/Hero.tsx` — Sol `<img>`'yi ImageSlider ile değiştir

Mevcut sol kolondaki `<img>` bloğu:
```tsx
<div className="h-64 w-full md:col-span-6 md:h-full">
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
    alt="Öğrenciler"
    width={1600}
    height={1200}
    loading="eager"
    fetchPriority="high"
    decoding="async"
    className="h-full w-full object-cover"
  />
</div>
```

Yeni:
```tsx
<div className="h-64 w-full md:col-span-6 md:h-full">
  <ImageSlider images={authSlides} />
</div>
```

İmport ekle:
```tsx
import { ImageSlider } from '../ui/ImageSlider'
import { authSlides } from '../../lib/images'
```

### 4. `src/components/auth/AuthLayout.tsx` — Sol `<img>`'yi ImageSlider ile değiştir

Mevcut:
```tsx
<div className="hidden md:block md:col-span-6">
  <img
    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
    alt=""
    width={1600}
    height={1200}
    loading="eager"
    decoding="async"
    className="h-full w-full object-cover"
  />
</div>
```

Yeni:
```tsx
<div className="hidden md:block md:col-span-6">
  <ImageSlider images={authSlides} />
</div>
```

İmport ekle:
```tsx
import { ImageSlider } from '../ui/ImageSlider'
import { authSlides } from '../../lib/images'
```

---

**Genel notlar:**
- Hero ve Auth aynı 4 görsel set'ini kullanıyor (`authSlides`). İleride ayrılırsa farklı export oluştururuz (`heroSlides`).
- Component reusable — 3. yerde de kullanmak isteyince hazır.
- CSS-only fade (JS animasyon yok), GPU accelerated.
- `width`/`height` attribute → CLS sıfır.

**Çıktı:** Hangi 4 dosyada değişiklik/oluşturma yaptığını listele.

---

## [#083] Coder → Manager | 2026-05-23 01:38 | status: done
✓ 8 dosyada değişiklik/oluşturma yapıldı:
- `src/lib/format.ts` — yeni, `formatPrice` utility
- `src/routes/Courses.tsx` — local `formatPrice` silindi, import eklendi
- `src/routes/CourseDetail.tsx` — local `formatPrice` silindi, import eklendi
- `src/components/layout/Navbar.tsx` — local `formatPrice` silindi, import eklendi
- `src/components/ui/Input.tsx` — yeni, ikon destekli reusable input
- `src/components/auth/AuthLayout.tsx` — yeni, 2 kolonlu auth iskeleti
- `src/routes/Login.tsx` — AuthLayout + Input ile yeniden yazıldı
- `src/routes/Register.tsx` — AuthLayout + Input ile yeniden yazıldı

---

## [#082] Manager → Coder | 2026-05-23 01:30 | status: done

**Brief — Refactor: DRY paketi (formatPrice + Input + AuthLayout).** Toplam ~7-8 dosya etkilenecek.

### 1. `src/lib/format.ts` (yeni)
Para formatı utility'sini tek yere çek:
```ts
export const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)
```

### 2. Aşağıdaki dosyalardan `formatPrice` tanımını SİL, import'a çevir:

- `src/routes/Courses.tsx`
- `src/routes/CourseDetail.tsx`
- `src/components/layout/Navbar.tsx`

Her birinde:
```ts
import { formatPrice } from '../lib/format'
```
(Navbar için yol: `../../lib/format`)

### 3. `src/components/ui/Input.tsx` (yeni)

Reusable input — sol ikon opsiyonel. Tüm form input'larında kullanılacak.

```tsx
import { forwardRef, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm',
          icon ? 'pl-10 pr-3' : 'px-3',
          className,
        )}
        {...props}
      />
    </div>
  ),
)
Input.displayName = 'Input'
```

### 4. `src/components/auth/AuthLayout.tsx` (yeni)

Login/Register'ın paylaştığı 2 kolonlu iskelet + form card wrapper.

```tsx
import type { ReactNode } from 'react'

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
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
            alt=""
            width={1600}
            height={1200}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
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
```

### 5. `src/routes/Login.tsx` — Yeniden yaz, AuthLayout + Input ile

```tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthLayout } from '../components/auth/AuthLayout'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) setError(error.message)
    else navigate('/courses')
  }

  return (
    <AuthLayout
      icon={<LogIn className="w-7 h-7 text-gray-900" />}
      title="Oturum aç"
      subtitle="Hesabına giriş yap ve öğrenmeye kaldığın yerden devam et."
      footer={
        <>
          Hesabın yok mu?{' '}
          <Link to="/register" className="text-brand-700 font-medium hover:underline">
            Kayıt ol
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <Input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          icon={<Mail />}
        />
        <Input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          minLength={6}
          icon={<Lock />}
        />
        {error && (
          <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p aria-live="polite">{error}</p>
          </div>
        )}
        <Button type="submit" disabled={submitting} className="w-full mt-2">
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Giriş yapılıyor...
            </>
          ) : (
            'Oturum aç'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
```

### 6. `src/routes/Register.tsx` — Aynı şekilde yeniden yaz

Aynı yapı, sadece:
- icon: `<UserPlus className="w-7 h-7 text-gray-900" />`
- title: "Kayıt ol"
- subtitle: "Ücretsiz hesap aç, kurslara erişmeye hemen başla."
- 3 Input (ad soyad/email/şifre — User/Mail/Lock ikonları)
- Button text: "Kayıt ol" / "Kaydediliyor..."
- footer: "Zaten hesabın var mı? **Oturum aç**" (Link to="/login")
- signUp(email, password, fullName) çağrısı

Tüm form mantığı (useState, handleSubmit, error, submitting) Login ile aynı pattern.

**Çıktı:** Hangi 7-8 dosyada değişiklik/oluşturma yaptığını listele.

---

## [#081] Coder → Manager | 2026-05-23 01:12 | status: done
✓ `src/components/layout/Navbar.tsx` güncellendi — Hakkımızda ve İletişim NavLink'lerine `inline-flex h-10 items-center transition-colors hover:text-gray-900` eklendi.

---

## [#080] Manager → Coder | 2026-05-23 01:10 | status: done

**Brief:** `src/components/layout/Navbar.tsx` — Statik NavLink'lerin (Hakkımızda, İletişim) hover efektini Kurslar trigger'ına eşitle. Yükseklik + transition + text rengi.

Mevcut NavLink className örneği (Hakkımızda):
```tsx
className={({ isActive }) =>
  cn(
    'rounded-md px-4 py-2 text-base font-normal hover:bg-gray-100',
    isActive && 'bg-gray-100 text-gray-900',
  )
}
```

Yeni:
```tsx
className={({ isActive }) =>
  cn(
    'inline-flex h-10 items-center rounded-md px-4 py-2 text-base font-normal transition-colors hover:bg-gray-100 hover:text-gray-900',
    isActive && 'bg-gray-100 text-gray-900',
  )
}
```

Değişiklikler:
- `inline-flex h-10 items-center` (Kurslar trigger ile aynı yükseklik + dikey ortalama)
- `transition-colors` (smooth hover geçişi)
- `hover:text-gray-900` (Kurslar trigger ile aynı text renk değişimi)

Hem Hakkımızda hem İletişim için aynı className yapısı. Mobile menü NavLink'lerine dokunma (oradaki layout farklı).

**Çıktı:** Dosya güncellendi de.

---

## [#079] Coder → Manager | 2026-05-23 01:05 | status: done
✓ 3 dosya güncellendi:
- `src/routes/Login.tsx` — sol görsel + sağ form card layout, full rewrite
- `src/routes/Register.tsx` — aynı yapı, full_name + UserPlus ikonu, full rewrite
- `src/components/layout/Layout.tsx` — `hideFooter` login/register path'lerini de kapsıyor

---

## [#078] Manager → Coder | 2026-05-23 01:00 | status: done

**Brief:** Login + Register sayfalarını landing page iskeletiyle aynı yap — sol görsel, sağ form card. Form card 21st.dev "clean-minimal-sign-in"'den uyarlanacak. 3 dosya.

**Bağlam:**
- Landing page'de Hero: sol resim + sağ içerik. Login/Register de aynı şekilde olacak.
- Sağ tarafta hero metni yerine bizim sign-in card'ımız olacak — uyarlanmış, brand teal renkli, Türkçe, mevcut auth logic'iyle entegre
- Social login (Google/Facebook/Apple) ATLA — OAuth henüz entegre değil
- "Forgot password" da ATLA — şimdilik özellik yok
- Mevcut autocomplete, Loader2 spinner, AlertCircle error card korunmalı (#066'da kazandırıldı)
- Footer login/register'da da gizlensin (Layout'a path ekle)

---

### 1. `src/routes/Login.tsx` — Full rewrite

```tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) setError(error.message)
    else navigate('/courses')
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[calc(100vh-64px)]">
        {/* Sol: görsel */}
        <div className="hidden md:block md:col-span-6">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
            alt=""
            width={1600}
            height={1200}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Sağ: form */}
        <div className="flex w-full items-center justify-center px-6 py-12 md:col-span-6 md:px-10">
          <div className="w-full max-w-sm bg-gradient-to-b from-brand-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-brand-100">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
              <LogIn className="w-7 h-7 text-gray-900" />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center text-gray-900">Oturum aç</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Hesabına giriş yap ve öğrenmeye kaldığın yerden devam et.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p aria-live="polite">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full mt-2">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Giriş yapılıyor...
                  </>
                ) : (
                  'Oturum aç'
                )}
              </Button>
            </form>

            <p className="mt-6 text-sm text-gray-500">
              Hesabın yok mu?{' '}
              <Link to="/register" className="text-brand-700 font-medium hover:underline">
                Kayıt ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 2. `src/routes/Register.tsx` — Full rewrite (aynı yapı, full_name + UserPlus)

```tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error } = await signUp(email, password, fullName)
    setSubmitting(false)
    if (error) setError(error.message)
    else navigate('/courses')
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[calc(100vh-64px)]">
        <div className="hidden md:block md:col-span-6">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
            alt=""
            width={1600}
            height={1200}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex w-full items-center justify-center px-6 py-12 md:col-span-6 md:px-10">
          <div className="w-full max-w-sm bg-gradient-to-b from-brand-50/50 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-brand-100">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white mb-6 shadow-lg">
              <UserPlus className="w-7 h-7 text-gray-900" />
            </div>
            <h1 className="text-2xl font-semibold mb-2 text-center text-gray-900">Kayıt ol</h1>
            <p className="text-gray-500 text-sm mb-6 text-center">
              Ücretsiz hesap aç, kurslara erişmeye hemen başla.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  placeholder="Şifre (min 6 karakter)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <p aria-live="polite">{error}</p>
                </div>
              )}

              <Button type="submit" disabled={submitting} className="w-full mt-2">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  'Kayıt ol'
                )}
              </Button>
            </form>

            <p className="mt-6 text-sm text-gray-500">
              Zaten hesabın var mı?{' '}
              <Link to="/login" className="text-brand-700 font-medium hover:underline">
                Oturum aç
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 3. `src/components/layout/Layout.tsx` — Footer'ı login/register'da da gizle

Mevcut:
```tsx
const hideFooter = location.pathname === '/'
```

Yeni:
```tsx
const hideFooter = ['/', '/login', '/register'].includes(location.pathname)
```

**Çıktı:** 3 dosya güncellendi de.

---

## [#077] Coder → Manager | 2026-05-23 00:52 | status: done
✓ 2 dosya güncellendi:
- `src/components/ui/navigation-menu.tsx` — `navigationMenuTriggerStyle` → `font-medium` → `font-normal`
- `src/components/layout/Navbar.tsx` — desktop statik linkler + tüm mobile NavLink'ler `font-medium` → `font-normal`

---

## [#076] Manager → Coder | 2026-05-23 00:50 | status: done

**Brief:** Navbar linklerinin font ağırlığını azalt (Udemy tarzı, ince yazı). 2 dosya.

### 1. `src/components/ui/navigation-menu.tsx`

`navigationMenuTriggerStyle` cva'sında:

Mevcut:
```tsx
'group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-base font-medium transition-colors ...'
```

`text-base font-medium` → `text-base font-normal`.

### 2. `src/components/layout/Navbar.tsx`

A) Desktop statik NavLink className'lerinde (Hakkımızda, İletişim):
```tsx
'rounded-md px-4 py-2 text-base font-medium hover:bg-gray-100'
```
`font-medium` → `font-normal`.

B) Mobile menü NavLink className'lerinde:
```tsx
'rounded-md p-3 text-base font-medium hover:bg-gray-100'
```
`font-medium` → `font-normal`.

C) Username (login user gösterimi) — kalsın font ağırlığı default.

**Çıktı:** 2 dosya güncellendi de.

---

## [#075] Coder → Manager | 2026-05-22 00:47 | status: done
✓ `src/components/layout/Navbar.tsx` güncellendi — `max-w-7xl` kaldırıldı, `px-4` → `px-8`.

---

## [#074] Manager → Coder | 2026-05-23 00:45 | status: done

**Brief:** `src/components/layout/Navbar.tsx` — Navbar içeriği kenarlara yaklaşsın. Tek değişiklik.

Mevcut nav:
```tsx
<nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
```

Yeni (max-w'i kaldır, padding'i artır):
```tsx
<nav className="mx-auto flex h-16 w-full items-center justify-between px-8">
```

`max-w-7xl` kaldırıldı (artık tam genişlik), `px-4` → `px-8` (kenardan biraz boşluk kalsın).

**Çıktı:** Dosya güncellendi de.

---

## [#073] Coder → Manager | 2026-05-23 00:41 | status: done
✓ 2 dosya güncellendi:
- `src/components/ui/Button.tsx` — outline hover gri, md `h-10`→`h-9`
- `src/components/layout/Navbar.tsx` — "Giriş" → "Oturum aç" (tüm yerlerde)

---

## [#072] Manager → Coder | 2026-05-23 00:40 | status: done

**Brief:** 3 değişiklik — outline gri hover + button md boyutu inceltme + "Giriş" → "Oturum aç". 2 dosya.

### 1. `src/components/ui/Button.tsx`

A) Outline variant hover'ı gri yap (teal değil):
```tsx
outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:border-gray-400',
```

B) Md boyutunu bir tık ince yap — `h-10 px-4 text-sm` → `h-9 px-4 text-sm`:
```tsx
size: {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
},
```

### 2. `src/components/layout/Navbar.tsx`

"Giriş" → "Oturum aç" (3 yerde):

A) Desktop:
```tsx
<Link to="/login">
  <Button variant="outline" size="md">Oturum aç</Button>
</Link>
```

B) Mobile menü:
```tsx
<Link to="/login" onClick={() => setOpen(false)}>
  <Button variant="outline" className="w-full">Oturum aç</Button>
</Link>
```

C) Logout durumunda Çıkış zaten "Çıkış" — orası dokunma. "Giriş" geçen tüm yerleri "Oturum aç" yap.

**Çıktı:** 2 dosya güncellendi de.

---

