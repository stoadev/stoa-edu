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
