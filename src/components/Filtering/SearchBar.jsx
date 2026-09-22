import { useContext, useState } from "react";
import { RecipeContext } from "../../context/RecipeContext";


export default function SearchBar({onSearchSubmit, onReset}){
        const [searchTerm, setSearchTerm] = useState("")
        const {searchRecipes} = useContext(RecipeContext)

        function handleSubmit(e){
            e.preventDefault()

            if(!searchTerm.trim())return 

            searchRecipes(searchTerm)
            onSearchSubmit()
        }

        function handleReset(){
            setSearchTerm("")
            onReset()
        }

        return(
            <form onSubmit={handleSubmit}>
                <label>Search Recipes 
                    <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
                    placeholder="Search by recipe name"/>
                </label>
                <button type="submit">Search</button>
                <button type="button">Show all recipes</button>
            </form>
        )
}