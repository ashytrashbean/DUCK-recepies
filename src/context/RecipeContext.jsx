import { createContext, useEffect, useRef, useState } from "react";
import { showToast } from "../utils/toast";

export const RecipeContext = createContext();

export function RecipeProvider({children}){

    const [recipesLoading, setRecipesLoading] = useState(false)
    const [recipesError, setRecipesError] = useState(null)

    const [recipeLoading, setRecipeLoading] = useState(false)
    const [recipeError, setRecipeError] = useState(null)

    const [filtersLoading, setFiltersLoading] = useState(false)
    const [filtersError, setFiltersError] = useState(null)

    async function getUrl(url) {
        let response = await fetch(`https://themealdb.com/api/json/v1/1/${url}`)

        if(!response.ok){
            throw new Error(`API request failed: ${response.status}`)
        }

        return response.json();
    }

    const [recipes, setRecepies] = useState([])

    const recipeIds = useRef(new Set());
    const isRecipesLoading = useRef(false);
    const isFiltering = useRef(false);

    async function loadRecipes( amount = 12) {
        if(isRecipesLoading.current) return;

        isRecipesLoading.current = true;
        setRecipesLoading(true)
        setRecipesError(null)


        
        try{
            const newRecipes = [];

            while(newRecipes.length < amount){
                const data= await getUrl("random.php");
                const recipe = data.meals?.[0];

                if (!recipe) {
                    throw new Error("No recipe returned")
                }

                if(!recipeIds.current.has(recipe.idMeal)){
                    recipeIds.current.add(recipe.idMeal);
                    newRecipes.push(recipe)
                }
            }
            setRecepies((currentRecipes)=>[...currentRecipes,...newRecipes,])
        }
        catch{
            setRecipesError("Could not load recipes right now.")
        } finally{
            isRecipesLoading.current = false
            setRecipesLoading(false)
        }
    } 

    const [activeFilter, setActiveFilter] = useState(null)

    async function refreshRecipes(amount = 12) {
        setActiveFilter(null)
        if (isRecipesLoading.current) return;

        setRecepies([])
        recipeIds.current.clear()
        await loadRecipes(amount)
    }

    let [recipe, setRecipe] = useState(null);

    async function getRecipe(id) {
        setRecipeLoading(true)
        setRecipeError(null)
        setRecipe(null)

        try {
            const data = await getUrl(`lookup.php?i=${id}`)
            setRecipe(data.meals?.[0] ?? null)
        } catch {
            setRecipeError("Could not load this recipe right now.")
        } finally {
            setRecipeLoading(false)
        }
    }

    const [category, setCategory] = useState([]);
    const [area, setArea] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    async function filtering() {

        try{
            const catData = await getUrl("list.php?c=list");
            const arData = await getUrl("list.php?a=list");
            const ingData = await getUrl("list.php?i=list");

            setCategory(catData.meals);
            setArea(arData.meals);
            setIngredient(ingData.meals);
        }
        catch{
            setFiltersError("Could not load the filters right now.")
            showToast("Could not load the filters right now.", true)
        }
    }

    useEffect(()=>{
        filtering()
    },[])

    async function filterRecipes({category, area, ingredient}) {
        setActiveFilter({category, area, ingredient})
        if(isFiltering.current) return;

        let endpoint;
        if(category){
            endpoint = `filter.php?c=${category}`
        } else if(area){
            endpoint = `filter.php?a=${area}`
        } else if(ingredient){
            endpoint = `filter.php?i=${ingredient}`
        } else {
            return;
        }

        isFiltering.current = true;
        setFiltersLoading(true)
        setFiltersError(null)

        try{
            const data = await getUrl(endpoint);
            setRecepies(data.meals ?? []);
        } catch {
            setFiltersError("Could not load recipes for that filter.")
        }finally{
            isFiltering.current = false
            setFiltersLoading(false)
        }
        
    }

    async function fetchRecipe(id) {
        const data = await getUrl(`lookup.php?i=${id}`)
        return data.meals?.[0] ?? null
    }
    async function searchRecipes(searchTerm) {
        const trimmedSearchTerm = searchTerm.trim()

        if (!trimmedSearchTerm || isFiltering.current) return

        isFiltering.current = true
        setFiltersLoading(true)
        setFiltersError(null)
        setActiveFilter(trimmedSearchTerm)

        try{
            const data = await getUrl(`search.php?s=${encodeURIComponent(trimmedSearchTerm)}`)
            setRecepies(data.meals ?? [])
        }catch{
            setFiltersError("Could not search recipes right now.")
        }finally{
            isFiltering.current = false
            setFiltersLoading(false)
        }
    }


    return(
        <RecipeContext.Provider value={{recipes, loadRecipes, refreshRecipes, activeFilter, recipesLoading, searchRecipes, recipesError, recipe, getRecipe, recipeLoading, recipeError, category, area, ingredient, filterRecipes, filtersLoading, filtersError, fetchRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}