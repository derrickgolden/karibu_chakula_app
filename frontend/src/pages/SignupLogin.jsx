
import { useState } from "react";

import Login from "../components/signupLogin/Login";
import Signup from "../components/signupLogin/Signup";
import ResetPassword from "../components/signupLogin/ResetPassword";

const SignupLogin = ({handleLogin}) =>{
    const [ signup, setSignup ] = useState(false)
    const [ resetpassword, setRepeatPassword ] = useState(false)
    
    const handleChangeSignupLoginForm = () =>{
        console.log("signup")
        setSignup(!signup);
        setRepeatPassword(false)
    }
    const handleResetPassword = ({r_password}) =>{
        r_password? setRepeatPassword(true) : setRepeatPassword(false)
    }
    return(
        <>
        {
            !resetpassword? (
                signup ? (
                    <Signup 
                    onHandleChangeSignupLoginForm = {handleChangeSignupLoginForm }/> 
                ):(
                    <Login 
                    onHandleChangeSignupLoginForm = {handleChangeSignupLoginForm }
                    handleLogin = {handleLogin} 
                    onHandleResetPassword= {handleResetPassword}/>
                )
            ) : <ResetPassword 
                onHandleChangeSignupLoginForm = {handleChangeSignupLoginForm}/> 
        } 
        </>
    )
}

export default SignupLogin;