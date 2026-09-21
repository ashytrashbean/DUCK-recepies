import { useContext, useEffect } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import { useParams } from "react-router-dom"
import styles from "./Recipe.module.css"

import LoadingState from "../states/LoadingState"
import ErrorState from "../states/ErrorState"
import EmptyState from "../states/EmptyState"
import NotFoundState from "../states/NotFountState"

export default function Recipe(){
    const {id} = useParams();
    const {recipe, getRecipe, recipeLoading, recipeError, toggleSaved, currentUser} = useContext(RecipeContext)

    
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

    function handleSave() {
        const result = toggleSaved(recipe.idMeal)

        if(!result.ok){
            alert(result.message)
        }
    }

    const isSaved = currentUser?.savedRecipes?.includes(recipe.idMeal)

    return(
        <section className={styles.recpt}>
            <div className={styles.side}>
                <img src={recipe.strMealThumb} alt="" />

                <div>
                    <h1>{recipe.strMeal}</h1>      
                    <span>Category: {recipe.strCategory}</span>
                    <span>Country: {recipe.strCountry}</span>
                    <p>Source: <a className={styles.url} target="_blank" href={recipe.strSource}>{recipe.strSource}</a></p>
                    <p>{recipe.dateModified}</p>
                    <button onClick={handleSave}>{isSaved ? <i className="fa-solid fa-heart"/> : <i className="fa-regular fa-heart"></i>}</button>
                </div>
            </div>

            <br /><br /> <hr />

            <div className={styles.howto}>
                <ul>
                    {Array.from({ length: 20 }, (_, index)=>{
                        const ingredient = recipe[`strIngredient${index + 1}`]?.trim()
                        const measure = recipe[`strMeasure${index + 1}`]?.trim()

                        if(!ingredient) return null

                        return(
                            <li key={index}>
                                <strong>{measure}</strong> {ingredient}
                            </li>
                        )
                    })}
                </ul>

                <div>
                    <p className={styles.instructions}>{recipe.strInstructions}</p>
                </div>
            </div>
        <br /><br />
        
        
        </section>
    )
}