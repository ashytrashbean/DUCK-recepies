import { Outlet, Link } from "react-router-dom";


export default function Layout(){
    return(
        <>
            <header>
                <h2>D.U.C.K</h2>
            
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Search</li>
                        <li>Login</li>
                        <li>Saved</li>
                    </ul>
                </nav>

            </header>
            
            <main>
                <Outlet/>
            </main>

            <footer>
                <span>Deliciously</span><br />
                <span>Useful</span><br />
                <span>Cooking</span><br />
                <span>Knowledge</span>
            </footer>
        </>

    )
}