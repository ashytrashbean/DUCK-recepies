import { useContext, useEffect } from "react"
import { RecipeContext } from "../context/RecipeContext"
import FilterList from "../components/FilterList"
import RecipeList from "../components/RecipeList/RecipeList"

export default function HomePage(){
    const { refreshRecipes } = useContext(RecipeContext)

    useEffect(() => {
        refreshRecipes()
    }, [])

    return(
        <>
            <FilterList/>
            <RecipeList/>
        </>
    )
}