

export default function IngredientList({recipe}){
    
    function getIngredients(){
        const ingredients = []

        for (let index = 1; index <= 20; index++){
            const ingredient = recipe[`strIngredient${index}`]?.trim()
            const measure = recipe[`strMeasure${index}`]?.trim()

            if(ingredient){
                ingredients.push({ingredient, measure})
            }
        }
        return ingredients
    }

    return(
        <ul>
            {getIngredients().map((item,index)=> (
                <li key={index}>
                    <strong>{item.measure}</strong> {item.ingredient}
                </li>
            ))}
        </ul>
    )
    
}