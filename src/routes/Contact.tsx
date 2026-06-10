import { useState } from 'react'
import { Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const contactInfo = [
  {
    icon: Mail,
    label: 'E-posta',
    value: 'destek@stoaedu.com',
  },
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Levent, İstanbul',
  },
  {
    icon: Clock,
    label: 'Destek Saatleri',
    value: 'Hafta içi 09:00 – 18:00',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişime Geçin</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Sorularınız, önerileriniz veya teknik destek talepleriniz için bize ulaşın. En kısa sürede
          dönüş yapıyoruz.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Mesajınız alındı!</h2>
              <p className="text-sm text-gray-500">En geç 1 iş günü içinde size dönüş yapacağız.</p>
              <Button variant="outline" onClick={() => setSent(false)}>
                Yeni Mesaj Gönder
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                placeholder="Adınız Soyadınız"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                autoComplete="name"
              />
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                autoComplete="email"
              />
              <Input
                placeholder="Konu"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <textarea
                placeholder="Mesajınız..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm resize-none"
              />
              <Button type="submit" variant="primary" className="w-full">
                Gönder
              </Button>
            </form>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 flex flex-col gap-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100">
                  <item.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Sık Sorulan Sorular</h3>
            <p className="text-sm text-gray-500 mb-4">
              Sorunuzun cevabını SSS sayfamızda bulabilirsiniz. Çoğu soru birkaç dakika içinde
              yanıtlanır.
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>→ Satın aldığım kursa ne zaman erişebilirim?</li>
              <li>→ Sertifika nasıl alınır?</li>
              <li>→ İade politikası nedir?</li>
              <li>→ Kursu mobil cihazda izleyebilir miyim?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
