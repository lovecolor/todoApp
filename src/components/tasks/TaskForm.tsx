import React, { ReactElement, useContext } from "react"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { Button, CircularProgress, FormControlLabel, Paper } from "@material-ui/core"
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


export type TaskFormProps = {
  task?: Task
  submitLabel: string
  apiFuntion: (data: any) => any
  onAction: (task: Task) => void
  btnOpen: ReactElement
}
export const TaskForm = (props: TaskFormProps) => {
   
  const { enqueueSnackbar } = useSnackbar()
  const { submitLabel, apiFuntion, onAction, task } = props
  const submit = useAsync(async (data) => {
    const result = await apiFuntion(data)
    if (result) {
      onAction(result)
      enqueueSnackbar(`${submitLabel} success!`, { variant: "success" })
      handleClose()
    } else {
      enqueueSnackbar(`${submitLabel} failure!`, { variant: "error" })
    }
  })
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
    const requestData = task ? { id: task._id, data: newTask } : newTask

    submit.run(requestData)
  }

  return (
    <div>
      <div onClick={handleOpen}>{props.btnOpen}</div>
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
          <Form onSubmit={submitHandler}>
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

            {submit.loading ? (
              <Spinner></Spinner>
            ) : (
              <Actions>
                <CustomButton type="submit">{submitLabel}</CustomButton>
                <Button onClick={handleClose} variant="contained">
                  Cancel
                </Button>
              </Actions>
            )}
          </Form>
        </CustomPaper>
      </Modal>
    </div>
  )
}
const Spinner = styled(CircularProgress)`
  margin: auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
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
