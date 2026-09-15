import { createContext } from "react";

export const RecipeContext = createContext();

export function RecipeProvider({children}){


    return(
        <RecipeContext.Provider value={{}}>
            {children}
        </RecipeContext.Provider>
    )
}