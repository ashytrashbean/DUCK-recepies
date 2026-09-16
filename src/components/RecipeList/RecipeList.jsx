import { useContext } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import styles from './recipeList.module.css'
import { Link } from "react-router-dom"


export default function RecipeList(){

    const {recipes, loadRecipes} = useContext(RecipeContext)

    return(
        <div className={styles.center}>

        <div className={styles.recepies}>
            {recipes.map((recipe)=>(
            <Link key={recipe.idMeal} to={`/recipe/${recipe.idMeal}`} className={styles.recipeLink}>
                <section className= {styles.sect}>
                    <img src={recipe.strMealThumb} alt="" />
                    <h3>{recipe.strMeal}</h3>
                    <div>
                        <span>{recipe.strCategory}</span>
                        <span>{recipe.strCountry}</span>
                    </div>
                    <br />
                </section>
            </Link>
        ))}
        </div>

        <button onClick={()=> loadRecipes(5)}>Load More</button>

        </div>
)}