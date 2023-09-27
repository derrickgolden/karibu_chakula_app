
import { logo } from "../assets/images";
import { getDateDetails } from "../assets/calculations/dateCalc";

const LoginHeader = () =>{
    return(
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
                <button>Sign Up</button>
                <p>Already a member? Log In</p>
            </div>
            
        </div>
    )
}

export default LoginHeader;