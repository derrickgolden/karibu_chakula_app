
import store from "../store"

import { Meals, SignupLogin } from "./pages/index"
import { SideBar, Header, LoginHeader, } from "./components/index"

import { Provider } from 'react-redux'
import { useEffect, useState, createContext } from "react";

import DetailedFoodCard from "../src/components/DetailedFoodCard";

import { Routes, Route, redirect, useNavigate } from "react-router-dom";
import Signup from "./components/signupLogin/Signup";
import ResetPassword from "./components/signupLogin/ResetPassword";

export const FoodDetailsContext = createContext({setShowFoodDetails: {}, showFoodDetails: () => {}})

function App() {
  const [top, setTop] = useState('');
  const [login, setLogin] = useState(false);
  const navigate = useNavigate()

    useEffect(() => {
      login ? null : navigate("/user/login")
        const pageYOffset = window.pageYOffset
        const arr = ["","px"]
        arr[0]=pageYOffset
        const top = arr.join('')
        setTop(top)
    }, [login])

  const [showFoodDetails, setShowFoodDetails] = useState(false)
  const [foodDetails, setFoodDetails] = useState({})

  const onHandleFoodDetails = (foodDetails) => {
    setFoodDetails(foodDetails)
    setShowFoodDetails(true)
  }
  const onHandleLogin = (bol) =>{
    setLogin(bol)
  }

  return (
    <Provider store={store}>
      <FoodDetailsContext.Provider 
        value={{ setShowFoodDetails, showFoodDetails: onHandleFoodDetails }}>
        <div className={`flex flex-row justify-between bg-mediumOrange min-h-screen 
          ${showFoodDetails? "pointer-events-none bg-gradient-to-r from-[#e7eefb] to-[#e7eefb] " : "" } `}
        >
          <div className="flex flex-col  bg-slate-400 w-full relative">
            <Routes>
              <Route path="/" element={ <Header />} >
                <Route index element ={<Meals/>}/>
              </Route>   
              <Route path="/user" element={ <LoginHeader />}>
                <Route path="login" element={<SignupLogin />} />
                <Route path="signup"  element={<Signup />} />
                <Route path="resetpassword"  element={<ResetPassword />} />
                <Route path="*"  element={<h1>Page not found</h1>} />
              </Route>
            </Routes>
          </div>
        </div>
        <div className={`${showFoodDetails? "" : "hidden " } absolute px-2 es:px-8 py-8  
          lg:px-14 backdrop-blur-sm  w-full rounded-md z-20 mb-10 `}
          style={{top}}
        >
            <DetailedFoodCard food = {foodDetails} />
        </div>
      </FoodDetailsContext.Provider>
    </Provider>
  )
}

export default App
