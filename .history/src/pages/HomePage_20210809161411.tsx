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
  const [load, setLoad] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  let currentPage = queryParams.get("page") || 1
  currentPage = +currentPage

  const changePage = async (index) => {
    if (index <= 0) return
    if (index > currentPage && taskCtx.tasks.length === +currentPage * taskCtx.perLoad) {
      setLoad(true)
      const result = await api.getAllTasks({
        limit: taskCtx.perLoad,
        skip: +currentPage * taskCtx.perLoad,
      })
      if (result) {
        if (result.length === 0) {
          enqueueSnackbar("You are in last page!", { variant: "info" })
          // setLoad(false)
          return
        } else taskCtx.addTask(...result)
      } else {
        enqueueSnackbar("Something is wrong!", { variant: "error" })
        // setLoad(false)
        return
      }
    }

    history.push({
      pathname: location.pathname,
      search: `?page=${index}`,
    })
  }
  return (
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        <Spinner/>
        {load && <CircularProgress></CircularProgress>}
        {+currentPage > 1 && (
          <PrevBtn onClick={() => changePage(+currentPage - 1)}>
            <ChevronLeftIcon fontSize="large" />
          </PrevBtn>
        )}
        {currentPage * taskCtx.perLoad <= taskCtx.tasks.length && (
          <NextBtn onClick={() => changePage(+currentPage + 1)}>
            <ChevronRightIcon fontSize="large" />
          </NextBtn>
        )}
        {taskCtx.loading && <Loading>Loading...</Loading>}
        <TaskList
          list={taskCtx.tasks.slice(
            (currentPage - 1) * taskCtx.perLoad,
            (currentPage - 1) * taskCtx.perLoad + taskCtx.perLoad
          )}
        ></TaskList>
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
const Spinner = styled(CircularProgress)`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  
`
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
