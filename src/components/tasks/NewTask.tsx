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

export const NewTask: React.FC<{ onAddTask: (task: Task) => void }> = (props) => {
  const [isShowAlert, setIsShowAlert] = useState(false)
  const api = useAppApiClient()
  const { run, loading, result, error } = useAsync(api.addTask)
  const [description, setDescription] = useState("")
  const changeDescriptionHanndler = (e) => {
    setDescription(e.target.value)
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
    if (value.length > 0) {
      run(value)
    }
  }
  useEffect(() => {
    let timeout
    if (!loading) {
      if (result) {
        props.onAddTask(result)
        handleClose()
        setIsShowAlert(true)
        timeout = setTimeout(() => {
          setIsShowAlert(false)
        }, 2000)
      }
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [loading])
  return (
    <div>
      {isShowAlert && (
        <CustomAlert severity={`${error ? "error" : "success"}`}>{error ? error : "Add Task Success!"}</CustomAlert>
      )}
      <CustomFloatBtn onClick={handleOpen} color="primary" aria-label="add">
        <AddIcon />
      </CustomFloatBtn>
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
                <CustomButton type="submit">Add</CustomButton>
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

const CustomFloatBtn = styled(Fab)`
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: calc(50% - 28px);
`
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
