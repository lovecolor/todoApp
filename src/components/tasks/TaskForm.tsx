import React, { ReactElement, useContext } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { Button, FormControlLabel, Paper } from "@material-ui/core"
import { useState } from "react"
import styled from "styled-components"
import { TextFieldOutlined } from "../textfields/TextFieldOutlined"
import { useEffect } from "react"
import { Task } from "../../services/api/types/Task"
import { Loading } from "../text/Loading"
import { Error } from "../text/Error"
import useAsync from "../../hooks/useAsync"
import { ButtonPrimary } from "../buttons/ButtonPrimary"
import { useSnackbar } from "notistack"
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox"
import TaskContext from "../../contexts/TaskProvider"

export type TaskFormProps = {
  task?: Task
  submitLabel: string
  onSubmit: (task: Task) => void

  label: ReactElement
}
export const TaskForm = (props: TaskFormProps) => {
  const taskCtx = useContext(TaskContext)
  const { enqueueSnackbar } = useSnackbar()
  const { submitLabel, onSubmit, task } = props
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [description, setDescription] = useState(task?.description || "")
  const [completed, setCompleted] = useState(task?.completed || false)

  const changeDescriptionHanndler = (e) => {
    setDescription(e.target.value)
  }
  const changeStatusHandler = (e) => {
    setCompleted(e.target.checked)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const value = description.trim()
    if (value.length === 0) return

    const newTask = {
      description: value,
      completed,
    }
    const requestData = task ? { ...newTask, _id: task._id } : newTask

    onSubmit(requestData)
    enqueueSnackbar(`${submitLabel} success!`, { variant: "success" })
    handleClose()
  }

  return (
    <div>
      <div onClick={handleOpen}>{props.label}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CustomPaper>
          <form onSubmit={submitHandler}>
            <TextFieldOutlined
              autoFocus
              value={description}
              onChange={changeDescriptionHanndler}
              required
              label="Description"
              multiline
              fullWidth
              rows={4}
            ></TextFieldOutlined>
            <FormControlLabel
              control={<StatusCheckbox checked={completed} onChange={changeStatusHandler} name="completed" />}
              label="Completed"
            />

            <Actions>
              <CustomButton type="submit">{submitLabel}</CustomButton>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
            </Actions>
          </form>
        </CustomPaper>
      </Modal>
    </div>
  )
}
const CustomPaper = styled(Paper)`
  max-width: 30rem;
  margin: auto;
  margin-top: 3rem;
  padding: 1rem;
`
const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const CustomButton = styled(ButtonPrimary)`
  margin-right: 1rem;
`
const StatusCheckbox = styled(Checkbox).attrs((props) => ({ ...props, color: "default" }))`
  color: green;
`
