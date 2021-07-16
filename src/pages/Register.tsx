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
import { useAppApiClient } from "../hooks/useAppApiClient"
import { useLinks } from "../hooks/useLinks"
import useAsync from "../hooks/useAsync"
import { useHistory } from "react-router"
import { Actions, CustomTextField } from "./Login"

export default function Register() {
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const api = useAppApiClient()
  const links = useLinks().common
  const handleSignUp = useAsync(async (data: RegisterRequest) => {
    const result = await api.register(data)
    if (result) {
      authCtx.login(result)
      history.push(links.home())
    }
  })
  const { loading, error } = handleSignUp
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
    handleSignUp.run({
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
            <GridContainer spacing={3}>
              <TextFieldOutlined
                onChange={changeFormHandler}
                autoComplete="name"
                name="name"
                required
                fullWidth
                label="Name"
                autoFocus
              />
              <TextFieldOutlined
                onChange={changeFormHandler}
                type="number"
                required
                fullWidth
                label="Age"
                name="age"
                autoComplete="age"
              />

              <GridItem span={2}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </GridItem>
              <GridItem span={2}>
                <TextFieldOutlined
                  onChange={changeFormHandler}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </GridItem>
            </GridContainer>
            {error && <Error>{error}</Error>}
            {loading && <Loading>Loading...</Loading>}
            {!loading && (
              <CustomButton type="submit" fullWidth>
                Sign Up
              </CustomButton>
            )}

            <Actions>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Actions>
          </CustomForm>
        </CustomPaper>
      </Container>
    </EmptyLayout>
  )
}
export const GridContainer = styled.div<{ spacing: number }>`
  display: grid;

  grid-gap: ${(props) => `${props.spacing * 8}px`};
`
export const GridItem = styled.div<{ span: number }>`
  grid-column: 1 / span ${(props) => `${props.span}`};
`
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
  width: 100%;
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
