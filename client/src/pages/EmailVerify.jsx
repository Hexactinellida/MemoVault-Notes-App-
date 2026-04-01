import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const EmailVerify = () => {
  const navigate = useNavigate()
  const { fetchUser } = useAppContext()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputs = useRef([])

  useEffect(() => {
    sendOtp()
  }, [])

  const sendOtp = async () => {
    try {
      const { data } = await axios.post('/api/auth/send-verify-otp')
      if (data.success) {
        toast.success('OTP sent to your email')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleChange = (e, index) => {
    const val = e.target.value
    if (!/^\d*$/.test(val)) return

    const newOtp = [...otp]
    newOtp[index] = val.slice(-1)
    setOtp(newOtp)

    if (val && index < 5) {
      inputs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpValue = otp.join('')
    if (otpValue.length < 6) return toast.error('Enter the complete OTP')

    try {
      const { data } = await axios.post('/api/auth/verify-account', { otp: otpValue })
      if (data.success) {
        toast.success('Email verified!')
        await fetchUser()
        navigate('/home')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">
        <img src={assets.logo} alt="logo" className="h-8 mb-6 mx-auto" />
        <h1 className="text-2xl font-bold mb-1 text-center">Verify your Email</h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e, i)}
                onKeyDown={e => handleKeyDown(e, i)}
                className="w-10 h-12 text-center text-lg font-semibold border-2 rounded-lg outline-none focus:border-blue-400 bg-white/70"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
          >
            Verify Email
          </button>

          <button
            type="button"
            onClick={sendOtp}
            className="w-full mt-3 text-sm text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify