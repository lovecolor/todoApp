import React from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import { Button, CircularProgress } from "@material-ui/core"
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
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { useSnackbar } from "notistack"

export type TaskItemProps = {
  task: Task
  id: number
}
export const TaskItem = (props: TaskItemProps) => {
  const { task } = props
  const { enqueueSnackbar } = useSnackbar()
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  const changeStatusHandler = () => {
    const completed = !task.completed
    try {
      taskCtx.updateTask({
        id: props.id,
        newData: {
          ...task,
          completed,
        },
      })
    } catch (error) {
      enqueueSnackbar("Something is wrong!", { variant: "error" })
    }
  }

  return (
    <CustomCard>
      <CustomCardContent>
        <Description>{task.description}</Description>
        <Status onClick={changeStatusHandler} completed={task.completed}>
          Completed
        </Status>
      </CustomCardContent>
      <CardActions>
        <UpdateTask id={props.id}></UpdateTask>
        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </CustomCard>
  )
}

const CustomCard = styled(Card)`
  --columns: 5;
  overflow: hidden;
  width: calc(calc(100% / var(--columns)) - 20px);
  margin-left: 20px;
  margin-bottom: 20px;
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
  @media screen and (max-width: 1023px) {
    --columns: 2;
  }
  @media screen and (max-width: 767px) {
    --columns: 1;
  }
`
const CustomCardContent = styled(CardContent)`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
`
const Description = styled.div`
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 500;
  flex: 1;
`
const Status = styled.div<{ completed: boolean }>`
  color: ${(props) => (props.completed ? "green" : "lightgray")};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.5rem 0;
  flex-shrink: 0;
  margin-top: auto;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid lightgray;
  transition: 0.25s ease;
`
