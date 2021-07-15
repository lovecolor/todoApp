import { Paper, Typography } from "@material-ui/core"
import React from "react"
import styled from "styled-components"
import { MainLayout } from "../layouts/MainLayout"
import Grid from "@material-ui/core/Grid"

import TextField from "@material-ui/core/TextField"
import { useContext } from "react"
import AuthContext from "../contexts/AuthProvider"
import { useState } from "react"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import { useEffect } from "react"
import { Error, Loading } from "./Register"

export default function UserProfile() {
  const authCtx = useContext(AuthContext)
  const { user } = authCtx
  const [isEdit, setIsEdit] = useState(false)
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
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
    console.log(formValue)
    authCtx.update({
      ...formValue,
      age: +formValue.age,
    })
  }
  useEffect(() => {
    if (!authCtx.loading && !authCtx.error) {
      setIsEdit(false)
    }
  }, [authCtx.loading])
  return (
    <MainLayout>
      <CustomPaper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography align="center" variant="h4">
              Your Profile
            </Typography>
          </Grid>

          <Grid item xs={12}>
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
              <Typography align="center" variant="h6">
                {user.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
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
              <Typography align="center" variant="h6">
                {user.age} year old
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
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
              <Typography align="center" variant="h6">
                {user.email}
              </Typography>
            )}
          </Grid>
          {authCtx.loading && <Loading>Loading...</Loading>}
          {authCtx.error && <Error>{authCtx.error}</Error>}
          <Grid container justifyContent="center">
            <ButtonPrimary onClick={isEdit ? saveHandler : editHandler}>{isEdit ? "Save" : "Edit"}</ButtonPrimary>
          </Grid>
        </Grid>
      </CustomPaper>
    </MainLayout>
  )
}
const CustomPaper = styled(Paper)`
  padding: 3rem;
  margin: auto;
  margin-top: 3rem;
  max-width: 50rem;
`
