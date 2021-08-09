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
  addTask: (newTask: Task) => void
  updateTask: (task: Task) => void
  removeTask: (taskId: string) => void
}>({
  tasks: [],
  addTask: (newTask: Task) => {},
  updateTask: (task: Task) => {},
  loading: false,
  removeTask: (taskId: string) => {},
})
export const TaskProvider: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()

  const getAllTasks = useAsync(()=>api.getAllTasks({limit:8,skip:0}), true)
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
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
    if (getAllTasks.result) setTasks(getAllTasks.result)
  }, [getAllTasks.result])
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    removeTask,
    loading: getAllTasks.loading,
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
