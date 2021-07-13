import { useState } from "react";
import styled from "styled-components";

const InputField: React.FC<{
    field: any,
    type: string,
    disabled: boolean
    min?: number | null
}> = (props) => {
    const { field, type, disabled } = props;
    const { name } = field;
    const [isShowPass, setIsShowPass] = useState<boolean>(false)
    const showPassHandler = () => {
        setIsShowPass(true)
    }
    const hidePassHandler = () => {

        setIsShowPass(false)
    }

    return <FormGroup>
        <input
            required
            id={name}
            {...field}
            type={type != 'password' ? type : isShowPass ? 'text' : 'password'}
            disabled={disabled}
            placeholder=" "
            min={type == 'number' ? props.min : undefined}
        ></input>


        <label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label>
        {type == 'password' && isShowPass && <i onClick={hidePassHandler} className="fas fa-eye"></i>}
        {type == 'password' && !isShowPass && <i onClick={showPassHandler} className="fas fa-eye-slash"></i>}
    </FormGroup>
}

const FormGroup = styled.div`
position: relative;
margin-top: 1rem;
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
&>i{
    cursor: pointer;
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
}
`
export default InputField