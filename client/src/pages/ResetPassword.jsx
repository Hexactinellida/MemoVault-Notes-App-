import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { assets } from '../assets/assets'

const ResetPassword = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: email, 2: otp + new password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleSendOtp = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/send-reset-otp', { email })
      if (data.success) {
        toast.success('OTP sent to your email')
        setStep(2)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/reset-password', {
        email,
        otp,
        newPassword
      })
      if (data.success) {
        toast.success('Password reset successfully')
        navigate('/login')
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

        {step === 1 ? (
          <>
            <h1 className="text-2xl font-bold mb-1 text-center">Forgot Password</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter your email to receive an OTP
            </p>
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
                <img src={assets.mail_icon} className="w-4 h-4 mr-2 opacity-50" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
              >
                Send OTP
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-500">
              Login with password instead {' '}
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-1 text-center">Reset Password</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter the OTP and your new password
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-white/70">
                <img src={assets.lock_icon} className="w-4 h-4 mr-2 opacity-50" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="flex-1 outline-none bg-transparent text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
              >
                Reset Password
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  )
}

export default ResetPassword