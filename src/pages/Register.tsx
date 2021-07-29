import Avatar from "@material-ui/core/Avatar"

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
import { Link } from "react-router-dom"
import { Error } from "../components/text/Error"
import { Loading } from "../components/text/Loading"
import { GridContainer } from "../components/Grid/GridContainer"

export default function Register() {
  const [error, setError] = useState<string | null>(null)
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const api = useAppApiClient()
  const links = useLinks().common
  const signUp = useAsync(async (data: RegisterRequest) => {
    const result = await api.register(data)
    if (result) {
      authCtx.setUser(result.user)
      localStorage.setItem("token", result.token)
      history.push(links.home())
    } else {
      setError("Email is exist or invalid!")
    }
  })
  const { loading } = signUp

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
    if (formValue.password.length < 8) {
      setError("Password is short!Minimum is 8!")
      return
    }

    signUp.run({
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
              <CustomLink to={links.login()}>Already have an account? Sign in</CustomLink>
            </Actions>
          </CustomForm>
        </CustomPaper>
      </Container>
    </EmptyLayout>
  )
}
export const CustomLink = styled(Link)`
  text-decoration: none;
  color: #3f51b5;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`

const GridItem = styled.div<{ span: number }>`
  grid-column: 1 / span ${(props) => `${props.span}`};
`
const CustomButton = styled(ButtonPrimary)`
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
