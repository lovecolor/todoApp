
import styled from "styled-components"
import AuthForm from "../components/Auth/AuthForm"
import { EmptyLayout } from "../layouts/EmptyLayout"

export const Login = () => {
  // to call API
  // const api = useAppApiClient()
  // api.login({ username: "abc", password: "def" })

  return <EmptyLayout>
    <Content>
      <h1>Register</h1>
      <hr></hr>
      <AuthForm></AuthForm>
    </Content>
  </EmptyLayout>
}
const Content = styled.div`

background-color: white;
border-radius: 14px;
padding: 1rem;
margin: auto;

width: 40%;
margin-top: 10rem;
&>h1{
  margin:0;
}
@media (max-width: 768px) {
  width:90%;
}
`