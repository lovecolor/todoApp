import React from "react"
import { useEffect, createContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { User } from "../services/api/types/User"
import { LoginResponse } from "../services/api/types/LoginResponse"

const AuthContext = createContext<{
  user: User | null

  setUser: (user: User | null) => void
}>({
  user: null,

  setUser: (user: User | null) => {},
})

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)

  const api = useAppApiClient()

  const currentUser = useAsync(async () => {
    const result = await api.getCurrentUser()
    if (result) {
      setUser(result)
    } else {
      localStorage.removeItem("token")
    }
  })

  const contextValue = {
    user,
    setUser,
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      currentUser.run()
    }
  }, [])

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext
