import { useContext } from "react"
import { RecipeContext } from "../context/RecipeContext"


export default function FilterList(){

    const {category, area, ingredient} = useContext(RecipeContext)

    return(
        <>
        <select name="" id="">
            <option disabled>Category</option>
            {category.map((cat)=> <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>)}
        </select>

        <select name="" id="">
            <option disabled>Coutry</option>
            {area.map((ar)=> <option key={ar.strCountry} value={ar.strCountry}>{ar.strCountry}</option>)}
        </select>

        <select name="" id="">
            <option disabled>Ingredient</option>
            {ingredient.map((ing)=> <option key={ing.idIngredient} value={ing.strIngredient}>{ing.strIngredient}</option>)}
        </select>
        </>
    )
}