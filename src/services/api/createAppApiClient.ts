import { AxiosInstance } from "axios"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getCurrentUser:getCurrentUser(api)
  }
}

type LoginRequest = {
  email: string
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
        const res = await api.post<LoginResponse>("/user/login", data)

        return res.data.user
      } catch (err) { }
    }

type RegisterRequest = {
  email: string
  password: string
  age: number
  name:string
}



const register =
  (api: AxiosInstance) =>
    async (data: RegisterRequest): Promise<LoginResponse | undefined> => {
      const res = await api.post<LoginResponse>("/user/register", data)

      return res.data
    }
const getCurrentUser =
  (api: AxiosInstance) =>
    async (): Promise<LoginResponse | undefined> => {
      const res = await api.get<LoginResponse>("/user/me")

      return res.data
    }
