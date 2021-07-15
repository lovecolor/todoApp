import { AxiosInstance } from "axios"
import { User } from "./types/User"
import { LoginRequest } from "./types/LoginRequest"
import { RegisterRequest } from "./types/RegisterRequest"
import { LogoutReponse } from "./types/LoutoutReponse"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getCurrentUser: getCurrentUser(api),
  }
}



type LoginResponse = {
  token: string
  user: User
}

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<LoginResponse | undefined> => {
    const res = await api.post<LoginResponse>("/user/login", data)

    return res.data
  }



const register =
  (api: AxiosInstance) =>
  async (data: RegisterRequest): Promise<LoginResponse | undefined> => {
    const res = await api.post<LoginResponse>("/user/register", data)

    return res.data
  }
const getCurrentUser = (api: AxiosInstance) => async (): Promise<LoginResponse | undefined> => {
  const res = await api.get<LoginResponse>("/user/me")

  return res.data
}
const logout = (api: AxiosInstance) => async (): Promise<LogoutReponse|undefined> => {
  const res = await api.get<LogoutReponse>("/user/logout")

  return res.data
}