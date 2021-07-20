import { AxiosInstance } from "axios"
import { User } from "./types/User"
import { LoginRequest } from "./types/LoginRequest"
import { RegisterRequest } from "./types/RegisterRequest"
import { UpdateUserReponse } from "./types/UpdateUserResponse"
import { UpdateUserRequest } from "./types/UpdateUserRequest"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getCurrentUser: getCurrentUser(api),
    logout: logout(api),
    updateUser: updateUser(api),
  }
}

type LoginResponse = {
  token: string
  user: User
}

const login =
  (api: AxiosInstance) =>
  async (data: LoginRequest): Promise<LoginResponse | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/login", data)

      return res.data
    } catch (error) {}
  }

const register =
  (api: AxiosInstance) =>
  async (data: RegisterRequest): Promise<LoginResponse | undefined> => {
    try {
      const res = await api.post<LoginResponse>("/user/register", data)

      return res.data
    } catch (error) {}
  }
const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  try {
    const res = await api.get<User>("/user/me")

    return res.data
  } catch (error) {}
}
type LogoutReponse = {
  success: boolean
}

const logout = (api: AxiosInstance) => async (): Promise<LogoutReponse | undefined> => {
  try {
    const res = await api.post<LogoutReponse>("/user/logout")

    return res.data
  } catch (error) {}
}

const updateUser =
  (api: AxiosInstance) =>
  async (data: UpdateUserRequest): Promise<User | undefined> => {
    try {
      const res = await api.put<UpdateUserReponse>("/user/me", data)

      return res.data.data
    } catch (error) {}
  }
