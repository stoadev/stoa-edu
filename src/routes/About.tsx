import { Users, Target, BookOpen, Award } from 'lucide-react'

const stats = [
  { label: 'Aktif Öğrenci', value: '12.000+' },
  { label: 'Kurs', value: '80+' },
  { label: 'Uzman Eğitmen', value: '25+' },
  { label: 'Tamamlanan Eğitim', value: '95.000+' },
]

const values = [
  {
    icon: Target,
    title: 'Odaklı Öğrenme',
    description:
      'Her kurs, gereksiz teoriden arındırılmış, doğrudan uygulamaya yönelik içeriklerle hazırlanır. Öğrendiklerinizi aynı gün projelerinizde kullanabilirsiniz.',
  },
  {
    icon: Users,
    title: 'Topluluk Önce',
    description:
      'Öğrenmek yalnız bir yolculuk değil. Forum, canlı soru-cevap seansları ve öğrenci gruplarıyla her zaman yanınızdayız.',
  },
  {
    icon: BookOpen,
    title: 'Güncel İçerik',
    description:
      'Teknoloji hızla değişiyor. Kurslarımız sektörün güncel taleplerine göre düzenli olarak güncellenir.',
  },
  {
    icon: Award,
    title: 'Sertifika',
    description:
      'Tamamladığınız her kurs için dijital sertifika alırsınız. LinkedIn profilinize ekleyerek kariyerinizi öne çıkarın.',
  },
]

const team = [
  {
    name: 'Ayşe Kaya',
    role: 'Kurucu & CEO',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    bio: '10 yıllık yazılım geliştirme deneyimi. Eğitime olan tutkusuyla stoaedu\'yu kurdu.',
  },
  {
    name: 'Mehmet Demir',
    role: 'Baş Eğitmen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    bio: 'Full-stack geliştirici ve eğitmen. React, Node.js ve sistem tasarımı üzerine uzmanlaşmış.',
  },
  {
    name: 'Zeynep Arslan',
    role: 'İçerik Direktörü',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
    bio: 'UX tasarımı ve ürün yönetimi alanında 8 yıl deneyim. Öğrenci deneyimini en üst düzeye çıkarmak için çalışıyor.',
  },
]

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Öğrenmeyi herkes için erişilebilir kılıyoruz
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          stoaedu, yazılım ve tasarım alanında kariyer yapmak isteyen herkese kaliteli, uygun fiyatlı
          ve uygulamalı eğitimler sunan bir online öğrenme platformudur.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((s) => (
          <div key={s.label} className="text-center rounded-2xl border border-gray-100 bg-gray-50 py-6">
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hikayemiz</h2>
          <p className="text-gray-600 mb-4">
            2021 yılında İstanbul'da küçük bir ekiple yola çıktık. Amacımız tek ve netti: Türkçe,
            güncel ve gerçekten işe yarayan eğitimler üretmek.
          </p>
          <p className="text-gray-600 mb-4">
            İlk kursumuz yayınlandığında 200 kişiye ulaşmayı hayal ediyorduk. Bugün 12.000'den fazla
            öğrencimiz var ve her gün büyümeye devam ediyoruz.
          </p>
          <p className="text-gray-600">
            Öğrencilerimizin %78'i kursu bitirdikten sonra iş hayatlarında somut bir ilerleme
            kaydettiklerini bildiriyor. Bu bizim için en büyük başarı ölçütü.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop&auto=format"
            alt="Ekibimiz"
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">Değerlerimiz</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="flex gap-4 rounded-2xl border border-gray-100 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <v.icon className="h-5 w-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-10">Ekibimiz</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center">
              <img
                src={m.avatar}
                alt={m.name}
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-gray-900">{m.name}</h3>
              <p className="text-xs text-brand-700 font-medium mb-2">{m.role}</p>
              <p className="text-sm text-gray-500">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
