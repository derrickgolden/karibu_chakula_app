
import { logo } from "../assets/images";
import { getDateDetails } from "../assets/calculations/dateCalc";
import { Link, Outlet } from "react-router-dom";

const LoginHeader = () =>{
    return(
        <>
        <div className=" flex justify-between bg-darkGray text-textWhite p-4">
            <div className="">
            {/* <a href='https://dryicons.com/free-icons/food-logo'> Icon by Dryicons </a> */}
                <img className="w-[70px]" src={logo} alt="logo" />
            </div>
            <div>
                <div className="flex flex-row items-center gap-4">
                    <h1 className="text-2xl es:text-4xl text-textYellow font-mono ">
                        What a Meal!
                    </h1>
                    <h1 className="text-2xl font-mono es:text-4xl">{getDateDetails().monthYear}.</h1>
                </div>
            </div>
            <div>
                <p > <Link to={`/user/signup`} 
                    className="underline hover:tracking-wider">Sign Up</Link> 
                </p>
                <p> Already a member? <Link to="/user/login" 
                    className="underline hover:tracking-wider">Log in</Link> 
                </p>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default LoginHeader;