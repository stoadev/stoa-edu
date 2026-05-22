# Messages

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
