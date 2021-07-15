import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import React, { useState } from "react"
import { useContext } from "react"
import styled from "styled-components"
import AuthContext from "../contexts/AuthProvider"
import { EmptyLayout } from "../layouts/EmptyLayout"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import { TextFieldOutlined } from "../components/textfields/TextFieldOutlined"
import { Paper } from "@material-ui/core"
import { RegisterRequest } from "../services/api/types/RegisterRequest"

export default function Register() {
  const authCtx = useContext(AuthContext)

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  })
  const changeFormHandler = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const submitHandler = (e) => {
    e.preventDefault()
    const age = +formValue.age
    authCtx.signUp({
      ...formValue,
      age,
    })
  }

  return (
    <EmptyLayout>
      <Container component="main" maxWidth="xs">
        <CustomPaper>
          <CustomAvatar>
            <LockOutlinedIcon />
          </CustomAvatar>
          <Typography component="h5" variant="h5">
            Sign up
          </Typography>
          <CustomForm onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  type="number"
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            {authCtx.error && <Error>{authCtx.error}</Error>}
            {authCtx.loading && <Loading>Loading...</Loading>}
            {!authCtx.loading && (
              <CustomButton type="submit" fullWidth>
                Sign Up
              </CustomButton>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </CustomForm>
        </CustomPaper>
      </Container>
    </EmptyLayout>
  )
}
export const CustomButton = styled(ButtonPrimary)`
  margin: 1rem 0;
`
export const CustomPaper = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`
export const CustomAvatar = styled(Avatar)`
  margin: 8px;
  background-color: #f50057;
`
export const CustomForm = styled.form`
  width: "100%";
  margin-top: 1rem;
`
export const Error = styled.p`
  width: 100%;
  text-align: center;
  color: red;
`
export const Loading = styled.p`
  width: 100%;
  text-align: center;
`
