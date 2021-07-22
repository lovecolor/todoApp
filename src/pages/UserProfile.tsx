import { Button, Paper, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MainLayout } from "../layouts/MainLayout"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import TextField from "@material-ui/core/TextField"
import { useContext } from "react"
import AuthContext from "../contexts/AuthProvider"
import { useState } from "react"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"

import { useHistory } from "react-router"
import { useLinks } from "../hooks/useLinks"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { useSnackbar } from "notistack"
import { Alert } from "@material-ui/lab"
import { UpdateUserRequest } from "../services/api/types/UpdateUserRequest"
import { Loading } from "../components/text/Loading"
import { GridContainer } from "../components/Grid/GridContainer"

export default function UserProfile() {
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()
  const api = useAppApiClient()
  const links = useLinks().common
  const authCtx = useContext(AuthContext)
  const { user } = authCtx

  const { run, loading } = useAsync(async (data: UpdateUserRequest) => {
    const result = await api.updateUser(data)
    if (result) {
      authCtx.setUser(result)
      setIsEdit(false)
      enqueueSnackbar("Edit success!", { variant: "success" })
    } else {
      enqueueSnackbar("Edit fail!", { variant: "error" })
    }
  })

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
    history.push(links.home())
  }
  const cancelEditHandler = () => {
    setIsEdit(false)
  }

  return (
    <MainLayout>
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
