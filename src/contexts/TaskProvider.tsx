import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import styled from "styled-components"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { Error, Loading } from "../pages/Register"
import { Task } from "../services/api/types/Task"

const TaskContext = createContext<{
  tasks: Task[]
  addTask: (newTask: Task) => void
  updateTask: (editedTask: Task) => void
  deleteTask: (id: string) => void
}>({
  tasks: [],
  addTask: (newTask: Task) => {},
  updateTask: (editedTask: Task) => {},
  deleteTask: (id: string) => {},
})

export const TaskProvider: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()
  const getAllTask = useAsync(api.getAllTask)
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }
  const updateTask = (editedTask: Task) => {
    const taskIdx = tasks.findIndex((task) => task._id == editedTask._id)
    setTasks([...tasks.slice(0, taskIdx), editedTask, ...tasks.slice(taskIdx + 1)])
  }
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task._id != id))
  }
  useEffect(() => {
    getAllTask.run()
  }, [])
  useEffect(() => {
    if (getAllTask.result) setTasks(getAllTask.result)
  }, [getAllTask.result])
  const contextValue = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
  }
  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}
      {getAllTask.loading && <Loading>Loading...</Loading>}
      {getAllTask.error && <Error>{getAllTask.error}</Error>}
      {!getAllTask.loading && tasks.length == 0 && <NoResult>Without any task</NoResult>}
    </TaskContext.Provider>
  )
}
const NoResult = styled.p`
  width: 100%;
  text-align: center;
  color: lightgray;
`
export default TaskContext
