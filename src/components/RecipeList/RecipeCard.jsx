import { Link } from "react-router-dom";
import styles from './recipeList.module.css'


export default function RecipeCard({recipe}){
    return(
        <Link to={`/recipe/${recipe.idMeal}`} className={styles.recipeLink}>
            <section className= {styles.sect}>
                <img src={recipe.strMealThumb} alt="" />
                <h3>{recipe.strMeal}</h3> 
                <div>
                    {recipe.strCategory && <span>{recipe.strCategory}</span>}
                    {recipe.strCountry &&<span>{recipe.strCountry}</span>}
                </div>
                <br />
            </section>
        </Link>
    )
}