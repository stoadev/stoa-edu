import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

export default function Navbar() {
  const { user, profile, loading, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          stoaedu
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/courses" className="text-sm text-gray-600 hover:text-gray-900">
            Kurslar
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-900">
            <CartIcon />
          </Link>
          {!loading && (
            <>
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    {profile?.full_name ?? user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900">
                    Giriş
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
