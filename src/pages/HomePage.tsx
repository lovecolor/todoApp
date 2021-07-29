import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import { useContext } from "react"
import { NavBar } from "../components/NavBar"
import { TaskList } from "../components/tasks/TaskList"
import { Loading } from "../components/text/Loading"
import TaskContext from "../contexts/TaskProvider"
import { MainLayout } from "../layouts/MainLayout"
import { Task } from "../services/api/types/Task"
import { NewTask } from "../components/tasks/NewTask"
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"

export const HomePage: React.FC = (props) => {
  const taskCtx = useContext(TaskContext)

  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        {taskCtx.loading && <Loading>Loading...</Loading>}
        <TaskList list={taskCtx.tasks}></TaskList>
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
