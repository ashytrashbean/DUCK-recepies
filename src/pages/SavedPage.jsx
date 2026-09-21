import { useContext, useEffect, useState } from "react"
import { RecipeContext } from "../context/RecipeContext"
import { Link } from "react-router-dom"
import styles from "/src/components/RecipeList/recipeList.module.css"


export default function SavedPage(){

    const {currentUser, fetchRecipe} = useContext(RecipeContext)
    const [savedRecipes, setSavedRecipes] = useState([])

    useEffect(()=>{
        if(!currentUser){
            setSavedRecipes([])
            return
        }

        async function loadSavedRecipes() {
            const recipes = await Promise.all(currentUser.savedRecipes.map((id)=>fetchRecipe(id)))
            setSavedRecipes(recipes.filter(Boolean))
        }
        loadSavedRecipes()
    },[currentUser])

    if(!currentUser){
        return <h1>Login to save your favorite recipes</h1>
    }
    
    if(currentUser.savedRecipes.length === 0){
        return <h1>You currently dont have any saved recipes</h1>
    }
        

    return(
        <div className={styles.center}>
        <h1>Your saved recipes</h1>
        
        <div className={styles.recepies}>
            {savedRecipes.map((saved) => (
                <Link key={saved.idMeal} to={`/recipe/${saved.idMeal}`} className={styles.recipeLink}>
                        <section className= {styles.sect}>
                            <img src={saved.strMealThumb} alt={saved.strMeal} />
                            <h3>{saved.strMeal}</h3>
                            <span>{saved.strCategory}</span>
                            <span>{saved.strArea}</span>
                        </section>
                    </Link>
                ))}
            </div>
        
        </div>
    )
}
