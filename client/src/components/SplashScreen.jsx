import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const SplashScreen = () => {
  const navigate = useNavigate()
  const { isLoggedIn, authLoading } = useAppContext()
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (authLoading) return

    const fadeTimer = setTimeout(() => setFadeOut(true), 1200)
    const navTimer = setTimeout(() => {
      navigate(isLoggedIn ? '/home' : '/', { replace: true })
    }, 1600)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(navTimer)
    }
  }, [authLoading, isLoggedIn, navigate])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 400ms ease',
      }}
    >
      <style>{`
        @keyframes pulse-settle {
          0%   { transform: scale(1); }
          40%  { transform: scale(1.12); }
          70%  { transform: scale(0.97); }
          100% { transform: scale(1); }
        }
        @keyframes fade-up {
          0%   { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .splash-logo {
          animation: pulse-settle 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both;
        }
        .splash-text {
          animation: fade-up 0.5s ease 0.7s both;
        }
      `}</style>

      <img
        src={assets.logo}
        alt="MemoVault"
        className="splash-logo"
        style={{ height: '56px' }}
      />
      <p
        className="splash-text"
        style={{
          marginTop: '16px',
          fontSize: '14px',
          color: '#9ca3af',
          fontFamily: 'Quicksand, sans-serif',
          letterSpacing: '0.01em',
        }}
      >
        Keep Your Notes Safe Here
      </p>
    </div>
  )
}

export default SplashScreen