
import store from "../store"

import Meals from "./pages/Meals"
import SignupLogin from "./pages/SignupLogin"
import SideBar from "./components/SideBar"
import Header from "./components/Header"
import LoginHeader from "./components/LoginHeader"

import { Provider } from 'react-redux'
import { useEffect, useState, useContext, createContext } from "react";

import DetailedFoodCard from "../src/components/DetailedFoodCard";

export const FoodDetailsContext = createContext({setShowFoodDetails: {}, showFoodDetails: () => {}})

function App() {
  const [top, setTop] = useState('');
  const [login, setLogin] = useState(false);
    useEffect(()=>{
        const pageYOffset = window.pageYOffset
        const arr = ["","px"]
        arr[0]=pageYOffset
        const top = arr.join('')
        setTop(top)
    })

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
          {login ? 
          (<>
            <div className="hidden  justify-center bg-darkBlack w-1/12">
              <SideBar />
            </div>
            <div className="flex flex-col  bg-slate-400 w-full relative">
              <Header />
              <Meals />
            </div>
          </>) :
          (<>
            <div className="flex flex-col  bg-slate-400 w-full relative">
              <LoginHeader />
              <SignupLogin handleLogin = {onHandleLogin} />
            </div>
          </>) 
        }
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
