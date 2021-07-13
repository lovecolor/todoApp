
import styled from "styled-components"
import RegisterForm from "../components/Auth/RegisterForm"
import { EmptyLayout } from "../layouts/EmptyLayout"

export const Login = () => {
  // to call API
  // const api = useAppApiClient()
  // api.login({ username: "abc", password: "def" })

  return <EmptyLayout>
    <RegisterForm></RegisterForm>
  </EmptyLayout>
}
