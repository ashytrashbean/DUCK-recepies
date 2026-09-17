import { Outlet, Link } from "react-router-dom";


export default function Layout(){
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
                        <li><Link to={"/saved"}>Saved</Link></li>
                        <li><Link to={"/login"}>Login</Link></li>
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