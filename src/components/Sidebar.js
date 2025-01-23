import '../assets/css/sidebars.css'
import { Link, NavLink } from "react-router-dom"
const Sidebar = () => {

    return(
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">Productos</NavLink>
          </li>
        </ul>
      </div>
    </nav>
    )
}

export { Sidebar }