import React, { ReactElement } from "react"
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

export type TaskFormProps = {
  task?: Task
  submitLabel: string

  apiFuntion: (...data: any) => any
  label: ReactElement
}
export const TaskForm = (props: TaskFormProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const { apiFuntion, submitLabel } = props
  const { run, loading, error } = useAsync(async (data) => {
    try {
      await apiFuntion(data)
      handleClose()
    } catch (error) {}
  })
  const [description, setDescription] = useState(props.task?.description || "")
  const [completed, setCompleted] = useState(props.task?.completed || false)
  const changeDescriptionHanndler = (e) => {
    setDescription(e.target.value)
  }
  const changeStatusHandler = (e) => {
    setCompleted(e.target.checked)
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const value = description.trim()
    if (value.length === 0) return

    const data = {
      description: value,
      completed,
    }
    const requestData = props.task ? { id: props.task._id, data } : data

    run(requestData)
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
            {loading && <Loading>Loading...</Loading>}
            {error && <Error>{error}</Error>}
            {!loading && (
              <Actions>
                <CustomButton type="submit">{submitLabel}</CustomButton>
                <Button onClick={handleClose} variant="contained">
                  Cancel
                </Button>
              </Actions>
            )}
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