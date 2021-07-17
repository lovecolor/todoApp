import { Fab, FormControl, FormControlLabel, InputLabel, Select } from "@material-ui/core"
import { useEffect } from "react"
import { useState } from "react"
import { Router, useHistory, useLocation } from "react-router"
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

const filterTasks = (tasks: Task[], status) => {
  if (status === "All") return tasks
  const isCompleted = status == "Completed"
  return tasks.filter((task) => task.completed == isCompleted)
}
export const HomePage: React.FC = (props) => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const currentStatus = queryParams.get("status")

  const [listTask, setListTask] = useState<Task[]>([])
  const filtedTasks: Task[] = filterTasks(listTask, currentStatus)
  const api = useAppApiClient()
  const { run, loading, result, error } = useAsync(api.getAllTask)
  const [status, setStatus] = useState("All")
  const changeStatusHandler = (e) => {
    const { value } = e.target
    setStatus(value)
    history.push({
      pathname: location.pathname,
      search: `?status=${value}`,
    })
  }
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
        <Actions>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              value={status}
              onChange={changeStatusHandler}
              label="Status"
              inputProps={{
                name: "status",
              }}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
            </Select>
          </FormControl>
        </Actions>
        {loading && <Loading>Loading...</Loading>}
        {error && <Error>{error}</Error>}
        {filtedTasks.map((task: Task) => (
          <TaskItem onUpdate={updateTaskHandler.bind(null)} key={task._id} task={task}></TaskItem>
        ))}
        <NewTask onAddTask={addTaskHandler}></NewTask>
      </Main>
    </MainLayout>
  )
}
const Main = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`
const Actions = styled.div`
  width: 100%;
  padding: 1rem;
`
