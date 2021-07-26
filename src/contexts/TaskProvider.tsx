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
}>({
  tasks: [],
  addTask: (newTask: Task) => {},
  loading: false,
})
export const TaskProvider: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([])
  const api = useAppApiClient()

  const getAllTask = useAsync(api.getAllTask, true)
  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask])
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
    loading: getAllTask.loading,
  }
  return (
    <TaskContext.Provider value={contextValue}>
      {props.children}

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
