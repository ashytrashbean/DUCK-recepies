import { useContext, useState } from "react"
import { RecipeContext } from "../context/RecipeContext"


export default function LoginPage(){

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginEmail, setLogEmail] = useState('')
    const [loginpassword, setLogPassword] = useState('')

    const { createUser, logInUser} = useContext(RecipeContext)

    function handleCreateUser(e){
        e.preventDefault()

        const result = createUser(name, email, password)

        if(!result.ok){
            alert(result.message)
            return
        }
        
        alert(result.message)
    }

    function handleLogin(e){
        e.preventDefault()

        const result = logInUser(loginEmail, loginpassword)

        if(!result.ok){
            alert(result.message)
            return
        }

        alert(result.message)
    }

    return(
        <>
        <h1>save recipes and create your own</h1>
        <div>
            <form onSubmit={handleLogin}>
                <h2>Login </h2>
                <label>Email: <input name="login email" type="email" value={loginEmail} onChange={(e)=>setLogEmail(e.target.value)} placeholder="your email" required/> </label> <br />
                <label>Password: <input name="login password" type="password" value={loginpassword} onChange={(e)=>setLogPassword(e.target.value)}  placeholder="your password" required/></label> <br />
                <button type="submit" >Login</button>
            </form>

            <form onSubmit={handleCreateUser}>
                <h2>Or create an account</h2>
                <label>Name: <input type="text" name="register name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="your name you want to have displayed" required/> </label> <br />
                <label>Email: <input type="email" name="register email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your email" required/> </label> <br />
                <label>Password: <input type="password" name="register password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="your password" required/></label> <br />
                <button type="submit" >Create account</button>
            </form>
        </div>
        
        </>
    )
}