import { useContext } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import styles from './recipeList.module.css'
import { Link } from "react-router-dom"

import LoadingState from "../states/LoadingState"
import ErrorState from "../states/ErrorState"
import EmptyState from "../states/EmptyState"


export default function RecipeList(){

    const {recipes, loadRecipes, recipesLoading, recipesError} = useContext(RecipeContext)

    if (recipesLoading && recipes.length === 0) {
    return <LoadingState message="Finding delicious recipes..." />
    }

    if (recipesError && recipes.length === 0) {
        return <ErrorState message={recipesError} />
    }

    if (recipes.length === 0) {
        return <EmptyState message="No recipes found." />
    }

    return(
        <div className={styles.center}>

        <div className={styles.recepies}>
            {recipes.map((recipe)=>(
            <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className={styles.recipeLink}>
                <section className= {styles.sect}>
                    <img src={recipe.strMealThumb} alt="" />
                    <h3>{recipe.strMeal}</h3> 
                    <div>
                        {/* <span>{recipe.strCategory}</span> */}
                        <span>{recipe.strCountry}</span>
                    </div>
                    <br />
                </section>
            </Link>
        ))}
        </div>

        <button onClick={()=> loadRecipes(5)}>Load More</button>
        {recipesError && recipes.length > 0 && (<ErrorState message="Could not load more recipes." />)}
        </div>
)}