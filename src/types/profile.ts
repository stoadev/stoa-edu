export type Role = 'student' | 'admin'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: Role
  created_at: string
  updated_at: string
}
