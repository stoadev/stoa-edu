# ROADMAP

## Faz 0 — Hazırlık

- 0.1 Vite + React + TS + Tailwind + ESLint/Prettier kurulum
- 0.2 Supabase projesi + env + client setup
- 0.3 Routing iskeleti, layout (navbar/footer)
- 0.4 Vercel'e ilk deploy (boş site canlıda)

**Bitti kriteri:** Boş site Vercel'de açılıyor, Supabase bağlı.

---

## Faz 1 — Auth & Rol Temeli

- 1.1 Register / Login / Logout (Supabase Auth)
- 1.2 `profiles` tablosu + `role` alanı + yeni user trigger
- 1.3 Temel RLS politikaları
- 1.4 ProtectedRoute + role-based guard

**Bitti kriteri:** 3 rol login olabiliyor, korumalı route'lar çalışıyor.

---

## Faz 2 — Katalog (Vitrin)

- 2.1 `courses`, `categories` tabloları + seed data
- 2.2 Kurs liste sayfası
- 2.3 Kurs detay sayfası
- 2.4 Kategori sayfası + basit arama

**Bitti kriteri:** Ziyaretçi kursları gezebiliyor, detayını görüyor.

---

## Faz 3 — Sepet & Ödeme

- 3.1 Hibrit sepet: visitor → localStorage, login olunca DB'ye merge
- 3.2 Checkout sayfası
- 3.3 iyzico/PayTR sandbox entegrasyonu
- 3.4 `orders` + `order_items` + webhook/callback
- 3.5 Satın alma sonrası `enrollments` kaydı

**Bitti kriteri:** Sandbox üzerinden satın alma akışı tam çalışıyor.

---

## Faz 4 — Korumalı İçerik

- 4.1 Vimeo private embed entegrasyonu
- 4.2 Ders sayfası + enrollment kontrolü (RLS)
- 4.3 "Kurslarım" listesi
- 4.4 Basit ilerleme takibi (izlendi/izlenmedi)

**Bitti kriteri:** Satın alınan ders izlenebiliyor, alınmayan engelli.

---

## Faz 5 — Öğrenci Paneli

- 5.1 Profil düzenleme
- 5.2 Sipariş geçmişi
- 5.3 Doküman görüntüleme
- 5.4 Destek talebi (basit ticket)

**Bitti kriteri:** Öğrenci panelinin tüm sekmeleri çalışır durumda.

---

## Faz 6 — Admin Paneli

- 6.1 Admin layout + auth guard
- 6.2 Kurs CRUD
- 6.3 Kategori CRUD
- 6.4 Sipariş listesi (read-only)
- 6.5 Kullanıcı listesi + rol değiştirme

**Bitti kriteri:** Admin temel yönetimi panelden yapabiliyor.

---

## Faz 7 — Dashboard & Polish

- 7.1 Basit istatistik kartları (sipariş, ciro, üye)
- 7.2 1-2 grafik (Recharts)
- 7.3 Prod deploy + env ayrımı
- 7.4 README, demo video, portfolio sayfası

**Bitti kriteri:** Portfolio'ya eklenebilir cilalı bir ürün hazır.

---

## Faz 8 — Opsiyonel / v2 (ileride)

> Bu faz portföy MVP'si için zorunlu değil. İleride site ilerletilmek istenirse buradan devam edilir.

- 8.1 Kupon & indirim sistemi
- 8.2 Canlı eğitim (Zoom entegrasyonu)
- 8.3 Deneme sınavı motoru
- 8.4 Popup yönetimi
- 8.5 Banner / slider yönetimi
- 8.6 Etkinlik yönetimi
- 8.7 Form & başvuru yönetimi
- 8.8 Çoklu öğretmen (instructors + many-to-many)
- 8.9 Detaylı raporlama (ürün bazlı, ödeme yöntemi bazlı, kampanya, sınav başarı vb.)
- 8.10 Admin hareket logları (audit trail)
- 8.11 Sınıf yönetimi
- 8.12 Kitap yönetimi
- 8.13 Site ayarları paneli (logo, SEO meta, sosyal medya linkleri)
