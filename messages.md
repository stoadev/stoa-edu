# Messages

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
