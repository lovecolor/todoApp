import React from "react"
import { useEffect, createContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { User } from "../services/api/types/User"

const AuthContext = createContext<{
  user: User | null
  avatarUrl: string | undefined
  setUser: (user: User | null) => void
  setAvatarUrl: (url: string | undefined) => void
}>({
  user: null,
  avatarUrl: undefined,
  setUser: (user: User | null) => {},
  setAvatarUrl: (url: string | undefined) => {},
})

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const api = useAppApiClient()

  const currentUser = useAsync(async () => {
    const result = await api.getCurrentUser()
    if (result) {
      setUser(result)
      const userAvatarUrl = await api.getUserImage({ userId: result._id })
      if (userAvatarUrl) setAvatarUrl(userAvatarUrl)
    } else {
      localStorage.removeItem("token")
    }
  })

  const contextValue = {
    user,
    setUser,
    avatarUrl,
    setAvatarUrl,
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
