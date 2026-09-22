import { useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"


export default function SavedButton({recipe}){

    const {toggleSaved, currentUser} = useContext(RecipeContext)

    function handleSave() {
        const result = toggleSaved(recipe.idMeal)

        if(!result.ok){
            alert(result.message)
        }
    }

    const isSaved = currentUser?.savedRecipes?.includes(recipe.idMeal)
    return (
        <button type="button" onClick={handleSave}
            aria-label={isSaved ? "Remove recipe from saved" : "Save recipe"}>

            {isSaved
                ? <i className="fa-solid fa-heart" aria-hidden="true" />
                : <i className="fa-regular fa-heart" aria-hidden="true" />}

        </button>
    )
}