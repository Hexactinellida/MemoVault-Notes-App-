import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAppContext } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'

function AppRoutes() {
  const { user, isLoggedIn, authLoading } = useAppContext()

  if (authLoading) return <SplashScreen />

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/verify-email"
            element={
              user?.isAccountVerified
                ? <Navigate to="/home" replace />
                : <EmailVerify />
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton={true} />
      <div className="flex flex-col min-h-screen">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App