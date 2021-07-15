import React, { useContext, useState } from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Link from "@material-ui/core/Link"
import Grid from "@material-ui/core/Grid"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { EmptyLayout } from "../layouts/EmptyLayout"
import AuthContext from "../contexts/AuthProvider"
import { Error, Loading, CustomAvatar, CustomPaper, CustomForm, CustomButton } from "./Register"
import { TextFieldOutlined } from "../components/textfields/TextFieldOutlined"
import styled from "styled-components"

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })
  const changeFormHandler = (e) => {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }
  const authCtx = useContext(AuthContext)
  const submitHandler = (e) => {
    e.preventDefault()
    authCtx.login(formValue)
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
