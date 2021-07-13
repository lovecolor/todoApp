import { AxiosInstance } from "axios"
import { User } from "./types/User"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getLoggedInUserviaToken:getLoggedInUserviaToken(api)
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
        const res = await api.post<LoginResponse>("/user/login", data)

        return res.data.user
      } catch (err) { }
    }

type RegisterRequest = {
  username: string
  password: string
  age: number
}



const register =
  (api: AxiosInstance) =>
    async (data: RegisterRequest): Promise<LoginResponse | undefined> => {
      const res = await api.post<LoginResponse>("/user/register", data)

      return res.data
    }
const getLoggedInUserviaToken =
  (api: AxiosInstance) =>
    async (): Promise<LoginResponse | undefined> => {
      const res = await api.get<LoginResponse>("/user/me")

      return res.data
    }
