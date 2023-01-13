import { useState, useContext, createContext, useEffect } from 'react'
import * as AuthAPI from '../api/authApi'
import { setAccessToken, getAccessToken, removeAccessToken } from '../services/localStorage'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const login = async (data) => {
    try {
      const res = await AuthAPI.login(data)
      const { findUser, token } = res.data
      setUser(findUser)
      //set token
      setAccessToken(token)      
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const register = async (formData) => {
    try {
      const res = await AuthAPI.register(formData)
      // setUser(null)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      if (error.code === 'ERR_BAD_REQUEST') {
        alert('This email is already in use')
      }
    }
  }

  const logout = () => {
    removeAccessToken()
    setUser(null)
    navigate('/')
  }

  // useEffect(() => {
  //   const token = getAccessToken()
  //   if (token) {
  //     setUser()
  //   }
  // }, [])

  const shared = {
    user,
    setUser,
    register,
    login,
    logout,
  }
  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>
}

export { useAuth, AuthContextProvider }
