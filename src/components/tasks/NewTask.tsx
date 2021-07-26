import React from "react"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import styled from "styled-components"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { TaskForm } from "./TaskForm"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"

export const NewTask = () => {
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  return (
    <TaskForm
      label={
        <CustomFloatBtn color="primary" aria-label="add">
          <AddIcon />
        </CustomFloatBtn>
      }
      submitLabel="Add"
      onAction={taskCtx.addTask}
      apiFuntion={api.addTask}
    ></TaskForm>
  )
}

const CustomFloatBtn = styled(Fab)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
