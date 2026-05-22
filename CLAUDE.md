# stoa-edu

## Proje Amacı

Udemy benzeri online eğitim ve e-ticaret platformu. Kurslar, kategoriler, sepet, ödeme, korumalı video içeriği ve admin yönetiminden oluşan tam yığınlı bir portföy projesidir.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind 4
- **State/Data:** TanStack Query + Context API
- **Backend:** Supabase (Auth, Postgres, RLS, Storage)
- **Ödeme:** iyzico veya PayTR (sandbox)
- **Video:** Vimeo private embed (fallback: Supabase Storage)
- TypeScript zorunlu, JS yok.

## Roller ve Erişim

| Rol       | Açıklama                                |
| --------- | --------------------------------------- |
| `visitor` | Giriş yapmamış kullanıcı                |
| `student` | Kayıtlı, satın alma yapabilen kullanıcı |
| `admin`   | Tüm yönetim yetkisine sahip kullanıcı   |

Rol ayrımı `profiles.role` alanı ve RLS politikaları ile yapılır.

## Çalışma Kuralları

- TS zorunlu; saf JS dosyası oluşturma.
- Gereksiz comment veya docstring yazma.
- Bir görevde max 2-3 dosyaya dokun.
- Tam rewrite yerine sadece değişen satırları değiştir.
- Önce mevcut kodu oku; varsayımda bulunma, gerekirse sor.

## Planlanan Klasör Yapısı

> Öneri; henüz oluşturulmadı.

```
src/
  components/
  pages/
  hooks/
  lib/          # supabase client vb.
  contexts/
  types/
  routes/
supabase/
  migrations/
```
