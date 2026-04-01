import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">

        <img src={assets.logo} alt="logo" className="h-10 mx-auto mb-8" />

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Your thoughts, organized.
        </h1>
        <p className="text-gray-500 text-lg mb-10">
          A simple, clean space to capture your notes and ideas. Anytime, Anywhere.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition text-sm font-medium"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-2.5 rounded-lg hover:bg-white transition text-sm font-medium border"
          >
            Login
          </button>
        </div>

      </div>
    </div>
  )
}

export default Landing