import { useContext, useEffect } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import { useParams } from "react-router-dom"
import styles from "./Recipe.module.css"

export default function Recipe(){
    const {id} = useParams();
    const {recipe, getRecipe} = useContext(RecipeContext)

    useEffect(()=>{
        getRecipe(id)
    },[id])

    if(!recipe) return <p>Loading...</p>

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
                </div>
            </div>

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
        
        
        
        </section>
    )
}