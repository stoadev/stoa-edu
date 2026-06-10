import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Profile } from '../types/profile'

interface MockUser {
  id: string
  email: string
}

interface AuthContextValue {
  user: MockUser | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USERS: Array<{ email: string; password: string; fullName: string }> = [
  { email: 'demo@stoaedu.com', password: 'demo123', fullName: 'Demo Kullanıcı' },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  async function signUp(email: string, _password: string, fullName: string) {
    const newUser: MockUser = { id: crypto.randomUUID(), email }
    const newProfile: Profile = {
      id: newUser.id,
      email,
      full_name: fullName,
      role: 'student',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setUser(newUser)
    setProfile(newProfile)
    return { error: null }
  }

  async function signIn(email: string, password: string) {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (!found) {
      return { error: new Error('E-posta veya şifre hatalı.') }
    }
    const mockUser: MockUser = { id: '1', email: found.email }
    const mockProfile: Profile = {
      id: '1',
      email: found.email,
      full_name: found.fullName,
      role: 'student',
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    }
    setUser(mockUser)
    setProfile(mockProfile)
    return { error: null }
  }

  async function signOut() {
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading: false, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
