import React from 'react'
import { NavLink } from "react-router-dom";
import "../Stylesheets/Navbar.css"
import { connect } from "react-redux";
import { changeNavbar } from "../Actions/Navbar";
import PropTypes from 'prop-types';
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Navbar extends React.Component {

    static propTypes = {
        currentNavbar: PropTypes.string.isRequired
    }

    onClickHandler = (e) => {
        this.props.changeNavbar(e.target.id)
    }


    render() {
        return(
            <div id="nav-bar-wrapper">
                <NavLink className={this.props.currentNavbar === "book" ? "menu-icon-selected" : "menu-icon"}
                         id='book'
                         to="/tablehost"
                         onClick={this.onClickHandler}>
                    <FontAwesomeIcon icon={faBookOpen}/>
                </NavLink>

                <NavLink className={this.props.currentNavbar === "floor" ? "menu-icon-selected" : "menu-icon"}
                         id='floor'
                         to="/tablehost/floor"
                         onClick={this.onClickHandler}>
                    <FontAwesomeIcon icon={faUtensils}/>
                </NavLink>

                <NavLink className={this.props.currentNavbar === "guests" ? "menu-icon-selected" : "menu-icon"}
                         id='guests'
                         to="/tablehost/guests"
                         onClick={this.onClickHandler}>
                    <FontAwesomeIcon icon={faCircleUser}/>
                </NavLink>
                <NavLink className={this.props.currentNavbar === "reports" ? "menu-icon-selected" : "menu-icon"}
                         id='reports'
                         to="/tablehost/reports"
                         onClick={this.onClickHandler}>
                    <FontAwesomeIcon icon={faPencil}/>
                </NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentBook: state.book.currentBook,
    currentNavbar: state.navbar.currentNavbar
})

export default connect(mapStateToProps, { changeNavbar })(Navbar);
