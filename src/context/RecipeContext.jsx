import { createContext, useEffect, useRef, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({children}){

    async function getUrl(url) {
        let response = await fetch(`https://themealdb.com/api/json/v1/1/${url}`)
        return response.json();
    }

    const [recipes, setRecepies] = useState([])

    const recipeIds = useRef(new Set());
    const isLoading = useRef(false);

    async function loadRecipes( amount = 12) {
        if(isLoading.current) return;

        isLoading.current = true;
        const newRecipes = [];

        try{
            while(newRecipes.length < amount){
                const data= await getUrl("random.php");
                const recipe = data.meals[0];

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
        const data = await getUrl(`lookup.php?i=${id}`)
        setRecipe(data.meals[0])
    }

    const [category, setCategory] = useState([]);
    const [area, setArea] = useState([]);
    const [ingredient, setIngredient] = useState([]);

    async function filtering() {
        try{
            const [catData, arData, ingData] = await Promise.all([
                getUrl("list.php?c=list"),
                getUrl("list.php?a=list"),
                getUrl("list.php?i=list")
            ])
            setCategory(catData.meals);
            setArea(arData.meals);
            setIngredient(ingData.meals);
        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        filtering()
    },[])

    return(
        <RecipeContext.Provider value={{recipes, loadRecipes, recipe, getRecipe, category, area, ingredient}}>
            {children}
        </RecipeContext.Provider>
    )
}