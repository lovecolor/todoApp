import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import styled from "styled-components"
import { Error } from "../components/text/Error"
import { Loading } from "../components/text/Loading"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { Task } from "../services/api/types/Task"

const TaskContext = createContext<{
  tasks: Task[]
  loading: boolean
  addTask: (...tasks: Task[]) => void
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
  perLoad: number
}>({
  tasks: [],
  addTask: (...tasks: Task[]) => {},
  updateTask: (task: Task) => {},
  loading: false,
  removeTask: (taskId: string) => {},
  perLoad: 8,
})
export const TaskProvider: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()
  const perLoad = 8

  const getAllTasks = useAsync(() => api.getAllTasks({ limit, skip }), true)

  const addTask = (...newTasks: Task[]) => {
    setTasks(tasks.concat(newTasks))
  }

  const updateTask = (editedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
    setTasks(updatedTasks)
  }
  const removeTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task._id != taskId)
    setTasks(newTasks)
  }
  useEffect(() => {
    if (getAllTasks.result) setTasks(tasks.concat(getAllTasks.result))
  }, [getAllTasks.result])
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    removeTask,
    loading: getAllTasks.loading,
    perLoad,
  }
  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}
      {getAllTasks.error && <Error>{getAllTasks.error}</Error>}
      {!getAllTasks.loading && tasks.length == 0 && <NoResult>Without any task</NoResult>}
    </TaskContext.Provider>
  )
}
const NoResult = styled.p`
  width: 100%;
  text-align: center;
  color: lightgray;
  user-select: none;
`
export default TaskContext
