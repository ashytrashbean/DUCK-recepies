import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { RecipeContext } from "../context/RecipeContext"
import styles from "/src/components/RecipeList/recipeList.module.css"

import LoadingState from "../components/states/LoadingState"
import ErrorState from "../components/states/ErrorState"
import EmptyState from "../components/states/EmptyState"

import RecipeCard from "../components/RecipeList/RecipeCard"

export default function SavedPage(){

    const {currentUser} = useContext(AuthContext)
    const {fetchRecipe} = useContext(RecipeContext)
    const [savedRecipes, setSavedRecipes] = useState([])

    const [savedLoading, setSavedLoading] = useState(false)
    const [savedError, setSavedError] = useState(null)

    useEffect(()=>{
        if(!currentUser){
            return
        }

        async function loadSavedRecipes() {
            setSavedLoading(true)
            setSavedError(null)

            try {
                const recipes = await Promise.all(
                    currentUser.savedRecipes.map((id) => fetchRecipe(id))
                )
                setSavedRecipes(recipes.filter(Boolean))
            } catch {
                setSavedError("Could not load your saved recipes right now.")
            } finally {
                setSavedLoading(false)
            }
        }
        loadSavedRecipes()
    },[currentUser])

    if(!currentUser){
        return <h1>Login to save your favorite recipes</h1>
    }
    
    if (savedLoading) {
    return <LoadingState message="Loading your saved recipes..." />
}

    if (savedError) {
        return <ErrorState message={savedError} />
    }

    if (savedRecipes.length === 0) {
        return <EmptyState message="You have not saved any recipes yet." />
    }
        

    return(
        <div className={styles.center}>
            <h1>Hello {currentUser.displayName}, here are your saved recipes</h1>
            
            <div className={styles.recepies}>
                {savedRecipes.map((saved) => (
                    <RecipeCard key={saved.idMeal} recipe={saved}/>))}
            </div>
        </div>
    )
}
