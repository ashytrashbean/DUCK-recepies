import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import {showToast} from "../utils/toast"


export default function SavedButton({recipe}){

    const {toggleSaved, currentUser} = useContext(AuthContext)

    function handleSave() {
        const result = toggleSaved(recipe.idMeal)

        showToast( result.message, !result.ok)
            if(!result.ok){
                return
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