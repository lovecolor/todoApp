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
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { useSnackbar } from "notistack"
import { TaskForm } from "./TaskForm"

export type TaskItemProps = {
  task: Task
  onEdit: (editedTask: Task) => void
  onRemove: () => void
}
export const TaskItem = (props: TaskItemProps) => {
  const { task, onEdit, onRemove } = props
  const { enqueueSnackbar } = useSnackbar()
  const api = useAppApiClient()

  const changeStatus = useAsync(async () => {
    const completed = !task.completed
    const result = await api.updateTask({
      id: task._id!,
      data: {
        completed,
      },
    })

    if (result) onEdit(result)
  })
  const removeTask = useAsync(async () => {
    const result = await api.removeTask(task._id!)
    if (result) {
      onRemove()
      enqueueSnackbar("Delete success!", { variant: "success" })
    } else {
      enqueueSnackbar("Delete failure!", { variant: "error" })
    }
  })

  return (
    <CustomCard>
      {(removeTask.loading || changeStatus.loading) && <Spinner />}
      <CardContent>
        <Description>{task.description}</Description>
        <Status onClick={() => changeStatus.run()} completed={task.completed}>
          Completed
        </Status>
      </CardContent>
      <CardActions>
        <TaskForm
          task={task}
          btnOpen={<ButtonPrimary startIcon={<EditIcon />}>Edit</ButtonPrimary>}
          submitLabel="Update"
          onAction={onEdit}
          apiFuntion={api.updateTask}
        ></TaskForm>
        <CustomButton onClick={() => removeTask.run()} variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </CustomButton>
      </CardActions>
    </CustomCard>
  )
}
const Spinner = styled(CircularProgress)`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
`
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
  position: relative;
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
