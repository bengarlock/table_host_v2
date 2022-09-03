import React from 'react'
import '../../Stylesheets/App.css'
import {connect} from "react-redux";
import { changeSettingsNavbar } from "../../Actions/Navbar";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import Administrative from "./SettingPages/Administrative";

class SettingsMain extends React.Component {

    static propTypes = {
        currentSettingNavbar: PropTypes.string.isRequired
    }

    state = {
        container_width: 300
    }

    onMouseDownHandler = (e) => {
        if (e.target.className === 'divider') {
            window.addEventListener("mousemove", this.onMouseMoveHandler)
            window.addEventListener("mouseup", this.onMouseUpHandler)
        }
    }

    onMouseMoveHandler = (e) => {
        const newPosition = this.state.container_width + e.movementX

        if (newPosition < 400) {
            if (newPosition > 200) {
                this.setState({
                    container_width: newPosition
                })
            }
        }
        // save to local storage here.
    }

    onMouseUpHandler = () => {
        window.removeEventListener("mousemove", this.onMouseMoveHandler)
        window.removeEventListener("mouseup", this.onMouseUpHandler)
    }


    onClickHandler = (e) => {
        this.props.changeSettingsNavbar(String(e.target.id))
    }


    render() {
        return(
            <div className="page-container">
                <div className="left-menu-wrapper">

                    <div className="settings-inner-wrapper" style={{width: this.state.container_width}}>


                        <NavLink className={this.props.currentSettingNavbar === "administrative" ?
                            "settings-button settings-button-selected" : "settings-button"}
                             id="administrative"
                             onClick={this.onClickHandler}
                             to="/tablehost/settings/administrative"
                        >Administrative</NavLink>
                    </div>
                    <div className="divider" onMouseDown={this.onMouseDownHandler}/>
                    {this.props.currentSettingNavbar === "administrative" ? <Administrative /> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currentSettingNavbar: state.navbar.currentSettingNavbar
})

export default connect(mapStateToProps, { changeSettingsNavbar })(SettingsMain);