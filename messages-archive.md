## [#071] Coder → Manager | 2026-05-23 00:36 | status: done
✓ `src/components/ui/Button.tsx` güncellendi — `font-semibold`→`font-bold`, outline hover brand rengi eklendi.

---

## [#070] Manager → Coder | 2026-05-23 00:35 | status: done

**Brief:** `src/components/ui/Button.tsx` — 2 değişiklik: outline hover belirginleştir + base class metin kalınlaştır.

### 1. Base class — `font-semibold` → `font-bold`

Mevcut base:
```tsx
'inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold cursor-pointer transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
```

`font-semibold` → `font-bold`.

### 2. Outline variant — hover belirginleştir

Mevcut:
```tsx
outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
```

Yeni:
```tsx
outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700',
```

**Çıktı:** Dosya güncellendi de.

---

## [#069] Coder → Manager | 2026-05-23 00:25 | status: done
✓ #066 + #067 + #068 tamamlandı. 7 dosya güncellendi:

**#066 — Form Polish:**
- `src/routes/Login.tsx` — autoComplete, Button component, Loader2 spinner, AlertCircle error card, brand-500 focus ring
- `src/routes/Register.tsx` — aynı değişiklikler

**#067 — Accessibility:**
- `src/components/layout/Layout.tsx` — skip-to-content link, main id eklendi
- `src/components/ui/Marquee.tsx` — motion-reduce:[animation:none] eklendi
- `src/components/home/Hero.tsx` — avatar grubuna aria-hidden="true"
- `src/components/layout/Navbar.tsx` — NavLink + aria-current, mobil menü de NavLink

**#068 — Image Optimizasyonu:**
- `src/components/home/Hero.tsx` — hero eager+fetchPriority, avatar lazy, logo lazy
- `src/routes/Courses.tsx` — thumbnail lazy + group-hover:scale-105
- `src/routes/CourseDetail.tsx` — thumbnail eager
- `src/components/layout/Navbar.tsx` — dropdown thumb lazy

---

## [#068] Manager → Coder | 2026-05-23 00:15 | status: done

**Brief — Polish Sprint D (Performance & Images):** Image optimizasyonu — lazy loading, dimensions (CLS önleme), async decoding. 4 dosya.

### 1. `src/components/home/Hero.tsx`

A) Sol görsel `<img>`:
```tsx
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
```
(Hero görseli "above the fold" — eager + high priority.)

B) Avatar `<img>`'ler (4 adet) — `width={48} height={48} loading="lazy" decoding="async"` ekle.

C) Tech logo `<img>`'ler (marquee) — `width={64} height={64} loading="lazy" decoding="async"` ekle.

### 2. `src/routes/Courses.tsx`

Kurs kartı thumbnail `<img>`:
```tsx
<img
  src={course.thumbnail_url}
  alt={course.title}
  width={600}
  height={400}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
/>
```
(Bonus: hover'da hafif zoom — kartın `group` class'ı Sprint A'da eklendi.)

### 3. `src/routes/CourseDetail.tsx`

Detay sayfası thumbnail `<img>` — `width={1200} height={800} loading="eager" decoding="async"` ekle.

### 4. `src/components/layout/Navbar.tsx`

Dropdown'daki öne çıkan kurs thumb'leri — `width={80} height={48} loading="lazy" decoding="async"` ekle.

**Notlar:**
- `width`/`height` browser'a yer ayırtır → CLS önlenir
- `loading="lazy"` viewport dışındakileri erteler (LCP iyileşir)
- `loading="eager"` + `fetchPriority="high"` sadece above-the-fold (Hero)
- `decoding="async"` paint blocking azaltır

**Çıktı:** Hangi 4 dosyada değişiklik yaptığını listele.

---

## [#067] Manager → Coder | 2026-05-23 00:10 | status: done

**Brief — Polish Sprint C (Accessibility):** Skip-to-content, reduced motion, focus, aria-current. 4 dosya.

### 1. `src/components/layout/Layout.tsx` — Skip-to-content link

`<Navbar />`'ın ÖNÜNE skip link ekle, `<main>`'e `id="main-content"`:
```tsx
return (
  <div className="min-h-screen flex flex-col">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:font-semibold"
    >
      İçeriğe geç
    </a>
    <Navbar />
    <main id="main-content" className="flex-1">
      <Outlet />
    </main>
    {!hideFooter && <Footer />}
  </div>
)
```

### 2. `src/components/ui/Marquee.tsx` — prefers-reduced-motion

Animasyon class'ına `motion-reduce:[animation:none]` ekle:
```tsx
'flex shrink-0 items-center gap-2 [animation:marquee_var(--duration)_linear_infinite] motion-reduce:[animation:none]',
```

### 3. `src/components/home/Hero.tsx` — Avatar grubuna aria-hidden

```tsx
<div className="flex -space-x-3" aria-hidden="true">
```

(Ekran okuyucu "10,000+ Mutlu öğrenci" zaten diyor, avatar grubu dekoratif.)

### 4. `src/components/layout/Navbar.tsx` — NavLink + aria-current

`react-router-dom` import'una `NavLink` ekle:
```tsx
import { Link, NavLink, useNavigate } from 'react-router-dom'
```

Statik desktop linkler (Hakkımızda, İletişim) ve mobile menü içindeki tüm Link'ler (Kurslar, Hakkımızda, İletişim, Sepet) — `NavLink`'e çevir, isActive ile aktif stil:

```tsx
<NavLink
  to="/about"
  className={({ isActive }) =>
    cn(
      'rounded-md px-4 py-2 text-base font-medium hover:bg-gray-100',
      isActive && 'bg-gray-100 text-gray-900',
    )
  }
>
  Hakkımızda
</NavLink>
```

(NavLink otomatik `aria-current="page"` ekler aktif sayfa için.)

**Çıktı:** Hangi 4 dosyada değişiklik yaptığını listele.

---

## [#066] Manager → Coder | 2026-05-23 00:05 | status: done

**Brief — Polish Sprint B (Form Polish):** Login + Register sayfalarında autocomplete, focus consistency, loading spinner, error styling. 2 dosya.

### 1. `src/routes/Login.tsx`

A) Email input'una `autoComplete="email"` ekle.
B) Password input'una `autoComplete="current-password"` ekle.

C) Submit button'unu Button component'ine çevir:
```tsx
import { Button } from '../components/ui/Button'
import { Loader2, AlertCircle } from 'lucide-react'

<Button type="submit" disabled={submitting} className="w-full">
  {submitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Giriş yapılıyor...
    </>
  ) : (
    'Giriş Yap'
  )}
</Button>
```

D) Error state'i kart şeklinde:
```tsx
{error && (
  <div className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
    <p aria-live="polite">{error}</p>
  </div>
)}
```

E) Tüm input'larda focus ring brand-500'e çevir:
```tsx
className="border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
```

### 2. `src/routes/Register.tsx`

Aynı değişiklikler:
- full_name input: `autoComplete="name"`
- email input: `autoComplete="email"`
- password input: `autoComplete="new-password"` (kayıtta NEW password)
- Submit button → Button component + Loader2 spinner ("Kaydediliyor..." metnini koru)
- Error state → AlertCircle ile kart
- Focus ring → brand-500

**Çıktı:** Hangi 2 dosyada değişiklik yaptığını listele.

---

## [#065] Coder → Manager | 2026-05-22 23:57 | status: done
✓ 3 dosya güncellendi:
- `src/components/ui/Button.tsx` — base class yenilendi (rounded-md, font-semibold, active:scale, cursor-pointer)
- `src/routes/Courses.tsx` — kurs kartı hover/active/focus class'ları eklendi
- `src/components/home/Hero.tsx` — marquee logo div'ine cursor-default + select-none eklendi

---

## [#064] Manager → Coder | 2026-05-22 23:55 | status: done

**Brief — Polish Sprint A (Interactive States):** Button + Course Card + Marquee hover/active/cursor düzenlemeleri. 3 dosya.

### 1. `src/components/ui/Button.tsx` — base class güncelle

Mevcut:
```tsx
'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none'
```

Yeni:
```tsx
'inline-flex items-center justify-center whitespace-nowrap rounded-md font-semibold cursor-pointer transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'
```

Değişiklikler:
- `rounded-lg` → `rounded-md`
- `font-medium` → `font-semibold`
- `transition-colors` → `transition-all duration-150` (active scale geçişi için)
- EKLE: `cursor-pointer`, `active:scale-[0.98]` (tıklama feedback'i), `disabled:cursor-not-allowed`

### 2. `src/routes/Courses.tsx` — Kurs kartı className güncelle

Kurs kartı `<Link>` className'inde:

Mevcut:
```tsx
className="border rounded-lg overflow-hidden hover:shadow-md transition"
```

Yeni:
```tsx
className="group border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
```

Değişiklikler:
- Hover'da hafif yukarı kalkma + büyük shadow
- Active state (tıklama)
- Focus ring (klavye erişimi)
- `group` class (içerideki img'a opsiyonel `group-hover:scale-105` eklenebilir, opsiyonel)

### 3. `src/components/home/Hero.tsx` — Marquee logoları üzerine gelince cursor değişmesin (dekoratif, link değil)

Marquee içindeki logo div'inde:
```tsx
<div key={logo.name} className="flex items-center gap-3 px-4">
```

Şuna güncelle (cursor default — clickable hissi vermesin):
```tsx
<div key={logo.name} className="flex items-center gap-3 px-4 cursor-default select-none">
```

Eklendi: `cursor-default` (clickable izlenimi vermez) + `select-none` (akarken metin seçilmez).

**Çıktı:** 3 dosya güncellendi de.

---

## [#063] Coder → Manager | 2026-05-22 23:46 | status: done
✓ `src/components/ui/navigation-menu.tsx` güncellendi — kapanış animasyon class'ları kaldırıldı, açılış animasyonu korundu.

---

## [#062] Manager → Coder | 2026-05-22 23:45 | status: done

**Brief:** `src/components/ui/navigation-menu.tsx` — Dropdown açılırken animasyonlu kalsın, kapanırken anında kapansın (animasyon yok). 2 yerde değişiklik.

### 1. NavigationMenuContent className

Mevcut (#058 ile eklendi):
```tsx
'duration-100 left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
```

Yeni (`to-` motion class'larını sil — kapanış animasyonu kaldırıldı):
```tsx
'duration-100 left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 md:absolute md:w-auto',
```

Silinen: `data-[motion^=to-]:animate-out`, `data-[motion^=to-]:fade-out`, `data-[motion=to-end]:slide-out-to-right-52`, `data-[motion=to-start]:slide-out-to-left-52`.

### 2. NavigationMenuViewport className

Mevcut:
```tsx
'origin-top-center duration-100 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
```

Yeni (`state=closed` animasyonları silindi):
```tsx
'origin-top-center duration-100 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
```

Silinen: `data-[state=closed]:animate-out`, `data-[state=closed]:zoom-out-95`.

**Çıktı:** Dosya güncellendi de.

---

## [#061] Coder → Manager | 2026-05-22 23:41 | status: done
✓ `src/components/layout/Navbar.tsx` güncellendi — `border-b border-transparent` kaldırıldı, sadece scroll'da `border-b border-gray-200` görünüyor.

---

## [#060] Manager → Coder | 2026-05-22 23:40 | status: done

**Brief:** `src/components/layout/Navbar.tsx` — Navbar'daki sürekli 1px `border-transparent` Hero ile çakışıyor, 1px overflow yaratıyor (scrollbar tetikliyor). Border'ı sadece scroll'da göster.

Mevcut header:
```tsx
<header
  className={cn(
    'sticky top-0 z-50 w-full border-b border-transparent transition-colors',
    scrolled && 'bg-white/95 supports-[backdrop-filter]:bg-white/70 border-gray-200 backdrop-blur-lg',
  )}
>
```

Yeni:
```tsx
<header
  className={cn(
    'sticky top-0 z-50 w-full transition-colors',
    scrolled && 'bg-white/95 supports-[backdrop-filter]:bg-white/70 border-b border-gray-200 backdrop-blur-lg',
  )}
>
```

Değişiklik: `border-b border-transparent` ana className'den ÇIKARILDI. Scrolled className'ine `border-b` EKLENDİ.

Mantık:
- Sayfa üstündeyken (Hero görünür): border yok, navbar tam 64px → Hero'nun `calc(100vh-64px)` hesabıyla uyumlu, scrollbar tetiklenmez
- Scroll olunca: border görünür (toplam 65px) ama o anda Hero zaten yukarı kaymış, fark edilmez

**Çıktı:** Dosya güncellendi de.

---

## [#059] Coder → Manager | 2026-05-22 23:31 | status: done
✓ `src/components/ui/navigation-menu.tsx` güncellendi — Content ve Viewport className'lerine `duration-100` eklendi.

---

## [#058] Manager → Coder | 2026-05-22 23:30 | status: done

**Brief:** `src/components/ui/navigation-menu.tsx` — Dropdown'un kapanış animasyonunu da hızlandır. Açılış+kapanış animasyon süresini 100ms yap.

İki yerde `duration-100` ekle:

### 1. NavigationMenuContent className'inde

Mevcut:
```tsx
'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
```

Başına `duration-100` ekle:
```tsx
'duration-100 left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
```

### 2. NavigationMenuViewport className'inde

Mevcut:
```tsx
'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
```

Başına `duration-100` ekle:
```tsx
'origin-top-center duration-100 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
```

**Çıktı:** Dosya güncellendi de.

---

## [#057] Coder → Manager | 2026-05-22 23:26 | status: done
✓ `src/components/ui/navigation-menu.tsx` güncellendi — Root'a `delayDuration={0}` ve `skipDelayDuration={0}` eklendi.

---

## [#056] Manager → Coder | 2026-05-22 23:25 | status: done

**Brief:** `src/components/ui/navigation-menu.tsx` — NavigationMenu Root'a `delayDuration={0}` ekle. Hover'da dropdown anında açılsın.

Mevcut NavigationMenu component'inde Root'a `delayDuration={0}` ve `skipDelayDuration={0}` prop'larını ekle:

```tsx
const NavigationMenu = forwardRef<...>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    delayDuration={0}
    skipDelayDuration={0}
    className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
```

Sadece `delayDuration={0}` ve `skipDelayDuration={0}` satırlarını ekle, geri kalanına dokunma.

**Çıktı:** Dosya güncellendi de.

---

## [#055] Coder → Manager | 2026-05-22 23:21 | status: done
✓ `src/index.css` güncellendi — `html` bloğuna `scrollbar-gutter: stable` eklendi.

---

## [#054] Manager → Coder | 2026-05-22 23:20 | status: done

**Brief:** `src/index.css` — `html` selector'üne `scrollbar-gutter: stable` ekle. Scrollbar var/yok durumunda sayfa kayma sorununu çözer.

Mevcut `html` bloğunda (önceki brief'le eklendi):
```css
html {
  scrollbar-width: thin;
  scrollbar-color: var(--color-brand-400) transparent;
}
```

Şuna güncelle:
```css
html {
  scrollbar-width: thin;
  scrollbar-color: var(--color-brand-400) transparent;
  scrollbar-gutter: stable;
}
```

Tek satır eklendi: `scrollbar-gutter: stable`. Bu CSS özelliği scrollbar olmasa bile yerini ayırır — sayfalar arası geçişte yatay kayma olmaz.

**Çıktı:** Dosya güncellendi de.

---

## [#053] Coder → Manager | 2026-05-22 23:16 | status: done
✓ `src/index.css` güncellendi — webkit scrollbar + Firefox `scrollbar-width/color` eklendi.

---

## [#052] Manager → Coder | 2026-05-22 23:15 | status: done

**Brief:** `src/index.css` — Scrollbar'ı brand teal tema ile uyumlu yap. Tek dosya.

Mevcut CSS'in en altına ekle (mevcut `@theme`, `@import`, `@keyframes` blokları korunsun):

```css
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--color-brand-300);
  border-radius: 9999px;
  border: 2px solid white;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-500);
}

html {
  scrollbar-width: thin;
  scrollbar-color: var(--color-brand-400) transparent;
}
```

**Notlar:**
- Webkit (Chrome/Edge/Safari) için `::-webkit-scrollbar` selector'leri
- Firefox için `scrollbar-width` + `scrollbar-color`
- Thumb beyaz border ile inset görünüm
- Renkler `@theme` token'larından (`brand-300` / `brand-500`)

**Çıktı:** Dosya güncellendi de.

---

## [#051] Coder → Manager | 2026-05-22 23:06 | status: done
✓ `src/components/layout/Layout.tsx` güncellendi — `useLocation` ile `/` path'inde Footer gizleniyor.

---

## [#050] Manager → Coder | 2026-05-22 23:05 | status: done

**Brief:** `src/components/layout/Layout.tsx` — Ana sayfada (`/`) Footer'ı gizle. Tek dosya.

`useLocation` ile pathname kontrol et, `/` ise Footer render etme.

```tsx
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const location = useLocation()
  const hideFooter = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}
```

Mevcut Layout dosyasının import ve export adlarına uygun uyarla — eğer mevcut import yolları farklıysa onları koru. Sadece `useLocation` import'unu ekle, koşullu render uygula.

**Çıktı:** Dosya güncellendi de.

---

## [#049] Coder → Manager | 2026-05-22 23:01 | status: done
✓ `src/routes/Home.tsx` güncellendi — login kullanıcı `/courses`'a yönlendiriliyor, yükleme sırasında `null` döner.

---

## [#048] Manager → Coder | 2026-05-22 23:00 | status: done

**Brief:** `src/routes/Home.tsx` — Login olmuş kullanıcıyı `/courses`'a otomatik yönlendir. Tek dosya.

**Mantık:**
- `useAuth()` ile `user` ve `loading` al
- `loading` ise hiçbir şey gösterme (boş)
- `user` varsa → `<Navigate to="/courses" replace />`
- Yoksa → mevcut Hero göster

```tsx
import { Navigate } from 'react-router-dom'
import { Hero } from '../components/home/Hero'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/courses" replace />

  return <Hero />
}
```

**Çıktı:** Dosya güncellendi de.

---

## [#047] Coder → Manager | 2026-05-22 22:52 | status: done
✓ 2 dosya güncellendi:
- `src/components/layout/Navbar.tsx` — `h-24`→`h-16`, `top-24`→`top-16`, logo `text-2xl`, tüm metinler `text-base`, butonlar `size="md"`
- `src/components/ui/navigation-menu.tsx` — trigger `h-9`→`h-10`, `text-sm`→`text-base`

---

## [#046] Manager → Coder | 2026-05-22 22:50 | status: done

**Brief:** Navbar yüksekliğini eski haline döndür + metinleri büyüt. 2 dosya.

### 1. `src/components/layout/Navbar.tsx`

A) Navbar yüksekliğini geri al:
- `h-24` → `h-16`
- `top-24` → `top-16`

B) Metinleri büyüt:
- Logo: `text-xl` → `text-2xl`
- Statik linkler "Hakkımızda" / "İletişim" className'lerinde: `text-sm font-medium` → `text-base font-medium`
- Username gösterimi: `text-sm text-gray-700` → `text-base text-gray-700`
- Mobile menü linkleri: `text-sm font-medium` → `text-base font-medium`
- Auth butonları: `size="sm"` → `size="md"`

### 2. `src/components/ui/navigation-menu.tsx`

`navigationMenuTriggerStyle` cva'sında:
- `text-sm font-medium` → `text-base font-medium`
- `h-9` → `h-10` (text büyüyünce trigger da biraz büyüsün)

**Çıktı:** İki dosya güncellendi de.

---

## [#045] Coder → Manager | 2026-05-22 22:46 | status: done
✓ `src/components/layout/Navbar.tsx` güncellendi — `h-16` → `h-24`, `top-16` → `top-24`.

---

## [#044] Manager → Coder | 2026-05-22 22:45 | status: done

**Brief:** `src/components/layout/Navbar.tsx` — Navbar yüksekliği 1.5 katı (`h-16` → `h-24`). Mobile overlay'in top değeri de buna uyacak.

**Yapılacaklar:**

1. `<nav className="mx-auto flex h-16 ...">` → `h-16` yerine `h-24`:
```tsx
<nav className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between px-4">
```

2. Mobile overlay'de `top-16` → `top-24`:
```tsx
<div className="fixed inset-x-0 top-24 bottom-0 z-40 ...">
```

**Çıktı:** Dosya güncellendi de.

---

## [#043] Coder → Manager | 2026-05-22 22:41 | status: done
✓ `src/components/home/Hero.tsx` güncellendi — `<Marquee duration="30s" pauseOnHover={false}>`.

---

## [#042] Manager → Coder | 2026-05-22 22:40 | status: done

**Brief:** `src/components/home/Hero.tsx` — Marquee mouse hover'da durmasın. Tek satır.

Mevcut:
```tsx
<Marquee duration="30s">
```

Yeni:
```tsx
<Marquee duration="30s" pauseOnHover={false}>
```

**Çıktı:** Dosya güncellendi de.

---

## [#041] Coder → Manager | 2026-05-22 22:35 | status: done
✓ 5 dosya oluşturuldu/güncellendi:

**Güncellendi:**
- `src/index.css` — `@import "tw-animate-css"` eklendi
- `src/components/layout/Navbar.tsx` — tamamen yeniden yazıldı

**Yeni:**
- `src/hooks/useScroll.ts` — scroll threshold hook
- `src/components/ui/menu-toggle-icon.tsx` — animasyonlu hamburger ikonu
- `src/components/ui/navigation-menu.tsx` — Radix NavigationMenu wrapper

---

## [#040] Manager → Coder | 2026-05-22 22:30 | status: done

**Brief:** Faz 2.5 — Navbar redesign (21st.dev header-3'ten uyarlama). Sticky + scroll backdrop, Radix dropdown, mobile hamburger.

**Bağlam:**
- Paketler kuruldu: `@radix-ui/react-navigation-menu`, `@radix-ui/react-slot`, `@radix-ui/react-icons`, `tw-animate-css`
- Vite + React + Tailwind 4 (Next.js DEĞİL — `<Link>` react-router-dom'dan, `'use client'` yok)
- Mevcut auth logic (`useAuth` hook'undan `user`, `profile`, `signOut`) korunmalı
- DB'den kategori ve son 2 kursu fetch edeceğiz (`useCategories`, `useCourses`)

---

### Yapılacaklar (5 dosya):

### 1. `src/index.css` — TW animate import ekle
Mevcut `@import "tailwindcss";` satırının ALTINA ekle:
```css
@import "tw-animate-css";
```

### 2. `src/hooks/useScroll.ts` (yeni)
```ts
import { useCallback, useEffect, useState } from 'react'

export function useScroll(threshold: number) {
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return scrolled
}
```

### 3. `src/components/ui/menu-toggle-icon.tsx` (yeni)
21st.dev'in animasyonlu hamburger ikonu, aynen kopyala (sadece `'use client'` satırını ÇIKAR, Vite'da gerekmez):

```tsx
import type { ComponentProps } from 'react'
import { cn } from '../../lib/utils'

type MenuToggleProps = ComponentProps<'svg'> & {
  open: boolean
  duration?: number
}

export function MenuToggleIcon({
  open,
  className,
  fill = 'none',
  stroke = 'currentColor',
  strokeWidth = 2.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  duration = 500,
  ...props
}: MenuToggleProps) {
  return (
    <svg
      strokeWidth={strokeWidth}
      fill={fill}
      stroke={stroke}
      viewBox="0 0 32 32"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={cn('transition-transform ease-in-out', open && '-rotate-45', className)}
      style={{ transitionDuration: `${duration}ms` }}
      {...props}
    >
      <path
        className={cn(
          'transition-all ease-in-out',
          open
            ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]'
            : '[stroke-dasharray:12_63]',
        )}
        style={{ transitionDuration: `${duration}ms` }}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  )
}
```

### 4. `src/components/ui/navigation-menu.tsx` (yeni)
Shadcn'in navigation-menu component'i (Vite uyarlamalı). Aynen kopyalanacak ama `@/lib/utils` → `../../lib/utils`, ve `bg-background`/`bg-popover` gibi shadcn tokenları → düz Tailwind class'lara çevrilecek:

```tsx
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { cva } from 'class-variance-authority'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '../../lib/utils'

const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.List>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('group flex flex-1 list-none items-center justify-center space-x-1', className)}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100 data-[state=open]:bg-gray-100',
)

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}{' '}
    <ChevronDownIcon
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto',
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <NavigationMenuPrimitive.Viewport
      className={cn(
        'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
}
```

### 5. `src/components/layout/Navbar.tsx` — Tamamen yeniden yaz

```tsx
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

const categoryIcons: Record<string, typeof Code> = {
  'web-gelistirme': Code,
  mobil: Smartphone,
  tasarim: Palette,
  'veri-bilimi': BarChart3,
}

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

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
        'sticky top-0 z-50 w-full border-b border-transparent transition-colors',
        scrolled && 'bg-white/95 supports-[backdrop-filter]:bg-white/70 border-gray-200 backdrop-blur-lg',
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        {/* Sol: logo + nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-gray-900">
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
                                    <span className="text-sm font-medium text-gray-900">{cat.name}</span>
                                    {cat.description && (
                                      <span className="text-xs text-gray-500">{cat.description}</span>
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
                                    className="h-12 w-20 rounded object-cover"
                                  />
                                )}
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-gray-900">{course.title}</span>
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
                    <Link to="/courses" className="text-sm font-medium text-brand-700 hover:text-brand-800">
                      Tüm Kursları Gör →
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Statik linkler */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100">
                    Hakkımızda
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/contact" className="rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-100">
                    İletişim
                  </Link>
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
          {!loading && (
            user ? (
              <>
                <span className="text-sm text-gray-700">{profile?.full_name || user.email}</span>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Çıkış
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Giriş</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Kayıt Ol</Button>
                </Link>
              </>
            )
          )}
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
      {open && createPortal(
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-4 overflow-y-auto border-t bg-white/95 p-4 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-2">
            <Link to="/courses" onClick={() => setOpen(false)} className="rounded-md p-3 text-sm font-medium hover:bg-gray-100">
              Kurslar
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-md p-3 text-sm font-medium hover:bg-gray-100">
              Hakkımızda
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-md p-3 text-sm font-medium hover:bg-gray-100">
              İletişim
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" /> Sepet
            </Link>
          </div>
          {!loading && (
            <div className="mt-auto flex flex-col gap-2">
              {user ? (
                <>
                  <p className="px-3 text-sm text-gray-700">{profile?.full_name || user.email}</p>
                  <Button variant="outline" onClick={handleSignOut}>Çıkış</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full">Giriş</Button>
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <Button variant="primary" className="w-full">Kayıt Ol</Button>
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
```

**Notlar:**
- `'use client'` YOK — Vite'da gereksiz
- `next/image` veya `next/link` YOK — `<img>` ve react-router-dom Link
- Mevcut `Navbar.tsx`'i tamamen değiştir (default export aynı kalır, Layout'tan import problemi olmaz)
- `useCourses().slice(0, 2)` ile öne çıkanlar (DB değişmiyor)
- `categoryIcons` map'i 4 kategori slug'ına ikon eşler, yoksa default Code
- "Tüm Kursları Gör →" linki `brand-700` rengiyle vurgulu
- Mobile overlay portal ile `document.body`'ye render edilir, scroll lock var

**Çıktı:** Hangi 5 dosyayı oluşturduğunu/güncellediğini listele.

---

## [#039] Manager → Coder | 2026-05-22 21:55 | status: cancelled

İptal edildi — kullanıcı vazgeçti, mevcut hali (`pb-6` mobile, `md:pb-8` desktop) korunsun. Dosyaya dokunma.

---

## [#038] Coder → Manager | 2026-05-22 21:52 | status: done
✓ `src/components/home/Hero.tsx` güncellendi — `pb-0` → `pb-6` (mobile), `md:pb-8` eklendi (desktop).

---

## [#037] Manager → Coder | 2026-05-22 21:50 | status: done

**Brief:** `src/components/home/Hero.tsx` — Sağ kolon alt padding'ini sıfırdan biraz aç. Tek değişiklik.

Sağ kolon div'i (mevcut):
```tsx
<div className="flex w-full flex-col px-6 pt-12 pb-0 md:col-span-6 md:px-10 md:pt-20">
```

Yeni:
```tsx
<div className="flex w-full flex-col px-6 pt-12 pb-6 md:col-span-6 md:px-10 md:pt-20 md:pb-8">
```

`pb-0` → `pb-6` (mobile), `md:pb-8` ekle (desktop).

**Çıktı:** Dosya güncellendi de.

---

## [#036] Coder → Manager | 2026-05-22 21:42 | status: done
✓ `src/components/home/Hero.tsx` güncellendi — `py-12` → `pt-12 pb-0`, `md:py-20` → `md:pt-20`. Marquee'nin `mt-12` class'ı korundu.

---

## [#035] Manager → Coder | 2026-05-22 21:40 | status: done

**Brief:** `src/components/home/Hero.tsx` — Sağ kolonun alt padding'ini sıfırla, marquee tam alta yapışsın. Tek değişiklik.

Sağ kolon div'i (mevcut):
```tsx
<div className="flex w-full flex-col px-6 py-12 md:col-span-6 md:px-10 md:py-20">
```

Yeni:
```tsx
<div className="flex w-full flex-col px-6 pt-12 pb-0 md:col-span-6 md:px-10 md:pt-20">
```

`py-12` → `pt-12 pb-0` (alt padding sıfır)
`md:py-20` → `md:pt-20` (sadece üst padding)

Bonus: Marquee div'inin `mt-12` class'ını koru (CTA ile marquee arası boşluk).

**Çıktı:** Dosya güncellendi de.

---

## [#034] Coder → Manager | 2026-05-22 21:33 | status: done
✓ 2 dosya güncellendi:
- `src/components/home/Hero.tsx` — sağ kolon `flex-col`, içerik `my-auto`, marquee dışa taşındı
- `src/components/ui/Marquee.tsx` — `gap-8` → `gap-2`

---

## [#033] Manager → Coder | 2026-05-22 21:30 | status: done

**Brief:** `src/components/home/Hero.tsx` — Marquee'yi sağ kolon altına yapıştır, logo araları azalt. Tek dosya, 3 küçük değişiklik.

**Değişiklik 1 — Sağ kolon yapısı:**

Şu satır:
```tsx
<div className="flex w-full items-center px-6 py-12 md:col-span-6 md:px-10 md:py-20">
  <div className="w-full max-w-2xl space-y-8">
```

Şöyle olsun:
```tsx
<div className="flex w-full flex-col px-6 py-12 md:col-span-6 md:px-10 md:py-20">
  <div className="my-auto w-full max-w-2xl space-y-8">
```

(`items-center` → `flex-col`, içerideki div'e `my-auto` ekledik. Bu, üstteki içeriği dikey ortalar, marquee'yi en alta iter.)

**Değişiklik 2 — Marquee div'i `space-y-8`'den ÇIKAR ve dışına taşı:**

Mevcut:
```tsx
            {/* CTA */}
            <div>
              <Link to="/courses" ...>
                ...
              </Link>
            </div>

            {/* Tech logos marquee */}
            <div className="relative -mx-6 pt-6 md:-mx-10">
              ...
            </div>
          </div>
        </div>
```

Şöyle olsun (marquee div'i `space-y-8`'in dışına çıkar, sağ kolonun en altına taşı):
```tsx
            {/* CTA */}
            <div>
              <Link to="/courses" ...>
                ...
              </Link>
            </div>
          </div>

          {/* Tech logos marquee — sağ kolon altında */}
          <div className="relative -mx-6 mt-12 md:-mx-10">
            <div className="pointer-events-none absolute left-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
            <Marquee duration="30s">
              {techLogos.map((logo) => (
                <div key={logo.name} className="flex items-center gap-3 px-4">
                  <img src={logo.url} alt={logo.name} className="h-16 w-16" />
                  <span className="text-xl font-semibold text-gray-800">{logo.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
```

**Değişiklik 3 — Marquee.tsx içindeki gap'ı azalt:**

`src/components/ui/Marquee.tsx`'te:
```tsx
'flex shrink-0 items-center gap-8 [animation:marquee_var(--duration)_linear_infinite]',
```

`gap-8` → `gap-2`.

**Özet:** Marquee artık sağ kolonun en altına yapışacak (mt-auto + ana içerik my-auto ile dikey ortalı), logo araları daraldı (`px-6 gap-3` → `px-3 gap-2`, marquee internal `gap-8` → `gap-2`).

**Çıktı:** İki dosya güncellendi de.

---

## [#032] Coder → Manager | 2026-05-22 21:22 | status: done
✓ `src/components/home/Hero.tsx` güncellendi.

---

## [#031] Manager → Coder | 2026-05-22 21:20 | status: done

**Brief:** `src/components/home/Hero.tsx` — Marquee'deki teknoloji logolarını güncelle. Tek dosya.

**Yapılacaklar:**

Marquee içindeki logo render bloğunu değiştir:

Mevcut:
```tsx
<Marquee duration="30s">
  {techLogos.map((logo) => (
    <div key={logo.name} className="flex items-center justify-center px-4">
      <img src={logo.url} alt={logo.name} className="h-8 w-8 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
    </div>
  ))}
</Marquee>
```

Yeni:
```tsx
<Marquee duration="30s">
  {techLogos.map((logo) => (
    <div key={logo.name} className="flex items-center gap-3 px-6">
      <img src={logo.url} alt={logo.name} className="h-12 w-12" />
      <span className="text-base font-medium text-gray-700">{logo.name}</span>
    </div>
  ))}
</Marquee>
```

Değişiklikler:
1. `h-8 w-8` → `h-12 w-12` (daha büyük)
2. `opacity-60 grayscale` ve hover class'ları kaldırıldı → renkli kalır
3. Yanına logo adı eklendi (`<span>` ile)
4. `px-4` → `px-6` ve `gap-3` (logo + yazı arası boşluk)

**Çıktı:** Dosya güncellendi de.

---

## [#030] Coder → Manager | 2026-05-22 21:12 | status: done
✓ 6 dosya oluşturuldu/güncellendi:

**Yeni:**
- `src/lib/utils.ts` — `cn()` helper
- `src/components/ui/Button.tsx` — cva Button component
- `src/components/ui/Marquee.tsx` — CSS marquee component
- `src/components/home/Hero.tsx` — hero section

**Güncellendi:**
- `src/index.css` — `@theme` brand token'ları + `@keyframes marquee` eklendi
- `src/routes/Home.tsx` — Hero render edildi

---

## [#029] Manager → Coder | 2026-05-22 21:00 | status: done

**Brief:** Faz 2.5 başlangıç — Design foundation + Hero section (anasayfa).

**Bağlam:**
- Paketler kuruldu: `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`
- Theme: blue/teal palette, Inter font (zaten browser default sans-serif yakın, sonra Google Fonts'tan eklenebilir, şimdilik gerek yok)
- Vite + React 19 + Tailwind 4 (Next.js KULLANMIYORUZ — `next/image` yerine `<img>`, `next/link` yerine `react-router-dom`'dan `Link`)
- Bu hero 21st.dev'in "aero-hero-1" component'inden uyarlanıyor

**Yapılacaklar:**

### 1. `src/lib/utils.ts` (yeni)
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 2. `src/index.css` — Tailwind 4 theme tokenları ekle
Mevcut `@import "tailwindcss";` satırının ALTINA ekle:

```css
@theme {
  --color-brand-50: #f0fdfa;
  --color-brand-100: #ccfbf1;
  --color-brand-200: #99f6e4;
  --color-brand-300: #5eead4;
  --color-brand-400: #2dd4bf;
  --color-brand-500: #14b8a6;
  --color-brand-600: #0d9488;
  --color-brand-700: #0f766e;
  --color-brand-800: #115e59;
  --color-brand-900: #134e4a;
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap, 1rem))); }
}
```

### 3. `src/components/ui/Button.tsx` (yeni)
Basit reusable Button, cva ile variants. `@base-ui/react` KULLANMA, plain button yeter.

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-brand-600 text-white hover:bg-brand-700',
        secondary: 'bg-gray-900 text-white hover:bg-gray-800',
        outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
        ghost: 'text-gray-700 hover:bg-gray-100',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
)
Button.displayName = 'Button'
```

### 4. `src/components/ui/Marquee.tsx` (yeni)
CSS keyframe ile basit marquee. Duplicate içerik infinite loop için.

```tsx
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface MarqueeProps {
  children: ReactNode
  className?: string
  duration?: string
  pauseOnHover?: boolean
}

export function Marquee({ children, className, duration = '25s', pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn('group flex overflow-hidden gap-4', className)} style={{ ['--duration' as string]: duration }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 items-center gap-8 [animation:marquee_var(--duration)_linear_infinite]',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
```

### 5. `src/components/home/Hero.tsx` (yeni)

```tsx
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Marquee } from '../ui/Marquee'

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
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&auto=format"
            alt="Öğrenciler"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Sağ: içerik */}
        <div className="flex w-full items-center px-6 py-12 md:col-span-6 md:px-10 md:py-20">
          <div className="w-full max-w-2xl space-y-8">
            <div className="space-y-5">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Geleceğini bugünden inşa et
              </h1>
              <p className="text-base text-gray-600 md:text-lg">
                Yazılım, tasarım ve veri alanında uzmanlardan hazırlanmış kurslarla kariyerini bir üst seviyeye taşı.
                Kendi hızında öğren, ne zaman istersen tekrar izle.
              </p>
            </div>

            {/* Avatar grubu + stat */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
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
              <Link
                to="/courses"
                className="group inline-flex items-center gap-0"
              >
                <span className="rounded-l-full bg-brand-100 px-6 py-3 text-gray-900 font-medium transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-brand-100">
                  Kursları Görüntüle
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-r-full bg-brand-100 text-gray-900 transition-colors duration-300 group-hover:bg-gray-900 group-hover:text-brand-100">
                  <ArrowUpRight className="absolute h-5 w-5 -translate-x-12 transition-transform duration-300 group-hover:translate-x-0" />
                  <ArrowUpRight className="absolute h-5 w-5 transition-transform duration-300 group-hover:translate-x-12" />
                </span>
              </Link>
            </div>

            {/* Tech logos marquee */}
            <div className="relative -mx-6 pt-6 md:-mx-10">
              <div className="pointer-events-none absolute left-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
              <div className="pointer-events-none absolute right-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
              <Marquee duration="30s">
                {techLogos.map((logo) => (
                  <div key={logo.name} className="flex items-center justify-center px-4">
                    <img src={logo.url} alt={logo.name} className="h-8 w-8 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### 6. `src/routes/Home.tsx` — Mevcut h1'i kaldır, Hero'yu render et

```tsx
import { Hero } from '../components/home/Hero'

export default function Home() {
  return (
    <>
      <Hero />
    </>
  )
}
```

**Notlar:**
- `next/image` ve `next/link` KULLANMA — `<img>` ve `react-router-dom`'dan `Link`
- `@base-ui/react` KULLANMA — plain button + cva
- Marquee için iki kopya yan yana (seamless loop için)
- Devicon CDN'den teknoloji logoları
- Unsplash'tan avatar ve banner görseli
- Renkler: primary `brand-600` (teal), CTA `brand-100` (soft teal background)

**Çıktı:** Hangi 6 dosyayı oluşturduğun/güncellediğini listele.

---

## [#028] Coder → Manager | 2026-05-22 20:18 | status: done
✓ Yapılan değişiklikler:

**Silindi:**
- `src/routes/CategoryDetail.tsx`

**Güncellendi:**
- `src/routes/Categories.tsx` — `/courses`'a redirect
- `src/lib/queries/categories.ts` — `useCategory` silindi, `useCategories` kaldı
- `src/App.tsx` — `CategoryDetail` import ve route kaldırıldı
- `src/components/layout/Navbar.tsx` — "Kategoriler" linki kaldırıldı
- `src/routes/Courses.tsx` — sidebar kategori filtreli layout

---

## [#027] Manager → Coder | 2026-05-22 20:10 | status: done

**Brief:** Plan değişikliği — Ayrı `/categories` sayfası yerine `/courses` sayfasında **sidebar kategori filtresi**. #025'te yapılanların bir kısmı geri alınacak.

**Yapılacaklar:**

### 1. SİLİNECEK dosyalar:
- `src/routes/CategoryDetail.tsx` — sil

### 2. `src/routes/Categories.tsx` — Boşalt, sadece redirect:
```tsx
import { Navigate } from 'react-router-dom'

export default function Categories() {
  return <Navigate to="/courses" replace />
}
```

### 3. `src/App.tsx`:
- `<Route path="/categories/:slug" element={<CategoryDetail />} />` route'unu KALDIR
- `import CategoryDetail from './routes/CategoryDetail'` import'unu KALDIR
- `<Route path="/categories" element={<Categories />} />` KALSIN (redirect için)

### 4. `src/lib/queries/categories.ts`:
- `useCategory(slug)` fonksiyonunu SİL
- `useCategories()` KALSIN

### 5. `src/components/layout/Navbar.tsx`:
- "Kategoriler" linkini KALDIR. Yerine bir şey ekleme.

### 6. `src/routes/Courses.tsx` — Sidebar filtreli layout:

State:
```tsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCourses } from '../lib/queries/courses'
import { useCategories } from '../lib/queries/categories'

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

export default function Courses() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { data: categories } = useCategories()
  const { data: courses, isLoading, isError } = useCourses({
    search: search.trim() || undefined,
    categoryId: selectedCategory ?? undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <h2 className="font-semibold text-sm mb-3">Kategoriler</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  selectedCategory === null ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                Tümü
              </button>
            </li>
            {categories?.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedCategory === cat.id ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          <h1 className="text-2xl font-bold mb-6">Tüm Kurslar</h1>
          <input
            type="text"
            placeholder="Kurs ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border rounded px-3 py-2 text-sm mb-6 outline-none focus:ring-2 focus:ring-gray-900"
          />

          {isLoading && <div className="text-sm text-gray-500">Yükleniyor...</div>}
          {isError && <div className="text-sm text-red-600">Bir hata oluştu.</div>}
          {courses && courses.length === 0 && (
            <div className="text-sm text-gray-500">Sonuç bulunamadı.</div>
          )}
          {courses && courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  {course.thumbnail_url && (
                    <div className="aspect-video bg-gray-100">
                      <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    {course.category && (
                      <p className="text-xs text-gray-500">{course.category.name}</p>
                    )}
                    <h3 className="font-semibold mt-1">{course.title}</h3>
                    <p className="text-sm mt-2 font-medium">{formatPrice(course.price, course.currency)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
```

**Çıktı:** Hangi dosyaları sildiğini/güncellediğini listele.

---

## [#026] Coder → Manager | 2026-05-22 20:00 | status: done
✓ 6 dosya oluşturuldu/güncellendi:

**Yeni:**
- `src/lib/queries/categories.ts` — `useCategories`, `useCategory` hook'ları
- `src/routes/CategoryDetail.tsx` — kategori detay sayfası

**Güncellendi:**
- `src/lib/queries/courses.ts` — `useCourses` filtre desteği (`search`, `categoryId`)
- `src/routes/Categories.tsx` — kategori listesi
- `src/routes/Courses.tsx` — arama input'u eklendi
- `src/App.tsx` — `/categories/:slug` route eklendi

---

## [#025] Manager → Coder | 2026-05-22 19:50 | status: done

**Brief:** Faz 2.4 — Kategori sayfası + kategori detay (kursları listeleyen) + Courses sayfasında basit arama.

**Yapılacaklar:**

### 1. `src/lib/queries/categories.ts` (yeni)
```ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import type { Category } from '../../types/course'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('stoaedu_categories')
        .select('*')
        .order('name', { ascending: true })
      if (error) throw error
      return data as Category[]
    },
  })
}

export function useCategory(slug: string | undefined) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async (): Promise<Category | null> => {
      if (!slug) return null
      const { data, error } = await supabase
        .from('stoaedu_categories')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()
      if (error) throw error
      return data as Category | null
    },
    enabled: !!slug,
  })
}
```

### 2. `src/lib/queries/courses.ts` — `useCourses`'u GÜNCELLE: opsiyonel filtre kabul etsin

Mevcut `useCourses`'u şu hale getir:
```ts
interface CoursesFilter {
  search?: string
  categoryId?: string
}

export function useCourses(filter?: CoursesFilter) {
  return useQuery({
    queryKey: ['courses', filter],
    queryFn: async (): Promise<CourseWithCategory[]> => {
      let query = supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (filter?.search) {
        query = query.ilike('title', `%${filter.search}%`)
      }
      if (filter?.categoryId) {
        query = query.eq('category_id', filter.categoryId)
      }

      const { data, error } = await query
      if (error) throw error
      return data as CourseWithCategory[]
    },
  })
}
```

`useCourse(slug)` mevcut, dokunma.

### 3. `src/routes/Categories.tsx` — Kategori listesi (mevcut h1'i değiştir)

```tsx
import { Link } from 'react-router-dom'
import { useCategories } from '../lib/queries/categories'

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories()

  if (isLoading) return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  if (isError) return <div className="text-center py-12 text-sm text-red-600">Bir hata oluştu.</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kategoriler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories?.map((cat) => (
          <Link
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className="border rounded-lg p-6 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{cat.name}</h3>
            {cat.description && <p className="text-sm text-gray-500 mt-2">{cat.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
```

### 4. `src/routes/CategoryDetail.tsx` (yeni dosya)

Kategoriye ait kursları listeler. Courses.tsx'in card layout'unu tekrarlasın (kopyala-paste sorun değil, Faz 2.5'te component'e dönüştürürüz).

```tsx
import { useParams, Link } from 'react-router-dom'
import { useCategory } from '../lib/queries/categories'
import { useCourses } from '../lib/queries/courses'

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: category, isLoading: catLoading } = useCategory(slug)
  const { data: courses, isLoading: coursesLoading } = useCourses(
    category ? { categoryId: category.id } : undefined,
  )

  if (catLoading) return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  if (!category) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Kategori bulunamadı</h1>
        <Link to="/categories" className="text-sm underline">Tüm kategoriler</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/categories" className="text-xs text-gray-500 hover:text-gray-900">
        ← Kategoriler
      </Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">{category.name}</h1>

      {coursesLoading ? (
        <div className="text-sm text-gray-500">Yükleniyor...</div>
      ) : courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              {course.thumbnail_url && (
                <div className="aspect-video bg-gray-100">
                  <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm mt-2">{formatPrice(course.price, course.currency)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">Bu kategoride henüz kurs yok.</p>
      )}
    </div>
  )
}
```

### 5. `src/App.tsx` — `/categories/:slug` route ekle

`<Route path="/categories" element={<Categories />} />` satırının ALTINA ekle:
```tsx
<Route path="/categories/:slug" element={<CategoryDetail />} />
```

Import ekle:
```tsx
import CategoryDetail from './routes/CategoryDetail'
```

### 6. `src/routes/Courses.tsx` — Arama input'u ekle

Üste arama kutusu ekle:
```tsx
import { useState } from 'react'
// ...
const [search, setSearch] = useState('')
const { data: courses, isLoading, isError } = useCourses({ search: search.trim() || undefined })
```

Header altına:
```tsx
<input
  type="text"
  placeholder="Kurs ara..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full max-w-md border rounded px-3 py-2 text-sm mb-6 outline-none focus:ring-2 focus:ring-gray-900"
/>
```

**Çıktı:** Hangi dosyaları oluşturduğunu/güncellediğini listele.

---

## [#024] Coder → Manager | 2026-05-22 19:35 | status: done
✓ 2 dosya güncellendi:

- `src/lib/queries/courses.ts` — `useCourse(slug)` hook eklendi
- `src/routes/CourseDetail.tsx` — detay sayfası (loading/error/404 + 2 kolonlu layout)

---

## [#023] Manager → Coder | 2026-05-22 19:30 | status: done

**Brief:** Faz 2.3 — Kurs detay sayfası. `/courses/:slug` route'u dolduracağız.

**Yapılacaklar:**

### 1. `src/lib/queries/courses.ts` — `useCourse(slug)` hook'unu EKLE (mevcut `useCourses` korunsun)

```ts
export function useCourse(slug: string | undefined) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: async (): Promise<CourseWithCategory | null> => {
      if (!slug) return null
      const { data, error } = await supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()
      if (error) throw error
      return data as CourseWithCategory | null
    },
    enabled: !!slug,
  })
}
```

### 2. `src/routes/CourseDetail.tsx` — Detay sayfası (mevcut h1'i değiştir)

```tsx
import { useParams, Link } from 'react-router-dom'
import { useCourse } from '../lib/queries/courses'

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: course, isLoading, isError } = useCourse(slug)

  if (isLoading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (isError) {
    return <div className="text-center py-12 text-sm text-red-600">Bir hata oluştu.</div>
  }

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Kurs bulunamadı</h1>
        <p className="text-sm text-gray-500 mb-6">Aradığınız kurs mevcut değil.</p>
        <Link to="/courses" className="text-sm underline">Tüm kurslara dön</Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {course.thumbnail_url && (
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          {course.category && (
            <Link
              to={`/categories`}
              className="text-xs text-gray-500 hover:text-gray-900"
            >
              {course.category.name}
            </Link>
          )}
          <h1 className="text-3xl font-bold mt-2 mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{course.description}</p>
          <div className="text-2xl font-semibold mb-6">
            {formatPrice(course.price, course.currency)}
          </div>
          <button
            type="button"
            className="w-full bg-gray-900 text-white py-3 rounded text-sm font-medium hover:bg-gray-700"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}
```

**Notlar:**
- "Sepete Ekle" butonu şimdilik sadece UI — Faz 3'te bağlanacak
- Kategori linki şimdilik `/categories`'e gider (slug-bazlı kategori sayfası Faz 2.4'te)
- `maybeSingle()` kullan, kurs yoksa null döner (404 ekran)

**Çıktı:** Hangi dosyaları güncelledin/oluşturdun listele.

---

## [#022] Coder → Manager | 2026-05-22 19:10 | status: done
✓ 5 dosya oluşturuldu/güncellendi:

**Yeni:**
- `src/types/course.ts` — `Category`, `Course`, `CourseWithCategory` tipleri
- `src/lib/queryClient.ts` — `QueryClient` instance
- `src/lib/queries/courses.ts` — `useCourses` hook

**Güncellendi:**
- `src/main.tsx` — `<QueryClientProvider>` eklendi
- `src/routes/Courses.tsx` — grid liste, loading/error/empty state, para formatı

---

## [#021] Manager → Coder | 2026-05-22 19:00 | status: done

**Brief:** Faz 2.2 — TanStack Query setup + Kurs liste sayfası.

**Bağlam:**
- `@tanstack/react-query` zaten kuruldu
- DB tarafında `stoaedu_categories` ve `stoaedu_courses` tabloları seed data ile dolu
- RLS public select izin veriyor (`is_published = true` olanlar)

**Yapılacaklar:**

### 1. `src/types/course.ts` (yeni)
```ts
export interface Category {
  id: string
  slug: string
  name: string
  description: string | null
  created_at: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string | null
  thumbnail_url: string | null
  price: number
  currency: string
  category_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CourseWithCategory extends Course {
  category: Pick<Category, 'id' | 'slug' | 'name'> | null
}
```

### 2. `src/lib/queryClient.ts` (yeni)
```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})
```

### 3. `src/main.tsx` — QueryClientProvider ile sar
Mevcut yapıyı KORU. `<AuthProvider>`'in DIŞINA `<QueryClientProvider client={queryClient}>` ekle. Yani:
```tsx
<QueryClientProvider client={queryClient}>
  <AuthProvider>
    <App />
  </AuthProvider>
</QueryClientProvider>
```

### 4. `src/lib/queries/courses.ts` (yeni)
```ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import type { CourseWithCategory } from '../../types/course'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<CourseWithCategory[]> => {
      const { data, error } = await supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as CourseWithCategory[]
    },
  })
}
```

### 5. `src/routes/Courses.tsx` — Liste sayfası (mevcut h1'i değiştir)
- `useCourses()` ile veri çek
- Loading: "Yükleniyor..." (sade)
- Error: kırmızı mesaj
- Empty: "Henüz kurs eklenmemiş."
- Liste: grid (responsive: 1 / 2 / 3 / 4 kolon), her kursu Card olarak göster:
  - Thumbnail (16:9 oran, `object-cover`)
  - Title (font-semibold)
  - Kategori adı (text-xs, gray-500)
  - Fiyat (örn. "499,00 ₺", `Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })`)
  - Tüm kart `<Link to={`/courses/${slug}`}>` ile sarılı
- Container: `max-w-7xl mx-auto px-4 py-8`
- Header: "Tüm Kurslar" başlığı
- Tailwind ile sade kart: `border rounded-lg overflow-hidden hover:shadow-md transition`

**Notlar:**
- Para formatı için `Intl.NumberFormat`, paket kurma
- Empty/error/loading state'leri SADE, Faz 2.5'te cilalanacak
- TS strict, tipler `types/course.ts`'ten import

**Çıktı:** Hangi dosyaları oluşturduğun/değiştirdiğini listele.

---

## [#020] Coder → Manager | 2026-05-22 18:05 | status: done
✓ 3 dosya oluşturuldu/güncellendi:

**Yeni:**
- `src/components/guards/ProtectedRoute.tsx`
- `src/components/guards/RedirectIfAuthenticated.tsx`

**Güncellendi:**
- `src/App.tsx` — guard'lar route yapısına eklendi

---

## [#019] Manager → Coder | 2026-05-22 18:00 | status: done

**Brief:** Faz 1.4 — ProtectedRoute + RedirectIfAuthenticated guard'ları + App.tsx'te uygula.

**Bağlam:**
- `useAuth()` hook'unda `user`, `profile`, `loading` var
- `loading: true` ise auth durumu daha bilinmiyor → bekleme göster
- `user: null` ise login yok
- `profile.role` ile rol kontrolü yapılır

**Yapılacaklar:**

### 1. `src/components/guards/ProtectedRoute.tsx` (yeni)

Login gerektiren route'ları sarar. Opsiyonel `requireRole` prop'u ile rol kontrolü.

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import type { Role } from '../../types/profile'

interface Props {
  requireRole?: Role
}

export default function ProtectedRoute({ requireRole }: Props) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireRole && profile?.role !== requireRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
```

### 2. `src/components/guards/RedirectIfAuthenticated.tsx` (yeni)

Login olanları login/register sayfalarından `/`'a yönlendirir.

```tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RedirectIfAuthenticated() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
```

### 3. `src/App.tsx` — Route'ları guard'larla sar

Mevcut route yapısını şöyle güncelle (Layout içinde):

```tsx
<Route element={<Layout />}>
  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/courses" element={<Courses />} />
  <Route path="/courses/:slug" element={<CourseDetail />} />
  <Route path="/categories" element={<Categories />} />
  <Route path="/cart" element={<Cart />} />

  {/* Auth gerektirmiyor ama login varsa anasayfaya yönlenir */}
  <Route element={<RedirectIfAuthenticated />}>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>

  {/* Login gerekir */}
  <Route element={<ProtectedRoute />}>
    <Route path="/checkout" element={<Checkout />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Route>
```

İmport ekle:
```tsx
import ProtectedRoute from './components/guards/ProtectedRoute'
import RedirectIfAuthenticated from './components/guards/RedirectIfAuthenticated'
```

**Çıktı:** Hangi dosyaları oluşturduğun/güncellediğini listele.

---

## [#018] Coder → Manager | 2026-05-22 17:32 | status: done
✓ `src/contexts/AuthContext.tsx` güncellendi — `onAuthStateChange` callback `async` kaldırıldı, `await` yerine `.then(setProfile)` kullanıldı.

---

## [#017] Manager → Coder | 2026-05-22 17:30 | status: done

**Brief:** `AuthContext.tsx` deadlock fix. Supabase JS'in bilinen bug'ı — `onAuthStateChange` callback'i içinde `await supabase.from(...)` çağrılırsa auth lock release olmadığı için deadlock yapıyor, profile fetch hiç başlamıyor.

**Bağlam:**
- Şu an register başarılı (DB'ye user ekleniyor, signup 200 dönüyor)
- Ama frontend "Kaydediliyor..." state'inde takılıyor
- Network'te `stoaedu_profiles` GET hiç başlamıyor (deadlock)

**Yapılacak (tek dosya):**

**`src/contexts/AuthContext.tsx`** — `onAuthStateChange` callback'ini SYNC yap, fetchProfile'ı `.then()` ile defer et. Sadece o callback'i değiştir, başka yere dokunma.

Mevcut hatalı kısım (satır 41-48):
```ts
const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
  setUser(session?.user ?? null)
  if (session?.user) {
    setProfile(await fetchProfile(session.user.id))
  } else {
    setProfile(null)
  }
})
```

Yeni hali:
```ts
const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user ?? null)
  if (session?.user) {
    fetchProfile(session.user.id).then(setProfile)
  } else {
    setProfile(null)
  }
})
```

Değişiklikler:
1. `async` kaldırıldı
2. `await` yerine `.then(setProfile)` kullanıldı

**Not:** `getSession()` blokundaki (satır 33-39) await'lerin sorun değil, orası mount'ta bir kere çalışıyor. Sadece `onAuthStateChange` callback'i sync olmalı.

**Çıktı:** Dosya güncellendi de.

---

## [#016] Coder → Manager | 2026-05-22 17:10 | status: done
✓ 6 dosya oluşturuldu/güncellendi:

**Yeni:**
- `src/types/profile.ts` — `Role`, `Profile` tipleri
- `src/contexts/AuthContext.tsx` — `AuthProvider`, `useAuth` hook

**Güncellendi:**
- `src/main.tsx` — `<AuthProvider>` ile App sarıldı
- `src/routes/Register.tsx` — form + signUp + yönlendirme
- `src/routes/Login.tsx` — form + signIn + yönlendirme
- `src/components/layout/Navbar.tsx` — conditional auth UI

---

## [#015] Manager → Coder | 2026-05-22 17:00 | status: done

**Brief:** Faz 1.1 — Auth UI (Register / Login / Logout) + Auth Context. Supabase client zaten kurulu (`src/lib/supabase.ts`).

**Bağlam:**
- DB tarafında `stoaedu_profiles` tablosu + app-aware trigger zaten var
- Kayıt sırasında `raw_user_meta_data`'ya `app: 'stoaedu'` koyacağız ki trigger doğru tabloya yazsın
- 3 rol var: `visitor` (login yok), `student` (default), `admin`. Frontend'de `role` field'ı `stoaedu_profiles`'tan okunur.
- Tasarım sade tut — Tailwind ile minimal stil. Detay tasarım Faz 2.5'te.

---

**Yapılacaklar:**

### 1. `src/types/profile.ts` (yeni)
```ts
export type Role = 'student' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: Role
  created_at: string
  updated_at: string
}
```

### 2. `src/contexts/AuthContext.tsx` (yeni)
- `User` ve `Profile` state'i tut
- Mount'ta `supabase.auth.getSession()` ile mevcut session'ı çek
- `supabase.auth.onAuthStateChange` ile değişiklikleri dinle
- User varsa `stoaedu_profiles`'tan profili çek
- Export: `useAuth()` hook ile `{ user, profile, loading, signUp, signIn, signOut }` döner

Önemli: `signUp` fonksiyonu metadata'ya `app: 'stoaedu'` ve `full_name` koyar:
```ts
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: { data: { app: 'stoaedu', full_name: fullName } }
})
```

### 3. `src/main.tsx` — `<AuthProvider>` ile App'i sar
Mevcut yapıyı koru, sadece `<App />`'i `<AuthProvider>` ile sar.

### 4. `src/routes/Register.tsx` — Mevcut h1'i değiştir, form ekle
- Field'lar: full_name, email, password (min 6 karakter)
- Submit → `signUp()` çağır
- Başarılı → `/courses`'a yönlendir
- Hata → form altında kırmızı mesaj
- Tailwind: max-w-md, mx-auto, my-12, basit input/button stilleri

### 5. `src/routes/Login.tsx` — Aynı şekilde
- Field'lar: email, password
- Submit → `signIn()` çağır
- Başarılı → `/courses`'a yönlendir
- Hata gösterimi aynı

### 6. `src/components/layout/Navbar.tsx` — Conditional UI
- `useAuth()` kullan
- Login değilse: mevcut "Giriş" / "Kayıt Ol" linkleri görünür
- Login ise: kullanıcının email/ad'ı görünür + "Çıkış" butonu (signOut çağırır + `/`'a yönlendirir)
- `loading` durumunda butonları gösterme (boş bırak)

---

**Notlar:**
- Form state için ek paket KURMA, basit `useState` yeterli
- Email doğrulama Supabase tarafında zaten var, email confirmation kapalı varsayalım (Studio'da Auth settings)
- `react-router-dom`'dan `useNavigate` kullan yönlendirme için
- Component tipleri `Profile`, `Role` `types/profile.ts`'ten import edilsin
- Server-side error mesajlarını olduğu gibi göster (Supabase Türkçe değil, sorun değil şu an)

**Çıktı:** Hangi dosyaları oluşturduğun/değiştirdiğini listele.

---

## [#014] Coder → Manager | 2026-05-22 16:22 | status: done
✓ `nixpacks.toml` oluşturuldu.

---

## [#013] Manager → Coder | 2026-05-22 16:20 | status: done

**Brief:** Coolify/Nixpacks `npm ci` → `npm install` override. Tek dosya.

**Bağlam:** Coolify "Static" modunda altta Nixpacks kullanıyor ve default `npm ci` çalıştırıyor. Vite 8 Rolldown native binding'i lockfile bug'ı yüzünden Linux'ta `npm ci` ile kurulmuyor. `npm install` ile çözülüyor.

**Yapılacaklar:**

1. Proje kökünde **`nixpacks.toml`** oluştur, içerik:
   ```toml
   [phases.install]
   cmds = ['npm install']
   ```

**Çıktı:** Dosya oluşturuldu de, başka bir şey yazma.

---

## [#012] Coder → Manager | 2026-05-22 16:05 | status: done
✓ 2 dosyaya dokunuldu:
- `package.json` — `engines.node: ">=22.12.0"` eklendi
- `.nvmrc` — oluşturuldu (`22.12.0`)

---

## [#011] Manager → Coder | 2026-05-22 16:00 | status: done

**Brief:** Coolify deploy hatası fix'i. Node version mismatch + Rolldown linux binding eksik. 2 dosyaya dokun.

**Bağlam:** Vite 8 Rolldown native binding kullanıyor. Windows'ta oluşturulan `package-lock.json`'a Linux binding kaydedilmemiş (npm bug). Coolify `npm ci` çalıştırınca Linux binding'ini bulamıyor. Ayrıca container'da Node 22.11 var, Vite 22.12+ istiyor.

**Coolify install command kullanıcı tarafından `npm install`'e değiştirilecek** (panelde), sen kod tarafını hallet.

**Yapılacaklar:**

1. **`package.json`** — root seviyede `engines` field ekle (mevcut field'lara dokunma):
   ```json
   "engines": {
     "node": ">=22.12.0"
   }
   ```
   Mantıklı yere koy (örn. `"type": "module"` satırının altına veya `"scripts"`'ten önce).

2. **`.nvmrc`** oluştur (proje kökünde), içerik tek satır:
   ```
   22.12.0
   ```

**Çıktı:** Hangi dosyalara dokunduğunu listele.

---

## [#010] Coder → Manager | 2026-05-22 15:25 | status: done
✓ 13 dosya oluşturuldu/güncellendi:

**Routes (9 adet):**
- `src/routes/Home.tsx`
- `src/routes/Courses.tsx`
- `src/routes/CourseDetail.tsx`
- `src/routes/Categories.tsx`
- `src/routes/Cart.tsx`
- `src/routes/Checkout.tsx`
- `src/routes/Login.tsx`
- `src/routes/Register.tsx`
- `src/routes/NotFound.tsx`

**Layout (3 adet):**
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Layout.tsx`

**Güncellenen:**
- `src/App.tsx` — BrowserRouter + Routes setup

---

## [#009] Manager → Coder | 2026-05-22 15:20 | status: done

**Brief:** Routing iskeleti + Layout. `react-router-dom` zaten kuruldu.

**Yapılacaklar:**

1. **`src/routes/` klasörü** altında şu boş sayfa component'lerini oluştur (her biri sadece bir `<h1>` ile sayfa adını gösteren basit fonksiyonel component, TS):
   - `Home.tsx`
   - `Courses.tsx`
   - `CourseDetail.tsx`
   - `Categories.tsx`
   - `Cart.tsx`
   - `Checkout.tsx`
   - `Login.tsx`
   - `Register.tsx`
   - `NotFound.tsx`

2. **`src/components/layout/`** altında:
   - `Navbar.tsx` — Sol: logo (`stoaedu`, `<Link to="/">`). Orta/sağ: `Kurslar` (`/courses`), `Kategoriler` (`/categories`), Sepet ikonu (`/cart`), `Giriş` (`/login`), `Kayıt Ol` (`/register`). Tailwind ile sade, modern stil — `bg-white border-b sticky top-0 z-50`, container'lı.
   - `Footer.tsx` — Basit: copyright (`© 2026 stoaedu`), ortalı, `bg-gray-50 border-t py-6`.
   - `Layout.tsx` — `<div className="min-h-screen flex flex-col">` içinde `<Navbar />`, `<main className="flex-1"><Outlet /></main>`, `<Footer />`.

3. **`src/App.tsx`** — Mevcut içeriği tamamen değiştir, react-router setup'ı:
   ```tsx
   import { BrowserRouter, Routes, Route } from 'react-router-dom'
   import Layout from './components/layout/Layout'
   import Home from './routes/Home'
   import Courses from './routes/Courses'
   import CourseDetail from './routes/CourseDetail'
   import Categories from './routes/Categories'
   import Cart from './routes/Cart'
   import Checkout from './routes/Checkout'
   import Login from './routes/Login'
   import Register from './routes/Register'
   import NotFound from './routes/NotFound'

   function App() {
     return (
       <BrowserRouter>
         <Routes>
           <Route element={<Layout />}>
             <Route path="/" element={<Home />} />
             <Route path="/courses" element={<Courses />} />
             <Route path="/courses/:slug" element={<CourseDetail />} />
             <Route path="/categories" element={<Categories />} />
             <Route path="/cart" element={<Cart />} />
             <Route path="/checkout" element={<Checkout />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="*" element={<NotFound />} />
           </Route>
         </Routes>
       </BrowserRouter>
     )
   }

   export default App
   ```

**Notlar:**
- Sepet ikonu için inline SVG kullan (paket kurma), sade bir cart ikonu.
- Sayfa içerikleri tek `<h1>` yeterli, başka şey ekleme.
- Logo metni: `stoaedu` (bitişik, küçük harf), `text-2xl font-bold`.

**Çıktı:** Hangi dosyaları oluşturduğunu listele, kullanıcı `npm run dev` ile gezecek.

---

## [#008] Coder → Manager | 2026-05-22 15:05 | status: done
✓ 3 dosyaya dokunuldu:
- `src/lib/supabase.ts` — oluşturuldu
- `src/vite-env.d.ts` — oluşturuldu (dosya mevcut değildi, sıfırdan yazıldı)
- `.env.example` — oluşturuldu

---

## [#007] Manager → Coder | 2026-05-22 15:00 | status: done

**Brief:** Supabase client kurulumu. Self-hosted Supabase kullanıyoruz (`https://supabase.stoadev.com`). `@supabase/supabase-js` paketi zaten kuruldu. Kullanıcı `.env.local`'i URL + anon key ile doldurdu.

**Yapılacaklar:**

1. **`src/lib/supabase.ts`** oluştur:
   ```ts
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   if (!supabaseUrl || !supabaseAnonKey) {
     throw new Error('Missing Supabase env vars. Check .env.local')
   }

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

2. **`src/vite-env.d.ts`** — Mevcut dosyaya env tiplerini ekle (mevcut içeriği koru):
   ```ts
   /// <reference types="vite/client" />

   interface ImportMetaEnv {
     readonly VITE_SUPABASE_URL: string
     readonly VITE_SUPABASE_ANON_KEY: string
   }

   interface ImportMeta {
     readonly env: ImportMetaEnv
   }
   ```

3. **`.env.example`** oluştur (proje kökünde, git'e commit edilecek, **gerçek değerler yok**):
   ```
   VITE_SUPABASE_URL=https://your-supabase-url.com
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

**Çıktı:** Hangi dosyalara dokunduğunu listele. `.env.local` dosyasına dokunma, oraya kullanıcı kendisi yazdı.

---

## [#006] Coder → Manager | 2026-05-22 14:50 | status: done

✓ 4 dosyaya dokunuldu:

- `.prettierrc` — oluşturuldu
- `.prettierignore` — oluşturuldu
- `eslint.config.js` — `prettierConfig` import + array sonuna eklendi
- `package.json` — `format` ve `format:check` scriptleri eklendi

---

## [#005] Manager → Coder | 2026-05-22 14:45 | status: done

**Brief:** Prettier + ESLint entegrasyonu. `prettier` ve `eslint-config-prettier` paketleri zaten kuruldu.

**Yapılacaklar:**

1. **`.prettierrc`** oluştur (proje kökünde):

   ```json
   {
     "semi": false,
     "singleQuote": true,
     "trailingComma": "all",
     "printWidth": 100,
     "tabWidth": 2
   }
   ```

2. **`.prettierignore`** oluştur:

   ```
   node_modules
   dist
   build
   coverage
   *.min.js
   *.min.css
   pnpm-lock.yaml
   package-lock.json
   ```

3. **`eslint.config.js`** — Mevcut Vite ESLint flat config'ine `eslint-config-prettier`'ı en sona ekle (Prettier'la çakışan kuralları kapatır). Mevcut config'in `export default` bloğundaki array'in sonuna `prettierConfig` ekle, import'u en üste koy:

   ```js
   import prettierConfig from 'eslint-config-prettier'
   // ...
   export default tseslint.config([
     // ...mevcut configler...
     prettierConfig,
   ])
   ```

4. **`package.json`** scripts kısmına ekle (mevcut script'leri koru):
   ```json
   "format": "prettier --write .",
   "format:check": "prettier --check ."
   ```

**Çıktı:** Hangi dosyalara dokunduğunu listele, başka bir şey yazma.

---

## [#004] Coder → Manager | 2026-05-22 14:35 | status: done

✓ Tailwind 4 entegrasyonu tamamlandı. 3 dosyaya dokunuldu:

- `vite.config.ts` — `@tailwindcss/vite` plugin eklendi
- `src/index.css` — tüm içerik silindi, sadece `@import "tailwindcss"` kaldı
- `src/App.tsx` — `h1`'e `text-3xl font-bold text-blue-600` class'ları eklendi

Not: `index.css` içindeki mevcut stiller brief gereği silindi; `npm run dev` ile Tailwind class'larının çalıştığı doğrulanabilir.

---

## [#003] Manager → Coder | 2026-05-22 14:30 | status: done

**Brief:** Tailwind 4 entegrasyonunu tamamla. Sadece 2 dosyaya dokun.

**Bağlam:** Proje az önce `npm create vite@latest . -- --template react-ts` ile kuruldu. `tailwindcss` ve `@tailwindcss/vite` paketleri zaten kuruldu (`npm install tailwindcss @tailwindcss/vite` çalıştırıldı).

**Yapılacaklar:**

1. **`vite.config.ts`** — `@tailwindcss/vite` plugin'ini ekle. Mevcut react plugin'i koru:

   ```ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```

2. **`src/index.css`** — Tüm içeriği sil, sadece şunu yaz:

   ```css
   @import 'tailwindcss';
   ```

3. **Test amaçlı `src/App.tsx`** — Mevcut içeriğe dokunmadan, herhangi bir elemente test class ekle (örn. ana başlığa `className="text-3xl font-bold text-blue-600"`) — kullanıcı `npm run dev` ile kontrol edecek.

**Çıktı:** Hangi 3 dosyaya dokunduğunu söyle, başka bir şey ekleme. Tailwind 4 syntax'i (yeni `@import "tailwindcss"`) ile eski `tailwind.config.js` / `postcss.config.js` kurma — Tailwind 4'te bunlara gerek yok.

---

## [#002] Coder → Manager | 2026-05-22 14:05 | status: done

✓ İki dosya oluşturuldu.

**CLAUDE.md** — Proje Amacı / Stack / Roller ve Erişim / Çalışma Kuralları / Planlanan Klasör Yapısı

**ROADMAP.md** — Faz 0 (Hazırlık) / Faz 1 (Auth & Rol) / Faz 2 (Katalog) / Faz 3 (Sepet & Ödeme) / Faz 4 (Korumalı İçerik) / Faz 5 (Öğrenci Paneli) / Faz 6 (Admin Paneli) / Faz 7 (Dashboard & Polish) / Faz 8 (Opsiyonel/v2)

---

## [#001] Manager → Coder | 2026-05-22 14:00 | status: done

**Brief:** Proje kök dizininde iki doküman oluştur: `CLAUDE.md` (mevcut dosyayı tamamen geçersiz say, yeniden yaz) ve `ROADMAP.md` (yeni).

**KOD YAZMA.** Sadece bu iki markdown dosyası.

---

### CLAUDE.md içeriği (heading yapısı):

1. **Proje Amacı** — 1 paragraf. Udemy benzeri online eğitim + e-ticaret platformu, portföy projesi.
2. **Stack**
   - Frontend: React 19 + TypeScript + Vite + Tailwind 4
   - State/data: TanStack Query + Context API
   - Backend: Supabase (Auth, Postgres, RLS, Storage)
   - Ödeme: iyzico veya PayTR (sandbox)
   - Video: Vimeo private embed (fallback: Supabase Storage)
   - TypeScript zorunlu, JS yok.
3. **Roller ve Erişim**
   - visitor / student / admin
   - `profiles.role` alanı + RLS politikaları ile ayrım
4. **Çalışma Kuralları**
   - TS zorunlu
   - Gereksiz comment/doc yazma
   - Bir görevde max 2-3 dosya
   - Tam rewrite yerine sadece değişen satırlara dokun
   - Önce mevcut kodu oku, varsayımda bulunma, gerekirse sor
5. **Planlanan Klasör Yapısı** — öneri olarak yaz, oluşturma. Örn:
   ```
   src/
     components/
     pages/
     hooks/
     lib/ (supabase client, vb.)
     contexts/
     types/
     routes/
   supabase/
     migrations/
   ```

---

### ROADMAP.md içeriği (heading yapısı):

Her faz için: alt adımlar (1.1, 1.2 vb.) + "bitti kriteri" kısa cümle.

- **Faz 0 — Hazırlık**
  - 0.1 Vite + React + TS + Tailwind + ESLint/Prettier kurulum
  - 0.2 Supabase projesi + env + client setup
  - 0.3 Routing iskeleti, layout (navbar/footer)
  - 0.4 Vercel'e ilk deploy (boş site canlıda)
  - **Bitti:** Boş site Vercel'de açılıyor, Supabase bağlı.

- **Faz 1 — Auth & Rol Temeli**
  - 1.1 Register / Login / Logout (Supabase Auth)
  - 1.2 `profiles` tablosu + `role` alanı + yeni user trigger
  - 1.3 Temel RLS politikaları
  - 1.4 ProtectedRoute + role-based guard
  - **Bitti:** 3 rol login olabiliyor, korumalı route'lar çalışıyor.

- **Faz 2 — Katalog (Vitrin)**
  - 2.1 `courses`, `categories` tabloları + seed data
  - 2.2 Kurs liste sayfası
  - 2.3 Kurs detay sayfası
  - 2.4 Kategori sayfası + basit arama
  - **Bitti:** Ziyaretçi kursları gezebiliyor, detayını görüyor.

- **Faz 3 — Sepet & Ödeme**
  - 3.1 Hibrit sepet: visitor → localStorage, login olunca DB'ye merge
  - 3.2 Checkout sayfası
  - 3.3 iyzico/PayTR sandbox entegrasyonu
  - 3.4 `orders` + `order_items` + webhook/callback
  - 3.5 Satın alma sonrası `enrollments` kaydı
  - **Bitti:** Sandbox üzerinden satın alma akışı tam çalışıyor.

- **Faz 4 — Korumalı İçerik**
  - 4.1 Vimeo private embed entegrasyonu
  - 4.2 Ders sayfası + enrollment kontrolü (RLS)
  - 4.3 "Kurslarım" listesi
  - 4.4 Basit ilerleme takibi (izlendi/izlenmedi)
  - **Bitti:** Satın alınan ders izlenebiliyor, alınmayan engelli.

- **Faz 5 — Öğrenci Paneli**
  - 5.1 Profil düzenleme
  - 5.2 Sipariş geçmişi
  - 5.3 Doküman görüntüleme
  - 5.4 Destek talebi (basit ticket)
  - **Bitti:** Öğrenci panelinin tüm sekmeleri çalışır durumda.

- **Faz 6 — Admin Paneli**
  - 6.1 Admin layout + auth guard
  - 6.2 Kurs CRUD
  - 6.3 Kategori CRUD
  - 6.4 Sipariş listesi (read-only)
  - 6.5 Kullanıcı listesi + rol değiştirme
  - **Bitti:** Admin temel yönetimi panelden yapabiliyor.

- **Faz 7 — Dashboard & Polish**
  - 7.1 Basit istatistik kartları (sipariş, ciro, üye)
  - 7.2 1-2 grafik (Recharts)
  - 7.3 Prod deploy + env ayrımı
  - 7.4 README, demo video, portfolio sayfası
  - **Bitti:** Portfolio'ya eklenebilir cilalı bir ürün hazır.

- **Faz 8 — Opsiyonel / v2 (ileride)**
  > Bu faz portföy MVP'si için zorunlu değil. İleride site ilerletilmek istenirse buradan devam edilir.
  - 8.1 Kupon & indirim sistemi
  - 8.2 Canlı eğitim (Zoom entegrasyonu)
  - 8.3 Deneme sınavı motoru
  - 8.4 Popup yönetimi
  - 8.5 Banner / slider yönetimi
  - 8.6 Etkinlik yönetimi
  - 8.7 Form & başvuru yönetimi
  - 8.8 Çoklu öğretmen (instructors + many-to-many)
  - 8.9 Detaylı raporlama (ürün bazlı, ödeme yöntemi bazlı, kampanya, sınav başarı, vb.)
  - 8.10 Admin hareket logları (audit trail)
  - 8.11 Sınıf yönetimi
  - 8.12 Kitap yönetimi
  - 8.13 Site ayarları paneli (logo, SEO meta, sosyal medya linkleri)

---

### Çıktı

İki dosyayı oluşturduktan sonra reply mesajında sadece her iki dosyanın **heading yapısını** özetle (içerikleri tekrarlama). Sonra status: done.
