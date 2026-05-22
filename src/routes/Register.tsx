import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

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
    if (error) {
      setError(error.message)
    } else {
      navigate('/courses')
    }
  }

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900"
        />
        <input
          type="password"
          placeholder="Şifre (min 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-900"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="bg-gray-900 text-white py-2 rounded text-sm hover:bg-gray-700 disabled:opacity-50"
        >
          {submitting ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </div>
  )
}
