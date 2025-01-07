import { Link,Outlet } from "react-router-dom"

function Layout(){
    const handleClick =() =>{
        //force a page reload
        window.location.reload();
    };
    return(
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Employee Managment</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/" className="nav-link" onClick={handleClick}>Home</Link>
                </li>
                {/* <li className="nav-item">
                <Link to="/AddEmp" className="nav-link">addemp</Link>
                </li> */}
                <li className="nav-item">
                <Link to="/Add" className="nav-link">Add</Link>
                </li>    
                {/* <li className="nav-item">
                <Link to="/Product" className="nav-link">Product</Link>
                </li>     */}
            </ul>
            </div>
        </div>
        </nav>

        <Outlet/>
        </>
    )
}

export default Layout