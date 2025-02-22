import '../assets/css/navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Product Management</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
            <div className="nav-item text-nowrap">
            <a className="nav-link px-3" href="#"></a>
            </div>
        </div>
        </header>
    )
}

export { Navbar }