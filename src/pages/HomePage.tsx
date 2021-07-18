import { Fab } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Router } from "react-router"
import styled from "styled-components"
import { NavBar } from "../components/NavBar"
import { TaskItem } from "../components/tasks/TaskItem"
import { TaskList } from "../components/tasks/TaskList"
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
  const updateTaskHandler = (editedTask: Task) => {
    const idEdit = listTask.findIndex((task) => task._id === editedTask._id)

    setListTask([...listTask.slice(0, idEdit), editedTask, ...listTask.slice(idEdit + 1)])
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
        <TaskList></TaskList>
        <NewTask></NewTask>
      </Main>
    </MainLayout>
  )
} 

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
