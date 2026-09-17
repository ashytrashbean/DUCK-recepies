

export default function LoginPage(){


    return(
        <>
        <h1>save recipes and create your own</h1>
        <div>
            <div>
                <h2>Login </h2>
                <label>Email: <input type="email" placeholder="your email"/> </label> <br />
                <label>Password: <input type="password"  placeholder="your password"/></label> <br />
                <button>Login</button>
            </div>

            <div>
                <h2>Or create an account</h2>
                <label>Name: <input type="text" placeholder="your name you want to have displayed"/> </label> <br />
                <label>Email: <input type="email" placeholder="your email"/> </label> <br />
                <label>Password: <input type="password"  placeholder="your password"/></label> <br />
                <button>Create account</button>
            </div>
        </div>
        
        </>
    )
}