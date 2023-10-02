
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Signup = ({onHandleChangeSignupLoginForm}) =>{
    const navigate = useNavigate();
    const [signupDetails, setSignDetails] = useState({email: "", username: "", password: "", repeatPassword: ""})
    const [error, setError] = useState({passwordMatch: null, usernameAvl: null, emailAvl: null})

    const onHandleSignupDetailsInput = (e) =>{
        const {name, value} = e.target;
        setSignDetails((preSignupDetails) => ({...preSignupDetails, [name]: value}))
    }

    const onHandleSignup = (e) =>{
        e.preventDefault();
        if(signupDetails.password !== signupDetails.repeatPassword){
            setError({ passwordMatch: "Password does not match" })
        }else{
            fetch("http://localhost:5003/user/signup", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(signupDetails)
            })
            .then(response => response.json())
            .then(result =>{
                if(result.success){
                    navigate("/user/login");
                }else{
                    console.log(result)
                    setError({ [result.res.rejectInput]: result.res.msg})
                }
            } )
            .catch(error => {
                console.log('error', error)
                setError({ passwordMatch: "Something went wrong, try again later!" })
            });
        }
    }
    return(
        <div className="flex flex-col justify-center items-center px-2 mb-8">
            <div className="flex flex-col justify-center items-center bg-lightOrange
                w-full md:w-1/2 py-8 px-2 text-center rounded-md gap-4 mt-8 ">
                <h2 className="text-4xl text-darkBlack">
                    Create Account
                </h2>
                <p>We need few information to get started.</p>

                <form action="" onSubmit={(e) => onHandleSignup(e)}
                className="flex flex-col justify-center items-center w-full
                es:w-3/4 py-2 gap-4">
                    <input type="email" name="email" id="email" placeholder="Email" required
                        value={signupDetails.email} onChange={onHandleSignupDetailsInput}
                        className="px-4 py-2 rounded w-full outline-0"/>
                    {error.emailAvl && <p className="text-[#DC3545]">{error.emailAvl}</p>}

                    <input type="text" name="username" placeholder="Username" required
                        value={signupDetails.username} onChange={onHandleSignupDetailsInput}
                        className="px-4 py-2 rounded w-full outline-0"/>
                    {error.usernameAvl && <p className="text-[#DC3545]">{error.usernameAvl}</p>}

                    <input type="password" name="password" id="password" placeholder="Password" required
                        value={signupDetails.password} onChange={onHandleSignupDetailsInput}
                        className="px-4 py-2 rounded w-full outline-0"/>
                    <input type="password" name="repeatPassword" id="repeatPassword" 
                        placeholder="Repeat Password" required
                        value={signupDetails.repeatPassword} onChange={onHandleSignupDetailsInput}
                        className="px-4 py-2 rounded w-full outline-0"/>
                    
                    {error.passwordMatch && <p className="text-[#DC3545]">{error.passwordMatch}</p>}
                    <button type="submit" 
                    className="flex justify-center items-center gap-2 border border-darkBlack
                        px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray w-full"
                        >
                        Create Account
                    </button>
                </form>
                
                <p> Already have an account? <Link to="/user/login" 
                    className="underline hover:tracking-wider">Log in</Link> 
                </p>
            </div>
        </div>
    )
}

export default Signup;