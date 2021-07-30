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
  updateTask: (data: { id: number; newData: Task }) => void
}>({
  tasks: [],
  addTask: (newTask: Task) => {},
  updateTask: (data: { id: number; newData: Task }) => {},
  loading: false,
})
export const TaskProvider: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()

  const getAllTasks = useAsync(api.getAllTasks)
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }
  const updateTask = (data: { id: number; newData: Task }) => {
    setTasks([...tasks.slice(0, data.id), data.newData, ...tasks.slice(data.id + 1)])
  }
  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  useEffect(() => {
    if (getAllTasks.result) setTasks(getAllTasks.result)
  }, [getAllTasks.result])
  const contextValue = {
    tasks,
    addTask,
    updateTask,
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
`
export default TaskContext
