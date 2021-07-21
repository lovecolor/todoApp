import { useEffect } from "react"
import { useState } from "react"
import { createContext } from "react"
import styled from "styled-components"
import { Error } from "../components/text/Error"
import { Loading } from "../components/text/Loading"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
// import { Error, Loading } from "../pages/Register"
import { Task } from "../services/api/types/Task"

const TaskContext = createContext<{
  tasks: Task[]
}>({
  tasks: [],
})

export const TaskProvider: React.FC = (props) => {
  const [tasks, setTasks] = useState([])
  const api = useAppApiClient()
  const getAllTask = useAsync(api.getAllTask)
  useEffect(() => {
    getAllTask.run()
  }, [])
  useEffect(() => {
    if (getAllTask.result) setTasks(getAllTask.result)
  }, [getAllTask.result])
  const contextValue = {
    tasks,
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
