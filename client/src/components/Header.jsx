import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Header = () => {
  const navigate = useNavigate()
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useAppContext()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout')
      setIsLoggedIn(false)
      setUser(null)
      setDropdownOpen(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white/90 shadow-sm">
      <Link to={isLoggedIn ? '/home' : '/'}>
        <img src={assets.logo} alt="logo" className="h-8"/>
      </Link>

      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 font-medium"
            >
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block">{user?.name}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                {!user?.isAccountVerified && (
                  <button
                    onClick={() => { navigate('/verify-email'); setDropdownOpen(false) }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Verify Account
                  </button>
                )}
                <button
                  onClick={() => { navigate('/reset-password'); setDropdownOpen(false) }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Change Password
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 items-center">
  <Link
    to="/login"
    className="text-sm text-gray-600 hover:text-gray-900 transition px-4 py-1.5"
  >
    Login
  </Link>
  <Link
    to="/register"
    className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 transition"
  >
    Register
  </Link>
</div>
        )}
      </div>
    </div>
  )
}

export default Header