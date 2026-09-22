import { useContext, useState } from "react"
import { RecipeContext } from "../../context/RecipeContext"
import LoadingState from "../states/LoadingState"
import ErrorState from "../states/ErrorState"
import SearchBar from "./SearchBar"
import FilterSelect from "./FilterSelect"
import styles from "./filtering.module.css"


export default function FilterList(){

    const {
        category,
        area,
        ingredient,
        filterRecipes,
        filtersLoading,
        filtersError,
        refreshRecipes
    } = useContext(RecipeContext)
    
    const [selectedCategory,setSelectedCategory] = useState("");
    const [selectedArea,setSelectedArea] = useState("");
    const [selectedIngredient,setSelectedIngredient] = useState("");


    function handleCategoryChange(event) {
        const value = event.target.value;

        setSelectedCategory(value);
        setSelectedArea("");
        setSelectedIngredient("");

        filterRecipes({
            category: value,
            area: "",
            ingredient: "",
        });
    }

    function handleAreaChange(event) {
        const value = event.target.value;

        setSelectedCategory("");
        setSelectedArea(value);
        setSelectedIngredient("");

        filterRecipes({
            category: "",
            area: value,
            ingredient: "",
        });
    }

    function handleIngredientChange(event) {
        const value = event.target.value;

        setSelectedCategory("");
        setSelectedArea("");
        setSelectedIngredient(value);

        filterRecipes({
            category: "",
            area: "",
            ingredient: value,
        });
    }

    function clearDropdowns(){
    setSelectedCategory("")
    setSelectedArea("")
    setSelectedIngredient("")
    }

    function handleSearchSubmitted(){
        clearDropdowns()
    }

    function handleReset(){
        clearDropdowns()
        refreshRecipes()
    }

    if (filtersLoading && category.length === 0) {
        return <LoadingState message="Loading filters..." />
    }

    return(
        <div className={styles.filtering}>

            {filtersError && <ErrorState message={filtersError} />}

            <div className={styles.selcts}>
                <FilterSelect label="Category" value={selectedCategory} options={category}
                optionValue="strCategory" optionLabel="strCategory" onChange={handleCategoryChange}/>

                <FilterSelect label="Country" value={selectedArea} options={area}
                optionValue="strCountry" optionLabel="strCountry" onChange={handleAreaChange}/>

                <FilterSelect label="Ingredient" value={selectedIngredient} options={ingredient}
                optionValue="strIngredient" optionLabel="strIngredient" onChange={handleIngredientChange}/>
            </div>

            <SearchBar onSearchSubmit={handleSearchSubmitted} onReset={handleReset}/>
            
        </div>
    )
}