import { useContext } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import styles from './recipeList.module.css'

import LoadingState from "../states/LoadingState"
import ErrorState from "../states/ErrorState"
import EmptyState from "../states/EmptyState"

import RecipeCard from "./RecipeCard"

export default function RecipeList(){

    const {recipes, loadRecipes, recipesLoading, recipesError, activeFilter} = useContext(RecipeContext)

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
            <RecipeCard key={recipe.idMeal} recipe={recipe}/>
        ))}
        </div>

        {!activeFilter && <button onClick={()=> loadRecipes(5)}>Load More</button>}
        {recipesError && recipes.length > 0 && (<ErrorState message="Could not load more recipes." />)}
        </div>
)}