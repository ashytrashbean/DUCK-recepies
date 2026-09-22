import { useContext} from "react"
import { RecipeContext } from "../context/RecipeContext"
import { Navigate } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"


export default function LoginPage(){

    const { currentUser} = useContext(RecipeContext)

    if(currentUser){
        return <Navigate to={"/saved"} replace/>
    }

    return(
        <div className="logpage">
        <h1>save recipes and create your own</h1>
        <div className="log">
            <Login/>
            <Register/>
        </div>
        
        </div>
    )
}