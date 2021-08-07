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
import { useAppApiClient } from "../hooks/useAppApiClient"
import useAsync from "../hooks/useAsync"
import AddIcon from "@material-ui/icons/Add"
import { TaskForm } from "../components/tasks/TaskForm"
import { Fab } from "@material-ui/core"

export const HomePage: React.FC = (props) => {
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        {taskCtx.loading && <Loading>Loading...</Loading>}
        <TaskList list={taskCtx.tasks}></TaskList>
        <TaskForm
          btnOpen={
            <CustomFloatBtn color="primary" aria-label="add">
              <AddIcon />
            </CustomFloatBtn>
          }
          submitLabel="Add"
          onAction={taskCtx.addTask}
          apiFuntion={api.addTask}
        ></TaskForm>
      </Main>
    </MainLayout>
  )
}
const CustomFloatBtn = styled(Fab)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
const Main = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
