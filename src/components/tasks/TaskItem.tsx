import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import { CustomSpan } from "../../pages/UserProfile"
import { Button, CircularProgress } from "@material-ui/core"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import styled from "styled-components"
import { Task } from "../../services/api/types/Task"
import { UpdateTask } from "./UpdateTask"
import useAsync from "../../hooks/useAsync"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { useEffect } from "react"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"

export const TaskItem: React.FC<{
  task: Task
}> = (props) => {
  const { task } = props
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()
  const updateTask = useAsync(api.updateTask)
  const deleteTask = useAsync(api.deleteTask)
  const deleteTaskHandler = () => {
    deleteTask.run(task._id)
  }
  const changeStatusHandler = () => {
    const completed = !task.completed
    updateTask.run({
      id: task._id,
      data: {
        completed,
      },
    })
  }
  useEffect(() => {
    if (updateTask.result) taskCtx.updateTask(updateTask.result)
  }, [updateTask.result])
  useEffect(() => {
    if (deleteTask.result) taskCtx.deleteTask(task._id)
  }, [deleteTask.result])

  return (
    <CustomCard>
      {(updateTask.loading || deleteTask.loading) && <Spinner></Spinner>}
      <CustomCardContent>
        <Description>{task.description}</Description>
        <Status onClick={changeStatusHandler} completed={task.completed}>
          Completed
        </Status>
      </CustomCardContent>
      <CardActions>
        <UpdateTask task={task}></UpdateTask>
        <Button onClick={deleteTaskHandler} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </CustomCard>
  )
}
const Spinner = styled(CircularProgress)`
  position: fixed;
  z-index: 11;
  top: 50%;
  left: 50%;
`
const CustomCard = styled(Card)`
  margin: 1rem;
  width: 275px;
  margin: 1rem;
  animation: bump 0.3s ease-out;
  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`
const CustomCardContent = styled(CardContent)`
  height: 20rem;
`
const Description = styled.div`
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  width: 100%;
  height: 80%;
`
const Status = styled.div<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "green" : "lightgray")};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  transition: 0.25s ease;
`
