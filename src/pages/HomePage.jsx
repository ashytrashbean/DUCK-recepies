import { useContext, useEffect } from "react"
import FilterList from "../components/Filtering/FilterList"
import RecipeList from "../components/RecipeList/RecipeList"
import { RecipeContext } from "../context/RecipeContext"

export default function HomePage(){

    const {recipes, loadRecipes} = useContext(RecipeContext)

    useEffect(()=>{
        if(recipes.length === 0){
            loadRecipes(12)
        }
    }, [])

    return(
        <>
            <FilterList/>
            <RecipeList/>
        </>
    )
}