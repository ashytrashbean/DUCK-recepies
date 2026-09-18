import { useContext, useState } from "react"
import { RecipeContext } from "../context/RecipeContext"


export default function FilterList(){

    const {category, area, ingredient, filterRecipes} = useContext(RecipeContext)
    
    const [selectedCategory,setSelectedCategory] = useState("");
    const [selectedArea,setSelectedArea] = useState("");
    const [selectedIngredient,setSelectedIngredient] = useState("");

    function handleFilter(){
        filterRecipes({
            category: selectedCategory,
            area: selectedArea,
            ingredient: selectedIngredient
        })
    }

    return(
        <>
        <select value={selectedCategory} onChange={(event)=> setSelectedCategory(event.target.value)}>
            <option value={""} >Category</option>
            {category.map((cat)=> <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>)}
        </select>

        <select value={selectedArea} onChange={(event)=> setSelectedArea(event.target.value)}>
            <option value={""} >Coutry</option>
            {area.map((ar)=> <option key={ar.strCountry} value={ar.strCountry}>{ar.strCountry}</option>)}
        </select>

        <select value={selectedIngredient} onChange={(event)=> setSelectedIngredient(event.target.value)}>
            <option value={""} >Ingredient</option>
            {ingredient.map((ing)=> <option key={ing.idIngredient} value={ing.strIngredient}>{ing.strIngredient}</option>)}
        </select>
        <button onClick={handleFilter}>Filter</button>
        </>
    )
}