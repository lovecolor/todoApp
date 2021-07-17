import { AxiosInstance } from "axios"
import { User } from "./types/User"
import { LoginRequest } from "./types/LoginRequest"
import { RegisterRequest } from "./types/RegisterRequest"

import { UpdateUserReponse } from "./types/UpdateUserResponse"
import { Task } from "./types/Task"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getCurrentUser: getCurrentUser(api),
    logout: logout(api),
    updateUser: updateUser(api),
    getAllTask: getAllTask(api),
    addTask: addTask(api),
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
const getCurrentUser = (api: AxiosInstance) => async (): Promise<User | undefined> => {
  const res = await api.get<User>("/user/me")

  return res.data
}
type LogoutReponse = {
  success: boolean
}

const logout = (api: AxiosInstance) => async (): Promise<LogoutReponse | undefined> => {
  const res = await api.get<LogoutReponse>("/user/logout")

  return res.data
}
export type UpdateUserRequest = {
  name: string
  age: number
  email: string
}
const updateUser =
  (api: AxiosInstance) =>
  async (data: UpdateUserRequest): Promise<User | undefined> => {
    const res = await api.put<UpdateUserReponse>("/user/me", data)

    return res.data.data
  }
type AllTaskReponse = {
  count: number
  data: Task[]
}
const getAllTask = (api: AxiosInstance) => async (): Promise<Task[] | undefined> => {
  const res = await api.get<AllTaskReponse>("/task")

  return res.data.data
}
type AddTaskReponse = {
  success: boolean
  data: Task
}
const addTask =
  (api: AxiosInstance) =>
  async (description: string): Promise<Task | undefined> => {
    const res = await api.post<AddTaskReponse>("/task", { description })

    return res.data.data
  }
