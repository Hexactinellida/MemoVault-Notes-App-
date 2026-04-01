import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/data')
      if (data.success) {
        setUser(data.userData)
        setIsLoggedIn(true)
      }
    } catch (error) {
      // not logged in
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, fetchUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)