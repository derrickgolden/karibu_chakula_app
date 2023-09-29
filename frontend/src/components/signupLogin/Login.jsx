
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";

const Login  = ({onHandleChangeSignupLoginForm , handleLogin, onHandleResetPassword }) =>{
    const [usernamePassword, setUsernamePassword] = useState({usernameEmail: "", password: ""})
    const [userLogin, setUserLogin] = useState({ user: null, error: null });

    const handleUsernamePasswordInput = (e) =>{
        const {name, value} = e.target;
        setUsernamePassword((prevUsernamePassword) =>({
            ...prevUsernamePassword, [name]: value
        }))
    }
    const handleSubmitLogin = (e) =>{
        e.preventDefault();

        fetch("http://localhost:5003/user/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(usernamePassword)
        })
        .then(response => response.json())
        .then(result =>{
            if(result.success){
                console.log(result)
                setUserLogin({user: true})
            }else{
                console.log(result)
                setUserLogin({error: result})
            }
        } )
        .catch(error => console.log('error', error));
    }
    return(
        <div className="flex flex-col justify-center items-center px-2">
            {userLogin.user && (
                <Navigate to="/" replace={true} />
            )}
            <div className="flex flex-col justify-center items-center bg-lightOrange
                w-full md:w-1/2 py-8 px-2 text-center rounded-md gap-4 mt-8 ">
                <h2 className="text-4xl text-darkBlack">
                    Log In
                </h2>
                <form  onSubmit={(e) => handleSubmitLogin(e)}
                className="flex flex-col justify-center items-center w-11/12
                es:w-3/4 py-2 gap-4">
                    <input onChange={(e) => handleUsernamePasswordInput(e)}
                    type="text" name="usernameEmail" id="usernameEmail" placeholder="Username"
                    autoComplete="false" value={usernamePassword.usernameEmail} required
                    className="px-4 py-2 rounded w-full outline-0"/>
                    <input onChange={(e) => handleUsernamePasswordInput(e)}
                    type="password" name="password" id="password" placeholder="Password" 
                    required value={usernamePassword.password}
                    className="px-4 py-2 rounded w-full outline-0"/>

                    {userLogin.error && <p className="text-[#DC3545]">{userLogin?.error?.msg}</p>}
                    <button type="submit" 
                    className="flex justify-center items-center border border-darkBlack
                        px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray w-full"
                    >
                        Log In
                    </button>
                </form>

                <p>Forgot your password? 
                    <Link to="/user/resetpassword" className="underline hover:tracking-wider">
                        Reset
                    </Link>
                </p>
                <p >
                    You don't have an account? <Link to={`/user/signup`} 
                    className="underline hover:tracking-wider">Sign Up</Link> 
                </p>
            </div>
        </div>
    )
}

export default Login;