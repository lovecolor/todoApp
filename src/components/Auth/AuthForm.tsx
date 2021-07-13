import CustomForm from "../UI/CustomForm"

import { useState } from "react";
import useAsync from "../../hooks/use-async";
import { useAppApiClient } from "../../hooks/useAppApiClient";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";

const listFeildSignUp = [

  {
    name: "Name",
    type: "text",
  },
  {
    name: "Age",
    type: "number",
    min: 1
  },
  {
    name: "Email",
    type: "email",
  },
  {
    name: "Password",
    type: "password",
  },
  {
    name: "Password (again)",
    type: "password",
  },
];
const AuthForm: React.FC = (props) => {
  const dispatch=useDispatch()
  const { run, loading, error, result } = useAsync(useAppApiClient().register)
  const [err, setErr] = useState<string | null>(null)
  const submitHandler = (value) => {
    
    
    const { name, password, email, age } = value
    if (password != value["password (again)"]) {
      setErr("Password again does not match!")
      return;
    }

    run({
      name, password, email, age

    })
  }
  useEffect(() => {
    console.log(result)
    if(result){
      dispatch(authActions.login(result))
    }
  }, [result])
  useEffect(() => {
    if(error) setErr(error)
  }, [error])
  return <div>
    <CustomForm listFeild={listFeildSignUp} onSubmit={submitHandler} btnLabel="Register" err={err}></CustomForm>
  </div>
}
export default AuthForm