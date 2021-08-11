import { useEffect } from "react"
import { useState } from "react"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
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
import { CircularProgress, Fab } from "@material-ui/core"
import { FabPrimary } from "../fab/FabPrimary"
import { useHistory, useLocation } from "react-router"
import { useSnackbar } from "notistack"

export const HomePage: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  const changePage = async (newPage) => {
    if (newPage <= 0) return
    taskCtx.patchPage(newPage)
  }
  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        {taskCtx.page > 1 && (
          <PrevBtn onClick={() => changePage(taskCtx.page - 1)}>
            <ChevronLeftIcon fontSize="large" />
          </PrevBtn>
        )}
        {taskCtx.tasks.length === taskCtx.perLoad && (
          <NextBtn onClick={() => changePage(taskCtx.page + 1)}>
            <ChevronRightIcon fontSize="large" />
          </NextBtn>
        )}
        {taskCtx.loading && <Loading>Loading...</Loading>}
        <TaskList list={taskCtx.tasks}></TaskList>
        <TaskForm
          btnOpen={
            <AddTaskBtn>
              <AddIcon />
            </AddTaskBtn>
          }
          submitLabel="Add"
          onAction={taskCtx.addTask}
          apiFuntion={api.addTask}
        ></TaskForm>
      </Main>
    </MainLayout>
  )
}

const PrevBtn = styled(FabPrimary)`
  position: fixed;
  top: 50%;
  left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NextBtn = styled(FabPrimary)`
  position: fixed;
  top: 50%;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const AddTaskBtn = styled(FabPrimary)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
const Main = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`
