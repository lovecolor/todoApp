import { useEffect } from "react"
import { useState } from "react"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import styled from "styled-components"
import { NavBar } from "../components/NavBar"
import { TaskList } from "../components/tasks/TaskList"
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
import useQuery from "../hooks/useQuery"

export const HomePage: React.FC = (props) => {
  const { enqueueSnackbar } = useSnackbar()
  const api = useAppApiClient()
  const history = useHistory()
  const location = useLocation()
  const perLoad = 8
  const queryParams = new URLSearchParams(location.search)
  const currentPage = queryParams.get("page") || 1
  const { query, patchQuery } = useQuery<{ page: number }>({
    page: +currentPage,
  })
  const [tasks, setTasks] = useState<Task[]>([])

  const getTasks = useAsync(async () => {
    const result = await api.getAllTasks({
      limit: perLoad,
      skip: (query.page - 1) * perLoad,
    })
    if (result) {
      setTasks(result)
    } else {
      enqueueSnackbar("Something is wrong!", { variant: "error" })
    }
  }, true)
  const handleAddTask = (newTask: Task) => {
    if (tasks.length < perLoad) setTasks([...tasks, newTask])
  }
  const handleEditTask = (editedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task._id === editedTask._id ? editedTask : task))
    setTasks(updatedTasks)
  }
  const handleRemoveTask = () => {
    getTasks.run()
  }
  const changePage = async (newPage) => {
    if (newPage <= 0) return
    patchQuery({
      page: newPage,
    })
    history.push({
      pathname: location.pathname,
      search: `?page=${newPage}`,
    })
  }
  useEffect(() => {
    getTasks.run()
  }, [query.page])
  return ( 
    <MainLayout>
      <NavBar></NavBar>
      <Main>
        {getTasks.loading && (
          <Spinner>
            <CircularProgress />
          </Spinner>
        )}
        {query.page > 1 && (
          <PrevBtn onClick={() => changePage(query.page - 1)}>
            <ChevronLeftIcon fontSize="large" />
          </PrevBtn>
        )}
        {tasks.length === perLoad && (
          <NextBtn onClick={() => changePage(query.page + 1)}>
            <ChevronRightIcon fontSize="large" />
          </NextBtn>
        )}

        <TaskList handleEditTask={handleEditTask} handleRemoveTask={handleRemoveTask} list={tasks}></TaskList>
        <TaskForm
          btnOpen={
            <AddTaskBtn>
              <AddIcon />
            </AddTaskBtn>
          }
          submitLabel="Add"
          onAction={handleAddTask}
          apiFuntion={api.addTask}
        ></TaskForm>
      </Main>
    </MainLayout>
  )
}
const Spinner = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
