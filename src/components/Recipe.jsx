import { useContext, useEffect } from "react"
import { RecipeContext } from "../context/RecipeContext"
import { useParams } from "react-router-dom"



export default function Recipe(){
    const {id} = useParams();
    const {recipe, getRecipe} = useContext(RecipeContext)

    useEffect(()=>{
        getRecipe(id)
    },[id])

    if(!recipe) return <p>Loading...</p>

    return(
        <>
        <h1>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt="" height={300}/>
        <h2>Category: {recipe.strCategory}</h2>
        <h3>Country: {recipe.strCountry}</h3>
        <p>{recipe.dateModified}</p>
        </>
    )
}