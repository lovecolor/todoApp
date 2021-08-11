import { useSnackbar } from "notistack"
import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import styled from "styled-components"
import { Error } from "../components/text/Error"
import { Loading } from "../components/text/Loading"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import useQuery from "../hooks/useQuery"
import { Task } from "../services/api/types/Task"

const TaskContext = createContext<{
  tasks: Task[]
  loading: boolean
  addTask: (...tasks: Task[]) => void
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
  patchPage: (page: number) => void
  page: number
  perLoad: number
}>({
  tasks: [],
  addTask: (...tasks: Task[]) => {},
  updateTask: (task: Task) => {},
  loading: false,
  removeTask: (taskId: string) => {},
  patchPage: (page: number) => {},
  page: 1,
  perLoad: 8,
})
export const TaskProvider: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()
  const perLoad = 8
  const { query, patchQuery } = useQuery<{ page: number }>({ page: 1 })
  const patchPage = (newPage: number) => {
    patchQuery({
      page: newPage,
    })
  }
  const getAllTasks = useAsync(() => api.getAllTasks({ limit: perLoad, skip: (query.page - 1) * perLoad }), true)

  const addTask = (newTasks: Task) => {
    if (tasks.length < perLoad) setTasks([...tasks, newTasks])
  }

  const updateTask = (editedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
    setTasks(updatedTasks)
  }
  const removeTask = (taskId: string) => {
    getAllTasks.run()
  }
  useEffect(() => {
    getAllTasks.run()
  }, [query.page])
  useEffect(() => {
    if (getAllTasks.result) {
      if (getAllTasks.result.length > 0) {
        setTasks(getAllTasks.result)
      } else {
        patchPage(query.page - 1)
        enqueueSnackbar("You are in last page!", { variant: "info" })
      }
    }
  }, [getAllTasks.result])
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    removeTask,
    loading: getAllTasks.loading,
    patchPage,
    page: query.page,
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
