import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../contexts/auth-context'
import useAsync from '../hooks/use-async'
import { useAppApiClient } from '../hooks/useAppApiClient'
import { EmptyLayout } from '../layouts/EmptyLayout'

export default function Register() {

    const authCtx = useContext(AuthContext)
    const { run, loading, error, result } = useAsync(useAppApiClient().register)
    const [err, setErr] = useState<string | null>(null)
    const submitHandler = (e) => {
        e.preventDefault()
        const formValue: any = new FormData(e.target)
        const value: any = {}
        for (const key of formValue.entries()) {
            value[key[0]] = key[1]
        }
        const { name, age, email, password, passwordAgain } = value
        if (password != passwordAgain) {
            setErr("Password again does not match!")
            return;
        }

        run({
            name,
            age, email, password
        })

    }
    useEffect(() => {
        if (result) {
            authCtx.login(result.token, result.user)
        }
    }, [result])
    useEffect(() => {
        if (error) {
            setErr(error)
        }
    }, [error])
    return (
        <EmptyLayout>
            <Form onSubmit={submitHandler}>
                <h1>Register</h1>
                <TextField required className="field" type="text" name="name" placeholder="Name"></TextField>
                <TextField required className="field" type="number" name="age" placeholder="Age"></TextField>
                <TextField required className="field" type="email" name="email" placeholder="Email"></TextField>
                <TextField required className="field" type="password" name="password" placeholder="Password"></TextField>
                <TextField required className="field" type="password" name="passwordAgain" placeholder="Password(again)"></TextField>
                {err && <p className="err">{err}</p>}
                {loading && <p>Loading...</p>}
                {!loading && <div className="actions">
                    <button >Register</button>
                    <div >Create new account</div>
                </div>}
            </Form>
        </EmptyLayout>
    )
}
const Form = styled.form`
width: 40%;
margin: auto;
text-align:center;
background-color: white;
border-radius: 14px;
padding: 1rem;
margin-top: 10rem;
display: flex;
flex-direction: column;
box-shadow:0 2px 2px 0 lightgray;
.err{
    color:red;
}
.field{
margin-top: 1rem ;
}
.actions{
    margin-top:1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    &>button{
        border:none;
        cursor: pointer;
        padding:.5rem 3rem;
  margin-bottom: 1rem;
  background-color: #9f5ccc;
  color:white;
  border-radius: 6px;
  font-size:1.2rem;
  width: auto;
  &:hover {
            background-color: #873abb;
            border-color: #873abb;
          }
    }
    &>div{
        cursor: pointer;
        color:#9f5ccc;
        font-weight: bold;
    }
    
}
`
