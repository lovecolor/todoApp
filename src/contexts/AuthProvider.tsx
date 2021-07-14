import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"

type user = {
  age: number
  _id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
  __v: number
}
type RegisterRequest = {
  name: string
  age: number
  email: string
  password: string
}
type LoginRequest = {
  email: string
  password: string
}
const AuthContext = React.createContext<{
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
  const [user, setUser] = useState<user | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setErorr] = useState<string | null>(null)

  const api = useAppApiClient()

  const currentUser = useAsync(api.getCurrentUser)
  const registerUser = useAsync(api.register)
  const loginUser = useAsync(api.login)

  const signUpHandler = (data) => {
    registerUser.run(data)
  }
  const loginHandler = (data) => {
    loginUser.run(data)
  }

  const logoutHandler = () => {
    setUser(null)
    localStorage.removeItem("token")
  }
  const contextValue = {
    user,
    loading,
    error,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler,
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("token")
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
