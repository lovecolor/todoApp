import React from "react"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import styled from "styled-components"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import { TaskForm } from "./TaskForm"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"
import { useSnackbar } from "notistack"

export const NewTask = () => {
  const { enqueueSnackbar } = useSnackbar()
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()
  const handleSubmit = async (data) => {
    const result = await api.addTask(data)
    if (result) {
      taskCtx.addTask(result)
      enqueueSnackbar(`Add success!`, { variant: "success" })
    } else {
      enqueueSnackbar(`Add failure!`, { variant: "error" })
      throw new Error("Add failure!")
    }
  }
  return (
    <TaskForm
      label={
        <CustomFloatBtn color="primary" aria-label="add">
          <AddIcon />
        </CustomFloatBtn>
      }
      submitLabel="Add"
      apiFuntion={handleSubmit}
    ></TaskForm>
  )
}

const CustomFloatBtn = styled(Fab)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
