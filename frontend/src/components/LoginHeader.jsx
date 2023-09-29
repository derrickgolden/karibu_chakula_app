
import { logo } from "../assets/images";
import { getDateDetails } from "../assets/calculations/dateCalc";
import { Link, Outlet } from "react-router-dom";

const LoginHeader = () =>{
    return(
        <>
        <div className=" flex justify-between bg-darkGray text-textWhite p-4 md:px-[10%]">
            <div className="flex">
            {/* <a href='https://dryicons.com/free-icons/food-logo'> Icon by Dryicons </a> */}
                <h1 className="text-2xl es:text-2xl lg:text-4xl text-textYellow font-mono max-w-[70px]">
                    What 
                    <p className="flex items-center"><span>a</span>
                        <img className="w-[40px]" src={logo} alt="logo" />
                    </p> 
                    Meal!
                </h1>
            </div>
            <div>
                <div className="flex flex-row items-center gap-4">
                    <h1 className="hidden sm:block text-2xl font-mono es:text-4xl">{getDateDetails().monthYear}.</h1>
                </div>
            </div>
            <div>
                <button className="bg-mediumOrange w-full rounded py-2 mb-2"> <Link to={`/user/signup`} 
                    className="underline hover:tracking-wider">Sign Up</Link> 
                </button>
                <p> Already a member? <br/> <Link to="/user/login" 
                    className="underline hover:tracking-wider">Log in</Link> 
                </p>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default LoginHeader;