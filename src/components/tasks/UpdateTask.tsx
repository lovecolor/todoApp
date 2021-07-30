import React from "react"
import EditIcon from "@material-ui/icons/Edit"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { TaskForm } from "./TaskForm"
import { useState } from "react"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { Task } from "../../services/api/types/Task"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"

export type UpdateTaskProps = {
  id: number
}
export const UpdateTask = (props: UpdateTaskProps) => {
  const taskCtx = useContext(TaskContext)

  const btnEdit = <ButtonPrimary startIcon={<EditIcon />}>Edit</ButtonPrimary>
  return <TaskForm label={btnEdit} id={props.id} submitLabel="Update" onAction={taskCtx.updateTask}></TaskForm>
}
