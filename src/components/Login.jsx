import { useContext, useState } from "react"
import {showToast} from "../utils/toast"
import { AuthContext } from "../context/AuthContext"


export default function Login(){
    const [loginEmail, setLogEmail] = useState('')
    const [loginpassword, setLogPassword] = useState('')

    const { logInUser} = useContext(AuthContext)

    function handleLogin(e){
        e.preventDefault()

        const result = logInUser(loginEmail, loginpassword)

        showToast( result.message, !result.ok)

        if(!result.ok){
            return
        }

    }

    return(
        <form onSubmit={handleLogin}>
            <h2>Login </h2>
            <label>Email: <br /> <input name="login email" type="email" value={loginEmail} onChange={(e)=>setLogEmail(e.target.value)} placeholder="your email" required/> </label> <br />
            <label>Password: <br /> <input name="login password" type="password" value={loginpassword} onChange={(e)=>setLogPassword(e.target.value)}  placeholder="your password" required/></label> <br />
            <button type="submit" >Login</button>
        </form>
    )
}