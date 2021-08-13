import React from "react"
import { useEffect, createContext } from "react"
import { useState } from "react"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { User } from "../services/api/types/User"

const AuthContext = createContext<{
  user: User | null
  urlImage: string | null
  setUser: (user: User | null) => void
  setUrlImage: (url: string | null) => void
}>({
  user: null,
  urlImage: null,
  setUser: (user: User | null) => {},
  setUrlImage: (url: string | null) => {},
})

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)
  const [urlImage, setUrlImage] = useState<string | null>(null)
  const api = useAppApiClient()

  const currentUser = useAsync(async () => {
    const result = await api.getCurrentUser()
    if (result) {
      setUser(result)
      const resultGetImage = await api.getUserImage({ uid: result._id })
      if (resultGetImage) setUrlImage(resultGetImage)
    } else {
      localStorage.removeItem("token")
    }
  })

  const contextValue = {
    user,
    setUser,
    urlImage,
    setUrlImage,
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
