import { FastField, Form, Formik } from "formik"
import InputField from "./InputField";

import styled from "styled-components";

type Field={
    name:string,
    type:string,
    min?:number|null
}
const CustomForm: React.FC<{ listFeild: Field[], onSubmit: (value) => void,btnLabel:string,err:string|null }> = (props) => {
    let initialValues = {}
    return <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
        {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;
            return <Form>
                {props.listFeild.map((field: Field, index: number) => {
                    
                    const {type}=field
                    const name=field.name.toLowerCase() 
                    initialValues[name] = "";
                    return <FastField
                        key={index}
                        name={name}
                        component={InputField}
                        type={type}
                        
                        min={type=="number"?field.min:undefined}
                    >

                    </FastField>
                })}
                {props.err&&<Err>{props.err}</Err>}
                <Button type="submit">{props.btnLabel}</Button>
            </Form>
        }}

    </Formik>
}
const Err=styled.p`
color:red;
`
const Button=styled.button`
cursor: pointer;
margin-top: 1rem;
border:none;
    background-color: #00a400;
    border-radius: 6px;
    color:white;
    font-weight: bold;
    padding:.5rem 3rem;
    font-size: 1.2rem;
    &:hover{
        background-color: #578843;
    }
    @media (max-width:414px){
        width:100%;
    }
`
export default CustomForm