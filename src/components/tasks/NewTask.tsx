import React from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { Button, Fab, Paper } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import { useState } from "react"
import styled from "styled-components"
import { TextFieldOutlined } from "../textfields/TextFieldOutlined"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { CustomAlert, CustomButton } from "../../pages/UserProfile"
import { useAppApiClient } from "../../hooks/useAppApiClient"
import useAsync from "../../hooks/useAsync"
import { useEffect } from "react"
import { Error, Loading } from "../../pages/Register"
import { Task } from "../../services/api/types/Task"
import { TaskForm } from "./TaskForm"
import { useContext } from "react"
import TaskContext from "../../contexts/TaskProvider"

export const NewTask = () => {
  const taskCtx = useContext(TaskContext)
  const api = useAppApiClient()

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <TaskForm btnLabel="Add" onAction={taskCtx.addTask} apiFuntion={api.addTask} open={open} setOpen={setOpen}>
      <CustomFloatBtn onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </CustomFloatBtn>
    </TaskForm>
  )
}

const CustomFloatBtn = styled(Fab)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
