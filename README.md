# stoa-edu

Udemy benzeri online eğitim platformu. Kurslar, kategoriler, sepet ve kullanıcı kimlik doğrulaması içeren tam yığınlı bir portföy projesi.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4**
- **TanStack Query** — veri yönetimi ve cache
- **React Router v7** — istemci tarafı yönlendirme
- **Radix UI** — erişilebilir UI bileşenleri

## Başlarken

```bash
npm install
npm run dev
```

## Komutlar

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusunu başlat |
| `npm run build` | Production build |
| `npm run preview` | Production build'i önizle |
| `npm run lint` | ESLint çalıştır |
| `npm run format` | Prettier ile formatla |

## Demo Hesabı

Giriş sayfasında aşağıdaki bilgilerle test edebilirsiniz:

- **E-posta:** `demo@stoaedu.com`
- **Şifre:** `demo123`

Yeni hesap oluşturmak da çalışır — veriler yalnızca oturum süresince bellekte tutulur.

## Sepet

Sepet verisi `localStorage`'da tutulur — sayfa yenilense de korunur. Giriş gerektirmez.

## Görsel Slider

`ImageSlider`, ana sayfa (Hero) ile giriş/kayıt sayfalarında (AuthLayout) aynı görsel setini gösterir.
Sayfalar arası geçişte slider state'i (aktif görsel + geçen süre) paylaşılır, böylece geçiş kaldığı
yerden devam eder, baştan başlamaz.

## Proje Yapısı

```
src/
  components/
    auth/        # AuthLayout (login/register iskelet)
    home/        # Hero, öne çıkan kurslar
    layout/      # Navbar, Footer, Layout
    ui/          # Button, Input, ImageSlider, vb.
  contexts/      # AuthContext (mock auth), CartContext (localStorage)
  hooks/         # useScroll
  lib/
    queries/     # TanStack Query hook'ları (categories, courses)
    format.ts    # Para formatı utility
    images.ts    # Slider görsel listesi
    mockData.ts  # Statik kategori ve kurs verisi
    utils.ts     # cn() helper
  routes/        # Sayfa bileşenleri
  types/         # TypeScript tip tanımları
```

## Sayfalar

| Yol | Açıklama |
|-----|----------|
| `/` | Ana sayfa |
| `/courses` | Kurs listesi |
| `/courses/:slug` | Kurs detayı |
| `/categories` | Kategoriler |
| `/cart` | Sepet |
| `/about` | Hakkımızda |
| `/contact` | İletişim |
| `/login`, `/register` | Kimlik doğrulama |
| `/checkout` | Ödeme (giriş gerektirir) |

## Roller

| Rol | Açıklama |
|-----|----------|
| `visitor` | Giriş yapmamış kullanıcı |
| `student` | Kayıtlı kullanıcı |
| `admin` | Yönetim yetkisi |

## Notlar

- Veri katmanı mock'tur — gerçek bir veritabanı bağlantısı yoktur.
- Ödeme entegrasyonu (iyzico/PayTR) henüz eklenmemiştir.
- Video içeriği (Vimeo embed) henüz eklenmemiştir.
