import { AxiosInstance } from "axios"
import { User } from "./types/User"
import { LoginRequest } from "./types/LoginRequest"
import { RegisterRequest } from "./types/RegisterRequest"
import { UpdateUserReponse } from "./types/UpdateUserResponse"
import { Task } from "./types/Task"
import { UpdateUserRequest } from "./types/UpdateUserRequest"

export const createAppApiClient = (api: AxiosInstance) => {
  return {
    login: login(api),
    register: register(api),
    getCurrentUser: getCurrentUser(api),
    logout: logout(api),
    updateUser: updateUser(api),
    getAllTasks: getAllTasks(api),
    addTask: addTask(api),
    updateTask: updateTask(api),
    removeTask: removeTask(api),
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
type AllTaskReponse = {
  count: number
  data: Task[]
}
type AllTaskRequest = {
  skip?: number
  limit?: number
}
const getAllTasks =
  (api: AxiosInstance) =>
  async (params: AllTaskRequest): Promise<Task[] | undefined> => {
    try {
      const res = await api.get<AllTaskReponse>("/task")

      return res.data.data
    } catch (error) {}
  }
type AddTaskReponse = {
  success: boolean
  data: Task
}
type AddTaskRequest = {
  description: string
  completed?: boolean
}
const addTask =
  (api: AxiosInstance) =>
  async (data: AddTaskRequest): Promise<Task | undefined> => {
    try {
      const res = await api.post<AddTaskReponse>("/task", data)

      return res.data.data
    } catch (error) {}
  }
type UpdateTaskRequest = {
  id: string
  data: {
    description?: string
    completed?: boolean
  }
}
const updateTask =
  (api: AxiosInstance) =>
  async (req: UpdateTaskRequest): Promise<Task | undefined> => {
    try {
      const res = await api.put<AddTaskReponse>(`/task/${req.id}`, req.data)

      return res.data.data
    } catch (error) {}
  }
type RemoveTaskReponse = {
  success: boolean
  data: Task
}
const removeTask =
  (api: AxiosInstance) =>
  async (req: string): Promise<RemoveTaskReponse | undefined> => {
    try {
      const res = await api.delete<RemoveTaskReponse>(`/task/${req}`)

      return res.data
    } catch (error) {}
  }
