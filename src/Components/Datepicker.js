import React from 'react'
import "../Stylesheets/Datepicker.css"
import {connect} from "react-redux";
import { getBook } from "../Actions/Book";
import PropTypes from "prop-types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


class Datepicker extends React.Component {

    state = {
        calendarClicked: false
    }

    static propTypes = {
        currentBook: PropTypes.array.isRequired
    }

    renderDay = () => {
        if (this.props.currentBook[0]) {
            let date = new Date(this.props.currentBook[0].date).toJSON().slice(0,10)
            let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');

            if (date === today) {
                return "TODAY"
            } else {
                return this.props.currentBook[0].date
            }
        }
    }

    onClickHandler = (e) => {
        console.log(e.target.id)

        if (e.target.id === "left") {
            console.log(e.target.id)
        } else if (e.target.id === "cal") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })
        } else if (e.target.id === "right") {
            console.log(e.target.id)
        } else if (e.target.id === "th-calendar-wrapper") {
            this.setState({
                calendarClicked: false
            })
        }


    }

    render() {
        return (
            <div className='datepicker-wrapper'>
                <span className="calendar-button" onClick={this.onClickHandler} id="left"> {"<"} </span>
                <span id="center-calendar-selector" onClick={this.onClickHandler} id="cal">{this.renderDay()}</span>

                        {this.state.calendarClicked ?

                            <div id="th-calendar-wrapper" onClick={this.onClickHandler}>
                                <div className="th-calendar">
                                    <Calendar />
                                </div>
                            </div>

                             : null}

                <span className="calendar-button" onClick={this.onClickHandler} id="right"> {">"} </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentBook: state.book.currentBook,
    currentNavbar: state.navbar.currentNavbar
})

export default connect(mapStateToProps, { getBook })(Datepicker);

