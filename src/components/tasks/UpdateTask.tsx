import React from "react"
import EditIcon from "@material-ui/icons/Edit"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { TaskForm } from "./TaskForm"
import { useState } from "react"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { Task } from "../../services/api/types/Task"

export const UpdateTask: React.FC<{ task: Task; onUpdate: (task: Task) => void }> = (props) => {
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
      onAction={props.onUpdate}
      apiFuntion={api.updateTask}
    >
      <ButtonPrimary onClick={handleOpen} variant="contained" color="primary" startIcon={<EditIcon />}>
        Edit
      </ButtonPrimary>
    </TaskForm>
  )
}
