import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="mt-auto px-6 py-4 bg-white/60 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <img src={assets.logo} alt="logo" className="h-6" />
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} MemoVault. All rights reserved.</p>
        <div className="flex gap-4">
        </div>
      </div>
    </div>
  )
}

export default Footer