import { AxiosInstance } from "axios"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
  }
}

type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  token: string
  user: User
}

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<User | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/login", data)

      return res.data.user
    } catch (err) {}
  }
