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
import { Fab } from "@material-ui/core"
import { FabPrimary } from "../fab/FabPrimary"
import { useHistory, useLocation } from "react-router"

export const HomePage: React.FC = (props) => {
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentPage = queryParams.get("page") || 1
  const changePage=(index:number)=>{
    history.push({
      pathname:location.pathname,
      search:`?`
    })
  }
  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        <PrevBtn>
          <ChevronLeftIcon fontSize="large" />
        </PrevBtn>
        <NextBtn>
          <ChevronRightIcon fontSize="large" />
        </NextBtn>
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
`
