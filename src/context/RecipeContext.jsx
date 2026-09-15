import { createContext, useEffect, useState } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({children}){

    const [recipes, setRecepies] = useState([])
    
    useEffect(() => {
        async function getRecipes() {
            const uniqueRecipes = new Map();
            try{
                while(uniqueRecipes.size < 12){
                    let response = await fetch('https://themealdb.com/api/json/v1/1/random.php')
                    const data = await response.json();
                    const recipe = data.meals[0]

                    uniqueRecipes.set(recipe.idMeal, recipe)
                }
                setRecepies([...uniqueRecipes.values()])
            }
            catch(error){
                console.log(error.response)
            }
        } 
        getRecipes()
    },[])


    return(
        <RecipeContext.Provider value={{recipes}}>
            {children}
        </RecipeContext.Provider>
    )
}