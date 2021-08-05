import React from "react"
import Card from "@material-ui/core/Card"

import { Button, CircularProgress } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import styled from "styled-components"
import { Task } from "../../services/api/types/Task"
import useAsync from "../../hooks/useAsync"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { useEffect } from "react"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { useSnackbar } from "notistack"
import { TaskForm } from "./TaskForm"

export type TaskItemProps = {
  task: Task
}
export const TaskItem = (props: TaskItemProps) => {
  const { task } = props
  const { enqueueSnackbar } = useSnackbar()
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  const changeStatusHandler = () => {
    const completed = !task.completed
    taskCtx.updateTask({
      ...task,
      completed: !task.completed,
    })
  }

  return (
    <CustomCard>
      <CardContent>
        <Description>{task.description}</Description>
        <Status onClick={changeStatusHandler} completed={task.completed}>
          Completed
        </Status>
      </CardContent>
      <CardActions>
        <TaskForm
          task={task}
          btnOpen={<ButtonPrimary startIcon={<EditIcon />}>Edit</ButtonPrimary>}
          submitLabel="Update"
          onSubmit={taskCtx.updateTask}
        ></TaskForm>
        <CustomButton variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </CustomButton>
      </CardActions>
    </CustomCard>
  )
}
const CustomButton = styled(Button)`
  margin-left: 0.5rem;
`
const CardActions = styled.div`
  margin-top: auto;
  flex-shrink: 0;
  padding-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const CustomCard = styled(Card)`
  padding: 1rem;
  overflow: hidden;
  width: 100%;
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
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 17rem;
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
  border-bottom: 1px solid ${(props) => (props.completed ? "green" : "lightgray")};
  border-top: 1px solid ${(props) => (props.completed ? "green" : "lightgray")};
  transition: 0.25s ease;
  user-select: none;
`
