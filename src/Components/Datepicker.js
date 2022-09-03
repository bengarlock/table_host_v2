import React from 'react'
import '../Stylesheets/App.css'
import {connect} from "react-redux";
import { getBook, setDate } from "../Actions/Book";
import PropTypes from "prop-types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'dateformat'

class Datepicker extends React.Component {

    state = {
        calendarClicked: false
    }

    static propTypes = {
        currentBook: PropTypes.object.isRequired,
        currentDate: PropTypes.string.isRequired
    }

    renderDay = () => {

        let dateFormat = require("dateformat");
        let newDate = dateFormat(this.props.currentDate, "dddd mmmm dS, yyyy")

        let today = new Date()
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
        let tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)

        if (String(this.props.currentDate) === String(today)) {
            return (
                <>
                    <div id="cal">Today</div>
                    <div id="cal">{newDate}</div>
                </>
            )

        } else if (String(this.props.currentDate) === String(tomorrow)) {
            return (
                <>
                    <div id="cal">Tomorrow</div>
                    <div id="cal">{newDate}</div>
                </>
            )
        } else {
            return newDate
        }
    }

    onClickHandler = (e) => {
        if (e.target.id === "left") {
            let date = new Date(this.props.currentDate)
            date.setDate(date.getDate() - 1)
            this.props.setDate(date)
            this.props.getBook(date)

        } else if (e.target.id === "cal") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })

        } else if (e.target.id === "right") {
            let date = new Date(this.props.currentDate)
            date.setDate(date.getDate() + 1)
            this.props.setDate(date)
            this.props.getBook(date)

        } else if (e.target.id === "th-calendar-wrapper") {
            this.setState({
                calendarClicked: false
            })
        } else if (e.target.id === "now-button") {
            let today = new Date()
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            this.props.setDate(today)
            this.props.getBook(today)
        }
    }

    onChangeHandler = (date) => {
        this.props.setDate(date)
        this.setState({
            calendarClicked: false
        })
    }

    render() {
        return (
            <div className='datepicker-wrapper'>
                <div className='calendar-controls-wrapper'>
                    <span className="calendar-button" onClick={this.onClickHandler} id="left"> {"<"} </span>
                    <span className="center-calendar-selector" onClick={this.onClickHandler} id="cal">
                        {this.renderDay()}
                    </span>
                    {this.state.calendarClicked ?
                        <div id="th-calendar-wrapper" onClick={this.onClickHandler}>
                            <div className="th-calendar">
                                <Calendar
                                    onChange={this.onChangeHandler}
                                />
                            </div>
                        </div>
                        : null}
                    <span className="calendar-button" onClick={this.onClickHandler} id="right"> {">"} </span>
                </div>
                <div id="now-button" onClick={this.onClickHandler}>NOW</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    //state.resyRestaurants calls the reducer and .resyRestaurants calls the action
    currentBook: state.book.currentBook,
    currentDate: state.book.currentDate,
    currentNavbar: state.navbar.currentNavbar,

})

export default connect(mapStateToProps, { getBook, setDate })(Datepicker);

