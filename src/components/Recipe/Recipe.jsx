import { useContext, useEffect } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import { useParams } from "react-router-dom"
import styles from "./Recipe.module.css"
import IngredientList from "./IngredientList"
import SavedButton from "../SavedButton"

import LoadingState from "../states/LoadingState"
import ErrorState from "../states/ErrorState"
import NotFoundState from "../states/NotFountState"

export default function Recipe(){
    const {id} = useParams();
    const {recipe, getRecipe, recipeLoading, recipeError} = useContext(RecipeContext)

    
    useEffect(()=>{
        getRecipe(id)
    },[id])

    if(recipeLoading){
        return <LoadingState message="Loading recipe..."/>
    }

    if(recipeError){
        return <ErrorState message={recipeError}/>
    }
    
    if(!recipe) {
        return <NotFoundState message="Recipe not found."/> }


    return(
        <section className={styles.recpt}>
            <div className={styles.side}>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />

                <div>
                    <h1>{recipe.strMeal}</h1>      
                    <span>Category: {recipe.strCategory}</span>
                    <span>Country: {recipe.strCountry}</span>
                    {recipe.strSource && <p>Source: <a className={styles.url} target="_blank" href={recipe.strSource}>{recipe.strSource}</a></p>}
                    {recipe.dateModified && <p>{recipe.dateModified}</p>}
                    <SavedButton recipe={recipe}/>
                </div>
            </div>

            <br /><br /> <hr />

            <div className={styles.howto}>
                <IngredientList recipe={recipe} />

                <div>
                    <p className={styles.instructions}>{recipe.strInstructions}</p>
                </div>
            </div>
        <br /><br />
        
        
        </section>
    )
}