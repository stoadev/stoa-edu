import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, User, Mail, Lock, Loader2, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { AuthLayout } from '../components/auth/AuthLayout'

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
    <AuthLayout
      icon={<UserPlus className="w-7 h-7 text-gray-900" />}
      title="Kayıt ol"
      subtitle="Ücretsiz hesap aç, kurslara erişmeye hemen başla."
      footer={
        <>
          Zaten hesabın var mı?{' '}
          <Link to="/login" className="text-brand-700 font-medium hover:underline">
            Oturum aç
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <Input
          type="text"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
          required
          icon={<User />}
        />
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
          placeholder="Şifre (min 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
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
              Kaydediliyor...
            </>
          ) : (
            'Kayıt ol'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
