import React, { useContext } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import { EmptyLayout } from "../layouts/EmptyLayout"
import AuthContext from "../contexts/AuthProvider"
import { Error, Loading, CustomAvatar, CustomPaper, CustomForm, CustomButton } from "./Register"
import { TextFieldOutlined } from "../components/textfields/TextFieldOutlined"
import { ButtonPrimary } from "../components/buttons/ButtonPrimary"
import styled from "styled-components"

export const Login = () => {
  // to call API
  // const api = useAppApiClient()
  // api.login({ username: "abc", password: "def" })

  const authCtx = useContext(AuthContext)
  const submitHandler = (e) => {
    e.preventDefault()
    const formValue: any = new FormData(e.target)
    const value: any = {}
    for (const key of formValue.entries()) {
      value[key[0]] = key[1]
    }

    const { email, password } = value

    authCtx.login({
      email,
      password,
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
            Sign in
          </Typography>
          <CustomForm onSubmit={submitHandler}>
            <CustomTextField required fullWidth label="Email Address" name="email" autoComplete="email" autoFocus />
            <CustomTextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            {authCtx.error && <Error>{authCtx.error}</Error>}
            {authCtx.loading && <Loading>Loading...</Loading>}
            {!authCtx.loading && (
              <CustomButton type="submit" fullWidth>
                Sign In
              </CustomButton>
            )}

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </CustomForm>
        </CustomPaper>
      </Container>
    </EmptyLayout>
  )
}
const CustomTextField = styled(TextFieldOutlined)`
  margin: 0.5rem 0;
`
