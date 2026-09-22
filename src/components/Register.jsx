import { useContext, useState } from "react"
import { RecipeContext } from "../context/RecipeContext"
import {showToast} from "../utils/toast"


export default function Register(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const { createUser} = useContext(RecipeContext)

    function handleCreateUser(e){
        e.preventDefault()

        const result = createUser(name, email, password)

        showToast( result.message, !result.ok)
            if(!result.ok){
                return
            }
    }

    return(
        <form onSubmit={handleCreateUser}>
            <h2>Or create an account</h2>
            <label>Name: <br /><input type="text" name="register name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="your name you want to have displayed" required/> </label> <br />
            <label>Email: <br /><input type="email" name="register email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email" required/> </label> <br />
            <label>Password: <br /><input type="password" name="register password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="your password" required/></label> <br />
            <button type="submit" >Create account</button>
        </form>
    )
}