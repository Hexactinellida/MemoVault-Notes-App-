import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Register = () => {
  const navigate = useNavigate()
  const { setIsLoggedIn, setUser } = useAppContext()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const { data } = await axios.post('/api/auth/register', form)
    if (data.success) {
      setIsLoggedIn(true)
      setUser(data.userData)
      toast.success('Account created!')
      navigate('/home')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">

        <img src={assets.logo} alt="logo" className="h-8 mb-6 mx-auto" />
        <h1 className="text-2xl font-bold mb-1 text-center">Create Account</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Start taking notes today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
            <img src={assets.person_icon} className="w-4 h-4 mr-2 opacity-50" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="flex-1 outline-none bg-transparent text-sm"
              required
            />
          </div>

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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register