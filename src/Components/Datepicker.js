import React from 'react'
import "../Stylesheets/Datepicker.css"
import {connect} from "react-redux";
import { getBook, setDate } from "../Actions/Book";
import PropTypes from "prop-types";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


class Datepicker extends React.Component {

    state = {
        calendarClicked: false
    }

    static propTypes = {
        currentBook: PropTypes.array.isRequired,
        currentDate: PropTypes.string.isRequired
    }

    renderDay = () => {
        if (this.props.currentBook[0]) {
            let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');
            if (this.props.currentDate === today) {
                return "TODAY"
            } else {
                return this.props.currentDate
            }
        } else {
            return "CLOSED"
        }
    }

    onClickHandler = (e) => {
        let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');

        if (e.target.id === "left") {
            let date = new Date(this.props.currentDate)
            date.setDate(date.getDate() - 1)
            date = date.toJSON().slice(0,10).replace(/-/g,'-')
            this.props.setDate(date)
            this.props.getBook(date)

        } else if (e.target.id === "cal") {
            this.setState({
                calendarClicked: !this.state.calendarClicked
            })

        } else if (e.target.id === "right") {
            let date = new Date(this.props.currentDate)
            date.setDate(date.getDate() + 1)
            date = date.toJSON().slice(0,10).replace(/-/g,'-')
            this.props.setDate(date)
            this.props.getBook(date)

        } else if (e.target.id === "th-calendar-wrapper") {
            this.setState({
                calendarClicked: false
            })
        } else if (e.target.id === "now-button") {
            this.props.setDate(new Date().toJSON().slice(0,10).replace(/-/g,'-'))
            this.props.getBook(new Date().toJSON().slice(0,10).replace(/-/g,'-'))
        }
    }

    onChangeHandler = (date) => {
        let formatDate = new Date(date).toJSON().slice(0,10)
        this.props.setDate(formatDate)


        this.setState({
            calendarClicked: false
        })
    }

    render() {
        console.log(this.props.currentDate)
        return (
            <div className='datepicker-wrapper'>
                <span className="calendar-button" onClick={this.onClickHandler} id="left"> {"<"} </span>
                <span id="center-calendar-selector" onClick={this.onClickHandler} id="cal">{this.renderDay()}</span>

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

