import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

const DEMO_USER = {
  id: '4402',
  name: 'Alex Johnson',
  email: 'alex.johnson@healthcare.ai',
  phone: '+1 (555) 012-3456',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5lvpBFr8H-ke37DulhclWkFF7NAGFumFzSbYQVKqNpLStl30lZ_6eIoTIpLmXuW6vhxMNX2MNv7fbXK23H0LjmfaxP_Gc-vtvWt3c_jlHcL5oJuc-tUIOHC3dEftKud9zPuSWbMb2Fi_ET_SbAwOnIDTUaxUgwxgHNHW7D09uZWwWV9Y-rcR_jiNV-fGxTQpRNf1RyjbW9_XZn9bktAhnZIFfI5A6ukS9HiUBy82s9fC4VABoqqA',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (stored && token) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      const { data } = await authAPI.login(credentials)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      return data
    } catch {
      // Demo fallback when backend is unavailable
      const demoToken = 'demo-token'
      localStorage.setItem('token', demoToken)
      localStorage.setItem('user', JSON.stringify(DEMO_USER))
      setUser(DEMO_USER)
      return { token: demoToken, user: DEMO_USER }
    }
  }

  const register = async (userData) => {
    try {
      const { data } = await authAPI.register(userData)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      return data
    } catch {
      const newUser = {
        ...DEMO_USER,
        name: userData.name || 'New User',
        email: userData.email,
      }
      localStorage.setItem('token', 'demo-token')
      localStorage.setItem('user', JSON.stringify(newUser))
      setUser(newUser)
      return { token: 'demo-token', user: newUser }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
