import { useContext } from "react"
import { RecipeContext } from "../../context/RecipeContext"


export default function RecipeList(){

    const {recipes, getRecipes} = useContext(RecipeContext)

    return(
        <div className="recepies">
            {recipes.map((recipe)=>(
            <section key={recipe.idMeal}>
                <img src={recipe.strMealThumb} alt="" height={200}/>
                <h3>{recipe.strMeal}</h3>
                <div>
                    <span>{recipe.strCategory}</span>
                    <span>{recipe.strCountry}</span>
                </div>
                <br />
            </section>
        ))}

        <button onClick={()=> getRecipes(5)}>Load More</button>

        </div>
)}