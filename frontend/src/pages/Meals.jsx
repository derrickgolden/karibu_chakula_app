import { useRef, useState, useEffect } from "react";

import { connect } from 'react-redux';

import { recipeList, selectMeals, } from "../actions/index";

import { CaloriesCard, MealCard, DayDate } from "../components/index"
import DisplayLoadPage from "./DisplayLoadPage";

import { mealsSelect, nutritionCalc, updateLocalStorage, getDateDetails,
    getLocalStorage, mealTimeDetails } from "../assets/index"

import { PropTypes } from 'prop-types'

const DisplayMeals = ({newDate, selectedMealsAvailable, onHandleReloadDayMeal,
                        selectedMeals, date, selectMeals, nutritionData, 
                        loadingData, onHandleDragStartDrop}) =>(
    <>
        <DayDate newDate={newDate} 
                selectedMealsAvailable= {selectedMealsAvailable} 
                onHandleReloadDayMeal = {onHandleReloadDayMeal}/>
        <div className="flex flex-col-reverse gap-2 md:flex-row w-full bg-slate-600 p-4">
            <div className="flex flex-col w-full md:min-w-1/2 space-y-2">
                { (Object.keys(mealTimeDetails)).map((mealTime, i) =>(
                    <MealCard key = {i}
                        meals = {selectedMeals?.[mealTime]}
                        mealDate = {date}
                        mealTime= { mealTime }
                        selectMeals= {selectMeals}
                        calories = { nutritionData?.[mealTime]?.calories }
                        loadingData = {loadingData}
                        data= { nutritionData }
                        onHandleDragStartDrop = { onHandleDragStartDrop }
                    />
                ))}
            </div>

            <div className="min-w-1/2">
                <CaloriesCard data= { nutritionData } />
            </div>
        </div>
    </>
)

const Meals = (props) =>{
    const dragEnterFood = useRef()
    const [prevProps, setPrevProps] = useState(props?.dates?.mealsDate)
    const newSelectedMealsAvailable = (
        props?.selectedMeals?.breakfast.length || 
        props?.selectedMeals?.lunch.length || 
        props?.selectedMeals?.dinner.length ) ? true : false

    const [ selectedMealsAvailable, setSelectedMealsAvailable] = useState(
        newSelectedMealsAvailable
    ) 

    if(prevProps !== props?.dates?.mealsDate){
        setPrevProps(props?.dates?.mealsDate)
        setSelectedMealsAvailable(
            newSelectedMealsAvailable
        )
    }
     
    const date = props.dates.mealsDate

    const nutritionData = nutritionCalc(props?.selectedMeals)
    const newDate = getDateDetails(new Date(date))

    const handleGenerateDay = () =>{
        //setting load whole day for the first one will serve for whole of them
        setSelectedMealsAvailable(true);
        let fetchDay = true;
        let fetchMeal = true;
        props.recipeList("breakfast", date, fetchMeal, fetchDay )
        props.recipeList("lunch", date, fetchMeal)
        props.recipeList("dinner", date, fetchMeal)
    }
    const handleReloadDayMeal = () =>{
        const getRecipeData = getLocalStorage(date)
        console.log(getRecipeData);
        const newSelectedMeals = mealsSelect(getRecipeData.recipes)
 
        fetch("http://localhost:5003/selectedmeals/5", {
    }).then(res => res.json())
    .then(data => console.log(data))
    
        // fetch("http://localhost:5003/selectedmeals", {
        //     headers:{
        //         'Content-type': 'application/json'
        //     },
        //     method: 'POST',
        //     body: JSON.stringify({date, meals: `${newSelectedMeals.breakfast[0]}`}),
        // })
        props.selectMeals(null, date, newSelectedMeals )
    }
    const handleDragStartDrop = (dom, drop) =>{
        if(drop){
            let y ={};
            Object.keys(props?.selectedMeals).map((key,i)=>{
                props.selectedMeals[key].map((food, index) =>{
                    if(food == dom){
                        y.start = {key, index}
                    }
                    if(food == dragEnterFood.current){
                        y.end = {key, index}
                    }
                })
            })

            let SM = props?.selectedMeals;
            const draggedFood = SM[y.start.key][y.start.index]
            const dragOverFood = SM[y.end.key][y.end.index]
            SM[y.end.key].splice(y.end.index, 1, draggedFood)
            SM[y.start.key].splice(y.start.index, 1, dragOverFood)
            props.selectMeals(null, date, SM )
        }else{
            dragEnterFood.current = dom
        }
    }

    
    return(
        <div className="flex flex-col ">
            {
                selectedMealsAvailable ?
                    (
                        <DisplayMeals 
                            newDate={newDate}
                            selectedMealsAvailable= {selectedMealsAvailable} 
                            onHandleReloadDayMeal = {handleReloadDayMeal}
                            selectedMeals = {props?.selectedMeals}
                            date = {date}
                            selectMeals = {props.selectMeals}
                            nutritionData={nutritionData}
                            loadingData = {props.loadingData}
                            onHandleDragStartDrop = { handleDragStartDrop }
                        />
                    ) :
                    (
                        <DisplayLoadPage 
                            newDate={newDate}
                            loadingData = {props.loadingData}
                            onHandleGenerateDay = {handleGenerateDay}
                        />
                    )
                }
                {
            }       
        </div>    
    )
}

Meals.propTypes ={
    recipeList: PropTypes.func.isRequired,
    selectMeals: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    selectedMeals: PropTypes.object.isRequired
  }

const mapStateToProps = state =>{
    updateLocalStorage(state)
    return {
        recipes: state.recipes, 
        dates: state.dates,
        selectedMeals: state.selectedMeals,
        loadingData: state.loadingData,

  }
}

export default connect(mapStateToProps, {recipeList, selectMeals})(Meals)