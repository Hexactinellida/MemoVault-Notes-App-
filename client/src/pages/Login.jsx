import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Login = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn, fetchUser } = useAppContext()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
          const { data } = await axios.post('/api/auth/login', form)
          if (data.success) {
      await fetchUser()  // fetches complete user including isAccountVerified
      toast.success('Logged in successfully')
      navigate('/home')
    } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">

        <img src={assets.logo} alt="logo" className="h-8 mb-6 mx-auto" />
        <h1 className="text-2xl font-bold mb-1 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Login to access your notes</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
            <img src={assets.mail_icon} className="w-4 h-4 mr-2 opacity-50" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 outline-none bg-transparent text-sm"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
            <img src={assets.lock_icon} className="w-4 h-4 mr-2 opacity-50" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="flex-1 outline-none bg-transparent text-sm"
              required
            />
          </div>

          <div className="text-right">
            <Link to="/reset-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login