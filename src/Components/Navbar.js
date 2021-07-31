import React from 'react'
import { NavLink } from "react-router-dom";
import "../Stylesheets/Navbar.css"


class Navbar extends React.Component {


    render() {
        return(
            <div id="nav-bar-wrapper">
                <span>
                    ICON
                </span>
                <span>
                    ICON
                </span><span>
                    ICON
                </span>
                <span>
                    ICON
                </span>



                {/*<NavLink className="menu-item" to="/" exact>Book</NavLink>*/}
                {/*<NavLink className="menu-item" to="/floor" exact >Floor</NavLink>*/}
                {/*<NavLink className="menu-item" to="/guests" exact>Guests</NavLink>*/}
                {/*<NavLink className="menu-item" to="/reports" exact>Reports</NavLink>*/}
            </div>
        )
    }
}

export default Navbar