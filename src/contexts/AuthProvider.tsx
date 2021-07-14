import React from "react"
import { useEffect,createContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { User } from "../services/api/types/User"
import { LoginRequest } from "../services/api/types/LoginRequest"
import { RegisterRequest } from "../services/api/types/RegisterRequest"

const AuthContext = createContext<{
  user: any
  loading: boolean
  error: string | null
  login: (data: LoginRequest) => void
  signUp: (data: RegisterRequest) => void
  logout: () => void
}>({
  user: null,
  loading: false,
  error: null,
  login: (data: LoginRequest) => {},
  signUp: (data: RegisterRequest) => {},
  logout: () => {},
})

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setErorr] = useState<string | null>(null)

  const api = useAppApiClient()

  const currentUser = useAsync(api.getCurrentUser)
  const registerUser = useAsync(api.register)
  const loginUser = useAsync(api.login)

  const signUp = (data) => {
    registerUser.run(data)
  }
  const login = (data) => {
    loginUser.run(data)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
  const contextValue = {
    user,
    loading,
    error,
    signUp,
    login,
    logout,
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      currentUser.run()
    }
  }, [])
  useEffect(() => {
    setLoading(registerUser.loading)
    if (!registerUser.loading) {
      const { result, error } = registerUser
      if (result) {
        setUser(result.user)
        localStorage.setItem("token", result.token)
      }
      if (error) setErorr(error)
    }
  }, [registerUser.loading])
  useEffect(() => {
    setLoading(loginUser.loading)

    if (!loginUser.loading) {
      const { result, error } = loginUser
      
      if (result) {
        setUser(result.user)
        localStorage.setItem("token", result.token)
      }
      if (error) setErorr(error)
    }
  }, [loginUser.loading])

  useEffect(() => {
    setLoading(currentUser.loading)
    if (!currentUser.loading) {
      const { result, error } = currentUser
      if (result) {
        setUser(result)
      }
      if (error) {
        localStorage.clear()
      }
    }
  }, [currentUser.loading])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
