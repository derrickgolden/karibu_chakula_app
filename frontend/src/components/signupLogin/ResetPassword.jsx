
import { useState } from "react";

const ResetPassword = ({ onHandleChangeSignupLoginForm}) =>{

    const [email, setEmail] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        fetch("http://localhost:5003/user/resetpassword", {
            method: 'PATCH',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    return(
        <div className="flex flex-col justify-center items-center px-2">
            <div className="flex flex-col justify-center items-center bg-lightOrange
                w-full md:w-1/2 py-8 px-2 text-center rounded-md gap-4 mt-8 ">
                <h2 className="text-4xl text-darkBlack">
                    Reset Password
                </h2>
                <p className="w-10/12">Forgot your password? Enter your email in the form below 
                    and we'll send you instructions for creating a new one.
                </p>
                <form  onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col justify-center items-center w-11/12
                es:w-3/4 py-2 gap-4">
                    <input onChange={(e) => setEmail(e.target.value)}
                    type="email" name="email" id="email" placeholder="Enter email"
                    autoComplete="false"  required value={email}
                    className="px-4 py-2 rounded w-full outline-0"/>

                    <button type="submit" 
                    className="flex justify-center items-center gap-2 border border-darkBlack
                        px-4 py-2 rounded-sm hover:text-textWhite hover:bg-darkGray w-full"
                        >
                        Reset Password
                    </button>
                </form>

                <p onClick={() => onHandleChangeSignupLoginForm()}>
                     <a href="#" 
                className="underline hover:tracking-wider">Log in instead</a> </p>
            </div>
        </div>
    )
}

export default ResetPassword;