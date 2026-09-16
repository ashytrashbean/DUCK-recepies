import { createContext, useEffect, useRef, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({children}){

    const [recipes, setRecepies] = useState([])

    const recipeIds = useRef(new Set());
    const isLoading = useRef(false);

    async function loadRecipes( amount = 12) {
        if(isLoading.current) return;

        isLoading.current = true;
        const newRecipes = [];

        try{
            while(newRecipes.length < amount){
                let response = await fetch('https://themealdb.com/api/json/v1/1/random.php')
                const data = await response.json();
                const recipe = data.meals[0]

                if(!recipeIds.current.has(recipe.idMeal)){
                    recipeIds.current.add(recipe.idMeal);
                    newRecipes.push(recipe)
                }
            }
            setRecepies((currentRecipes)=>[...currentRecipes,...newRecipes,])
        }
        catch(error){
            console.error(error);
        } finally{
            isLoading.current = false
        }
    } 

    useEffect(()=>{
        loadRecipes(12);
    },[])

    let [recipe, setRecipe] = useState(null);

    

    async function getRecipe(id) {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const data = await response.json();
        setRecipe(data.meals[0])
    }


    return(
        <RecipeContext.Provider value={{recipes, loadRecipes, recipe, getRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}