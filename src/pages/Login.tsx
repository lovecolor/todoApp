import React, { useContext, useState } from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"

import { EmptyLayout } from "../layouts/EmptyLayout"
import AuthContext from "../contexts/AuthProvider"
import { CustomAvatar, CustomPaper, CustomForm, CustomLink } from "./Register"
import { TextFieldOutlined } from "../components/textfields/TextFieldOutlined"
import styled from "styled-components"
import useAsync from "../hooks/useAsync"
import { useAppApiClient } from "../hooks/useAppApiClient"
import { useHistory } from "react-router"
import { useLinks } from "../hooks/useLinks"
import { LoginRequest } from "../services/api/types/LoginRequest"
import { Container } from "@material-ui/core"
import { Error } from "../components/text/Error"
import { Loading } from "../components/text/Loading"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"

export const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const links = useLinks().common
  const history = useHistory()
  const authCtx = useContext(AuthContext)
  const api = useAppApiClient()
  const login = useAsync(async (data: LoginRequest) => {
    const result = await api.login(data)
    if (result) {
      authCtx.setUser(result.user)
      localStorage.setItem("token", result.token)
      const imageUser = await api.getUserImage({ uid: result.user._id })
      if (imageUser) authCtx.setUrlImage(imageUser)
      history.push(links.home())
    } else {
      setError("Email or password is wrong!")
    }
  })
  const { loading } = login
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })
  const changeFormHandler = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    login.run(formValue)
  }

  return (
    <EmptyLayout>
      <Container component="main" maxWidth="xs">
        <CustomPaper>
          <CustomAvatar>
            <LockOutlinedIcon />
          </CustomAvatar>
          <Typography component="h5" variant="h5">
            Sign in
          </Typography>
          <CustomForm onSubmit={submitHandler}>
            <CustomTextField
              onChange={changeFormHandler}
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <CustomTextField
              onChange={changeFormHandler}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {error && <Error>{error}</Error>}
            {loading && <Loading>Loading...</Loading>}
            {!loading && (
              <CustomButton type="submit" fullWidth>
                Sign In
              </CustomButton>
            )}

            <Actions>
              <CustomLink to={links.register()}>Don't have an account? Sign Up</CustomLink>
            </Actions>
          </CustomForm>
        </CustomPaper>
      </Container>
    </EmptyLayout>
  )
}
export const CustomTextField = styled(TextFieldOutlined)`
  margin: 0.5rem 0;
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`
const CustomButton = styled(ButtonPrimary)`
  margin: 1rem 0;
`
