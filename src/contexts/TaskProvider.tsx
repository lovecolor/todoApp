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
  removeTask: (taskId: number) => void
}>({
  tasks: [],
  addTask: (newTask: Task) => {},
  updateTask: (task: Task) => {},
  loading: false,
  removeTask: (taskId: number) => {},
})
export const TaskProvider: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()

  const getAllTasks = useAsync(api.getAllTasks)
  const addTask = (newTask: Task) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        _id: tasks.length === 0 ? 0 : tasks[tasks.length - 1]._id! + 1,
      },
    ])
  }
  const updateTask = (editedTask: Task) => {
    const editedTaskIndex = tasks.findIndex((task) => task._id === editedTask._id)
    if (editedTaskIndex < 0) {
      enqueueSnackbar("Edit failure!", { variant: "error" })
      return
    }
    const updatedTasks = tasks.map((task) => (task._id === editedTaskIndex ? editedTask : task))
    setTasks(updatedTasks)
  }
  const removeTask = (taskId: number) => {
    const newTasks = tasks.filter((task) => task._id != taskId)
    if (newTasks.length === tasks.length - 1) {
      setTasks(newTasks)
      enqueueSnackbar("Delete success!", {
        variant: "success",
      })
    } else {
      enqueueSnackbar("Delete failure!", {
        variant: "error",
      })
    }
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
