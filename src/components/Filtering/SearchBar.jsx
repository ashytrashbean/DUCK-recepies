import { useContext, useState } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import styles from "./filtering.module.css"


export default function SearchBar({onSearchSubmit, onReset}){
        const [searchTerm, setSearchTerm] = useState("")
        const {searchRecipes} = useContext(RecipeContext)

        function handleSubmit(e){
            e.preventDefault()

            if(!searchTerm.trim())return 

            searchRecipes(searchTerm)
            onSearchSubmit()
        }

        function handleReset(){
            setSearchTerm("")
            onReset()
        }

        return(
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}placeholder="Search by recipe name"/>
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                <button type="button" onClick={handleReset}><i className="fa-solid fa-reply"></i></button>
            </form>
        )
}