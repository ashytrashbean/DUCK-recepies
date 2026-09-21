import { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";


export default function Layout(){
    const {currentUser, logOutUser} = useContext(RecipeContext)
    return(
        <>
            <header>
                <Link to={"/"} className="icon">
                        <img src="src\assets\g19.png" alt="" height={100}/>
                        <h1>D.U.C.K</h1>
                </Link>
                
                <nav>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li>{currentUser ? <Link to={"/saved"}>Saved</Link> : ""}</li>
                        <li>{currentUser ? (
                            <a onClick={logOutUser}>Log Out</a>
                            ) : (<Link to={"/login"}>Login</Link>)}</li>
                    </ul>
                </nav>

            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
                <div>
                    <img src="src\assets\g19.png" alt="" height={100}/>
                </div>
                
                <div>
                    <span>Deliciously</span><br />
                    <span>Useful</span><br />
                    <span>Cooking</span><br />
                    <span>Knowledge</span>
                </div>
        
            </footer>
        </>

    )
}