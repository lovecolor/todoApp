import { Button, Paper, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MainLayout } from "../layouts/MainLayout"
import Grid from "@material-ui/core/Grid"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import TextField from "@material-ui/core/TextField"
import { useContext } from "react"
import AuthContext from "../contexts/AuthProvider"
import { useState } from "react"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import { useEffect } from "react"
import { Error, GridContainer, Loading } from "./Register"
import { useHistory } from "react-router"
import { useLinks } from "../hooks/useLinks"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"

import { Alert } from "@material-ui/lab"

export default function UserProfile() {
  const [isShowAlert, setIsShowAler] = useState(false)
  const history = useHistory()
  const api = useAppApiClient()
  const links = useLinks().common
  const authCtx = useContext(AuthContext)
  const { user } = authCtx
  const { run, loading, error, result } = useAsync(api.updateUser)

  const [isEdit, setIsEdit] = useState(false)
  const [formValue, setFormValue] = useState({
    name: user!.name,
    email: user!.email,
    age: user!.age,
  })
  const changeFormHandler = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }
  const editHandler = () => {
    setIsEdit(true)
  }
  const saveHandler = () => {
    run({
      ...formValue,
      age: +formValue.age,
    })
  }
  const backHandler = () => {
    history.goBack()
  }
  const cancelEditHandler = () => {
    setIsEdit(false)
  }
  useEffect(() => {
    let timeout
    if (!loading) {
      if (!error) {
        setIsEdit(false)
      }
      if (result) {
        authCtx.getCurrentUser()
        setIsShowAler(true)
        timeout = setTimeout(() => {
          setIsShowAler(false)
        }, 2000)
      }
    }
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [loading])
  return (
    <MainLayout>
      {isShowAlert && (
        <CustomAlert severity={`${error ? "error" : "success"}`}>{error ? error : "Edit Success!"}</CustomAlert>
      )}
      <CustomButton onClick={backHandler} startIcon={<ArrowBackIosIcon />}>
        Back
      </CustomButton>
      <CustomPaper>
        <GridContainer spacing={3}>
          <Typography align="center" variant="h4">
            Your Profile
          </Typography>

          {isEdit ? (
            <TextField
              value={formValue.name}
              onChange={changeFormHandler}
              required
              name="name"
              label="Name"
              fullWidth
              autoComplete="name"
            />
          ) : (
            <CustomSpan>{user!.name}</CustomSpan>
          )}
          {isEdit ? (
            <TextField
              value={formValue.age}
              type="number"
              onChange={changeFormHandler}
              required
              name="age"
              label="Age"
              fullWidth
              autoComplete="age"
            />
          ) : (
            <CustomSpan>{user!.age} year old</CustomSpan>
          )}
          {isEdit ? (
            <TextField
              value={formValue.email}
              onChange={changeFormHandler}
              required
              name="email"
              type="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          ) : (
            <CustomSpan>{user!.email}</CustomSpan>
          )}
          {loading && <Loading>Loading...</Loading>}
          {error && <Error>{error}</Error>}
          <Actions>
            {isEdit && (
              <Button onClick={cancelEditHandler} variant="contained">
                Cancel
              </Button>
            )}
            <CustomButton onClick={isEdit ? saveHandler : editHandler}>{isEdit ? "Save" : "Edit"}</CustomButton>
          </Actions>
        </GridContainer>
      </CustomPaper>
    </MainLayout>
  )
}
const CustomSpan = styled.span`
  font-size: 1.3rem;
  text-align: center;
`
const CustomAlert = styled(Alert)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  width: 50%;
  animation-name: smooth;
  animation-duration: 0.5s;
  @keyframes smooth {
    from {
      left: -50%;
    }
    to {
      left: 1rem;
    }
  }
`
const CustomButton = styled(ButtonPrimary)`
  margin: 1rem;
`
const Actions = styled.div`
  text-align: center;
`
const CustomPaper = styled(Paper)`
  padding: 3rem;
  margin: auto;
  margin-top: 3rem;
  max-width: 50rem;
`
