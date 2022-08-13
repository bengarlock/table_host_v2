import React from 'react'
import { NavLink } from "react-router-dom";
import "../Stylesheets/Navbar.css"
import { connect } from "react-redux";
import { changeNavbar } from "../Actions/Navbar";
import PropTypes from 'prop-types';
import { faBook } from "@fortawesome/free-solid-svg-icons";

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
                         onClick={this.onClickHandler}>B</NavLink>

                <NavLink className={this.props.currentNavbar === "floor" ? "menu-icon-selected" : "menu-icon"}
                         id='floor'
                         to="/tablehost/floor"
                         onClick={this.onClickHandler}>F</NavLink>

                <NavLink className={this.props.currentNavbar === "guests" ? "menu-icon-selected" : "menu-icon"}
                         id='guests'
                         to="/tablehost/guests"
                         onClick={this.onClickHandler}>G</NavLink>
                <NavLink className={this.props.currentNavbar === "reports" ? "menu-icon-selected" : "menu-icon"}
                         id='reports'
                         to="/tablehost/reports"
                         onClick={this.onClickHandler}>R</NavLink>
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
