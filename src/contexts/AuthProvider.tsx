import React from "react"
import { useEffect, createContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { User } from "../services/api/types/User"
import { LoginRequest } from "../services/api/types/LoginRequest"
import { RegisterRequest } from "../services/api/types/RegisterRequest"

const AuthContext = createContext<{
  token: string | null
  user: any
  loading: boolean
  error: string | null
  login: (data: LoginRequest) => void
  signUp: (data: RegisterRequest) => void
  logout: () => void
}>({
  token: null,
  user: null,
  loading: false,
  error: null,
  login: (data: LoginRequest) => {},
  signUp: (data: RegisterRequest) => {},
  logout: () => {},
})

export const AuthProvider: React.FC = (props) => {
  const [token, setToken] = useState<string | null>(null)
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
    token,
    user,
    loading,
    error,
    signUp,
    login,
    logout,
  }
  useEffect(() => {
    const currentToken = localStorage.getItem("token")
    if (currentToken) {
      setToken(currentToken)
      currentUser.run()
    }
  }, [])
  useEffect(() => {
    setLoading(registerUser.loading)
    if (!registerUser.loading) {
      const { result, error } = registerUser

      if (result) {
        const { user, token } = result
        setUser(user)
        localStorage.setItem("token", token)
        setToken(token)
      }
      if (error) setErorr(error)
    }
  }, [registerUser.loading])
  useEffect(() => {
    setLoading(loginUser.loading)
    const { result, error } = loginUser
    if (!loginUser.loading) {
      if (result) {
        const { user, token } = result
        setUser(user)
        localStorage.setItem("token", token)
        setToken(token)
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
        setToken(null)
        localStorage.clear()
      }
    }
  }, [currentUser.loading])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
