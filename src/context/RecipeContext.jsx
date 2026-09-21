import { createContext, useEffect, useRef, useState } from "react";

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

    async function refreshRecipes(amount = 12) {
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

    async function filterRecipes({category, area, ingredient}) {
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

    const [users, setUsers] = useState(()=>{
        const storedUsers = JSON.parse(localStorage.getItem('duckUsers') ?? "[]")
        return storedUsers
    });

    const [currentUser, setCurrentUser] = useState(()=>{
        const storedUser = localStorage.getItem('currentDuckUser')
        return storedUser ? JSON.parse(storedUser) : null
    })

    function createUser(displayName, email, password){
        const storedUsers = JSON.parse(localStorage.getItem('duckUsers') ?? '[]');

        const alreadyExists = storedUsers.some(user => user.email.toLowerCase() === email.toLowerCase())

        if (alreadyExists) {
            return {ok: false, message:'User already exists'}
        }
        
        const newUser = {
            id: Date.now(),
            displayName,
            email,
            password,
            savedRecipes: []
        }
        
        const updatedUsers = [...storedUsers, newUser]
        
        setUsers(updatedUsers)
        localStorage.setItem('duckUsers', JSON.stringify(updatedUsers))
        
        setCurrentUser(newUser)
        localStorage.setItem('currentDuckUser', JSON.stringify(newUser))
        
        return {ok: true, message:'Account sucessfully created'}
    }
    
    function logInUser(email, password){
        const storedUsers = JSON.parse(localStorage.getItem('duckUsers') ?? '[]')
        
        const foundUser = storedUsers.find(
            user =>
                user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        )
        
        if(!foundUser){
            return {ok: false, message:'Wrong email or password'}
        }
        
        setCurrentUser(foundUser)
        localStorage.setItem('currentDuckUser', JSON.stringify(foundUser))
        return {ok: true, message:'Logged in'}
    }

    function logOutUser(){
        setCurrentUser(null)
        localStorage.removeItem('currentDuckUser')
    }

    function toggleSaved(recipeId){
        if(!currentUser) return{ok: false, message:'you have to log in to be abale to save'}

        const storedUsers = JSON.parse(localStorage.getItem('duckUsers') ?? '[]')

        const updatedUsers = storedUsers.map(user => {
            if(user.id !== currentUser.id) return user

            const alreadySaved = (user.savedRecipes ?? []).includes(recipeId)

            return{
                ...user,
                savedRecipes: alreadySaved
                ? (user.savedRecipes ?? []).filter(id => id !== recipeId)
                : [...(user.savedRecipes ?? []), recipeId]
            }
        })

        setUsers(updatedUsers)
        localStorage.setItem('duckUsers', JSON.stringify(updatedUsers))
        
        const updatedCurrentUser = updatedUsers.find(user => user.id === currentUser.id)
        
        setCurrentUser(updatedCurrentUser)
        localStorage.setItem('currentDuckUser', JSON.stringify(updatedCurrentUser))

        return{ok: true}
    }

    async function fetchRecipe(id) {
        const data = await getUrl(`lookup.php?i=${id}`)
        return data.meals?.[0] ?? null
    }

    return(
        <RecipeContext.Provider value={{recipes, loadRecipes, refreshRecipes, recipesLoading, recipesError, recipe, getRecipe, recipeLoading, recipeError, category, area, ingredient, filterRecipes, users, currentUser, createUser,logInUser,logOutUser,toggleSaved, fetchRecipe}}>
            {children}
        </RecipeContext.Provider>
    )
}