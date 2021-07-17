import { Fab } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Router } from "react-router"
import styled from "styled-components"
import { NavBar } from "../components/NavBar"
import { TaskItem } from "../components/tasks/TaskItem"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import { MainLayout } from "../layouts/MainLayout"
import { Task } from "../services/api/types/Task"
import { Error, Loading } from "./Register"
import AddIcon from "@material-ui/icons/Add"
import { NewTask } from "../components/tasks/NewTask"

export const HomePage: React.FC = (props) => {
  const [listTask, setListTask] = useState<Task[]>([])
  const api = useAppApiClient()
  const { run, loading, result, error } = useAsync(api.getAllTask)

  const addTaskHandler = (task: Task) => {
    setListTask([...listTask, task])
  }
  useEffect(() => {
    run()
  }, [])
  useEffect(() => {
    if (result) setListTask(result)
  }, [result])
  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        {loading && <Loading>Loading...</Loading>}
        {error && <Error>{error}</Error>}
        {listTask.map((task: Task) => (
          <TaskItem key={task._id} task={task}></TaskItem>
        ))}
      </Main>
      <NewTask onAddTask={addTaskHandler}></NewTask>
    </MainLayout>
  )
}
const Main = styled.main`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  
`
