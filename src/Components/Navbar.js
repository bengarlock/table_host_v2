import React from 'react'
import { NavLink } from "react-router-dom";
import "../Stylesheets/Navbar.css"


class Navbar extends React.Component {


    render() {
        return(
            <div id="nav-bar-wrapper">
                <span className="menu-icon">BOOK</span>


                <span className="menu-icon">
                    FLOOR
                </span >
                <span className="menu-icon">
                    GUESTS
                </span>
                <span className="menu-icon">
                    REPORTS
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