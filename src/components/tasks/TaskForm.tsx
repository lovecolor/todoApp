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

export const TaskForm: React.FC<{
  task?: Task
  btnLabel: string
  onAction: (...data: any) => void
  apiFuntion: (...data: any) => any
  open: boolean
  setOpen: (data: boolean) => void
}> = (props) => {
  const { apiFuntion, open, setOpen, btnLabel } = props
  const { run, loading, result, error } = useAsync(apiFuntion)
  const [description, setDescription] = useState(props.task?.description || "")
  const changeDescriptionHanndler = (e) => {
    setDescription(e.target.value)
  }
  const [isShowAlert, setIsShowAlert] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const value = description.trim()
    if (value.length > 0) {
      let requestData
      if (props.task) {
        requestData = {
          id: props.task._id,
          data: {
            description: value,
          },
        }
      } else requestData = value
      run(requestData)
    }
  } 
  useEffect(() => {
    let timeout
    if (!loading) {
      if (result || error) {
        setIsShowAlert(true)
        timeout = setTimeout(() => {
          setIsShowAlert(false)
        }, 2000)
      }
      if (result) {
        props.onAction(result)
        handleClose()
      }
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [loading])

  return (
    <div>
      {isShowAlert && (
        <CustomAlert severity={`${error ? "error" : "success"}`}>
          {error ? error : `${btnLabel} Task Success!`}
        </CustomAlert>
      )}
      {props.children}
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
            {loading && <Loading>Loading...</Loading>}
            {error && <Error>{error}</Error>}
            {!loading && (
              <Actions>
                <CustomButton type="submit">{btnLabel}</CustomButton>
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
