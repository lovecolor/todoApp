import React from "react"
import EditIcon from "@material-ui/icons/Edit"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { TaskForm } from "./TaskForm"
import { useState } from "react"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { Task } from "../../services/api/types/Task"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"

export const UpdateTask: React.FC<{ task: Task }> = (props) => {
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <TaskForm
      task={props.task}
      btnLabel="Update"
      open={open}
      setOpen={setOpen} 
      onAction={taskCtx.updateTask}
      apiFuntion={api.updateTask}
    >
      <ButtonPrimary onClick={handleOpen} variant="contained" color="primary" startIcon={<EditIcon />}>
        Edit
      </ButtonPrimary>
    </TaskForm>
  )
}
