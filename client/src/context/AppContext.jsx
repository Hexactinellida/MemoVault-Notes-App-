import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)  // ← add this

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data')
      if (data.success) {
        setUser(data.userData)
        setIsLoggedIn(true)
      } else {
        setUser(null)
        setIsLoggedIn(false)
      }
    } catch (error) {
      setUser(null)
      setIsLoggedIn(false)
    } finally {
      setAuthLoading(false)  // ← always resolve loading
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, fetchUser, authLoading }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)