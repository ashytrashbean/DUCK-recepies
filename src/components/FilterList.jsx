import { useContext, useState } from "react"
import { RecipeContext } from "../context/RecipeContext"


export default function FilterList(){

    const {category, area, ingredient, filterRecipes} = useContext(RecipeContext)
    
    const [selectedCategory,setSelectedCategory] = useState("");
    const [selectedArea,setSelectedArea] = useState("");
    const [selectedIngredient,setSelectedIngredient] = useState("");

    function handleCategoryChange(event) {
        const value = event.target.value;

        setSelectedCategory(value);
        setSelectedArea("");
        setSelectedIngredient("");

        filterRecipes({
            category: value,
            area: "",
            ingredient: "",
        });
    }

    function handleAreaChange(event) {
        const value = event.target.value;

        setSelectedCategory("");
        setSelectedArea(value);
        setSelectedIngredient("");

        filterRecipes({
            category: "",
            area: value,
            ingredient: "",
        });
    }

    function handleIngredientChange(event) {
        const value = event.target.value;

        setSelectedCategory("");
        setSelectedArea("");
        setSelectedIngredient(value);

        filterRecipes({
            category: "",
            area: "",
            ingredient: value,
        });
    }

    return(
        <>
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value={""} >Category</option>
            {category.map((cat)=> <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>)}
        </select>

        <select value={selectedArea} onChange={handleAreaChange}>
            <option value={""} >Coutry</option>
            {area.map((ar)=> <option key={ar.strCountry} value={ar.strCountry}>{ar.strCountry}</option>)}
        </select>

        <select value={selectedIngredient} onChange={handleIngredientChange}>
            <option value={""} >Ingredient</option>
            {ingredient.map((ing)=> <option key={ing.idIngredient} value={ing.strIngredient}>{ing.strIngredient}</option>)}
        </select>
        </>
    )
}