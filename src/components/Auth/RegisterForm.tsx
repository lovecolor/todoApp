

import { useContext, useState } from "react";
import useAsync from "../../hooks/use-async";
import { useAppApiClient } from "../../hooks/useAppApiClient";
import { useEffect } from "react";



import styled from "styled-components";
import { Button, Input } from "@material-ui/core";
import { useRef } from "react";
import { Label } from "@material-ui/icons";
import AuthContext from "../../contexts/auth-context";


const FegisterForm: React.FC = (props) => {
  const authCtx = useContext(AuthContext);
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const passAgainRef = useRef<HTMLInputElement>(null)
  const [isLogin, setIsLogin] = useState(true)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const { run, loading, error, result } = useAsync(useAppApiClient().register)
  const [err, setErr] = useState<string | null>(null)
  const submitHandler = (e) => {
    e.preventDefault()

    const name = nameRef.current?.value
    const age = ageRef.current?.value
    const email = emailRef.current?.value
    const password = passRef.current?.value
    const passwordAgain = passAgainRef.current?.value

    if (password != passwordAgain) {
      setErr("Password again does not match!")
      return;
    }

    run({
      name, password, email, age

    })
  }
  useEffect(() => {
    console.log(result)
    if (result) {
      authCtx.login(result.token, result.user)
    }
  }, [result])
  useEffect(() => {
    if (error) setErr(error)
  }, [error])
  return <Form>
    <h1>Register</h1>
    <form onSubmit={submitHandler}>

      <div className="form-group">
        <input required className="ip" name="name" type="text" ref={nameRef} placeholder=" "></input>
        <label htmlFor="name">Name</label>
      </div>
      <div className="form-group">
        <input required className="ip" name="age" type="number" ref={ageRef} placeholder=" "></input>
        <label htmlFor="age">Age</label>
      </div>
      <div className="form-group">
        <input required className="ip" name="email" type="email" ref={emailRef} placeholder=" "></input>
        <label htmlFor="email">Email</label>
      </div>
      <div className="form-group">
        <input required className="ip" name="password" type="password" ref={passRef} placeholder=" "></input>
        <label htmlFor="password">Password</label>
      </div>

      <div className="form-group">
        <input required className="ip" name="passwordAgain" type="password" ref={passAgainRef} placeholder=" "></input>
        <label htmlFor="passwordAgain">Password(again)</label>
      </div>

      {loading && <p>Loading...</p>}
      {err && <p className="err">{err}</p>}
      {!loading && <div className="actions">
        <button type="submit" className="btn-register">Register</button>
        <button className='btn-create'>Login with existing account</button>
      </div>}
    </form>

  </Form>
}
const Form = styled.div`
text-align:center;
width:50%;
margin:auto;
padding:1rem;
border-radius: 14px;
background-color: white;
margin-top:10rem;
@media (max-width:768px){
  width:90%;
}
p{
  margin-top: 1rem;
}
.err{
  color:red;
}
&>h1{
  width:100%;
  text-align:center;
}
.form-group{
  margin-top:1rem;
  position: relative;
  &>input{
    
    transition: .25s ease;
    width: 100%;
    border:1px solid #eee;
    border-radius: 4px;
    padding: 0 20px;
    padding-right: 30px;
    height: 50px;
    &:focus{
        border-color: #6a5af9;
        outline: none;
        
    }
    &:focus+label,&:not(:placeholder-shown)+label{
        display: inline-block;
            top:0;
            padding:0 10px;
            left:11px;
            background-color: white;
           
            color:#6a5af9
    }
    
}
&>label{
    color:#999;
    user-select: none;
    pointer-events: none;
    position: absolute;
    left:21px;
    top:50%;
    transform: translateY(-50%);
    transition:  .25s ease;
}
}
.actions{
  margin-top: 1rem;
display: flex;
flex-direction: column;
align-items: center;
.btn-register{
  padding:.5rem 3rem;
  margin-bottom: 1rem;
  background-color: #9f5ccc;
  border:none;
  color:white;
  border-radius: 6px;
  cursor: pointer;
  font-size:1.2rem;
  width: auto;
  &:hover {
            background-color: #873abb;
            border-color: #873abb;
          }
}
.btn-create{
  cursor: pointer;
  border:none;
  background-color: white;
  color:#9f5ccc;
  font-weight: bold;
}
}
`
export default FegisterForm